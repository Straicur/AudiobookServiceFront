import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { HandleFetch } from "../../../../Components/HandleFetch";
import sha256 from "crypto-js/sha256";
import { Buffer } from "buffer";
import ProgressBar from "react-bootstrap/ProgressBar";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import Form from "react-bootstrap/Form";

export default function AudiobookReAddingModal(props) {
  const [stateModal, setStateModal] = useState({
    author: "",
    title: "",
    modal: 1,
    categories: [],
    file: null,
    fileAdded: false,
    upload: false,
    uploadEnded: true,
  });

  const [stateProgress, setStateProgress] = useState({
    maxParts: 0,
    currentPart: 0,
    error: false,
  });

  const handleSetAuthorChange = (event) => {
    setStateModal({ ...stateModal, author: event.target.value });
  };

  const handleSetTitleChange = (event) => {
    setStateModal({ ...stateModal, title: event.target.value });
  };

  const handleOnFileChange = (e) => {
    if (e.target.files) {
      let file = e.target.files[0];

      if (file.type == "application/zip") {
        setStateModal({ ...stateModal, file: file });
      }
    }
  };

  const handleClose = () => {
    props.setAudiobookState({
      ...props.audiobookState,
      reAddingModal: !props.audiobookState.reAddingModal,
      reAdding: !props.audiobookState.reAdding,
    });
  };

  const handleCloseAndUpdate = () => {
    props.resetStates();
    props.setAudiobookState({
      ...props.audiobookState,
      reAddingModal: !props.audiobookState.reAddingModal,
      reAdding: !props.audiobookState.reAdding,
    });
  };

  const handleBack = () => {
    setStateModal({ ...stateModal, modal: 1 });
  };

  const generateCategoriesList = () => {
    let multiSelectTable = [];

    props.categoriesState.forEach((element) => {
      multiSelectTable.push({ key: element.id, label: element.name });
    });

    return multiSelectTable;
  };

  const changeCategories = (element) => {
    if (element != NaN && element != undefined) {
      setStateModal({
        ...stateModal,
        categories: element,
      });
    }
  };
  const nextPage = () => {
    setStateModal({ ...stateModal, modal: 2 });
  };

  useEffect(() => {
    if (stateModal.author.trim() && stateModal.title.trim()) {
      setStateModal({ ...stateModal, isNextButtonDisabled: false });
    } else {
      setStateModal({ ...stateModal, isNextButtonDisabled: true });
    }
  }, [stateModal.author, stateModal.title]);

  useEffect(() => {
    setStateModal({
      ...stateModal,
      author: props.audiobookDetail.author,
      title: props.audiobookDetail.title,
    });
  }, [props]);

  const reAddAudiobook = () => {
    const url = "/admin/audiobook/reAdding";
    const method = "PATCH";
    const CHUNK_SIZE = 1024 * 1024 * 5;
    const reader = new FileReader();
    const fileName = stateModal.title + "_" + stateModal.author;
    const hashName = sha256(fileName).toString();
    //todo to jest do rozkminy bo przeszkadza
    // Nie wykonuje się po i nie mogę zmienić stanu
    setStateModal({ ...stateModal, upload: true, modal: 3 });

    reader.onload = function (e) {
      if (e.target.result instanceof ArrayBuffer) {
        let buf = new Uint8Array(e.target.result);
        let allparts = 0;
        let part = 1;

        if (buf.length < CHUNK_SIZE) {
          let b64 = Buffer.from(buf).toString("base64");

          const jsonData = {
            audiobookId: props.audiobookDetail.id,
            hashName: hashName,
            fileName: fileName,
            part: part,
            parts: part,
            base64: b64,
            additionalData: {
              categories: stateModal.categories,
              title: stateModal.title,
              author: stateModal.author,
            },
          };

          setStateProgress({
            ...stateProgress,
            maxParts: part,
            currentPart: part,
          });

          HandleFetch(url, method, jsonData, props.token, props.i18n.language)
            .then((data) => {
              if (
                stateProgress.currentPart == stateProgress.maxParts ||
                Object.keys(data).length !== 0
              ) {
                setStateModal({
                  author: "",
                  title: "",
                  modal: 3,
                  fileAdded: true,
                  isNextButtonDisabled: false,
                  uploadEnded: false,
                });
              }
              setStateProgress({
                ...stateProgress,
                currentPart: stateProgress.currentPart + 1,
              });
            })
            .catch((e) => {
              props.setAudiobookState({
                ...props.audiobookState,
                error: e,
              });
            });
        } else {
          for (let i = 0; i < buf.length; i += CHUNK_SIZE) {
            allparts = allparts + 1;
          }

          for (let i = 0; i < buf.length; i += CHUNK_SIZE) {
            const arr = new Uint8Array(buf).subarray(i, i + CHUNK_SIZE);

            setStateProgress({
              ...stateProgress,
              maxParts: allparts,
              currentPart: part,
            });

            let b64 = Buffer.from(arr).toString("base64");

            const jsonData = {
              audiobookId: props.audiobookDetail.id,
              hashName: hashName,
              fileName: fileName,
              part: part,
              parts: allparts,
              base64: b64,
              additionalData: {
                categories: stateModal.categories,
                title: stateModal.title,
                author: stateModal.author,
              },
            };

            HandleFetch(url, method, jsonData, props.token, props.i18n.language)
              .then((data) => {
                if (
                  stateProgress.currentPart == stateProgress.maxParts ||
                  Object.keys(data).length !== 0
                ) {
                  setStateModal({
                    author: "",
                    title: "",
                    modal: 3,
                    fileAdded: true,
                    isNextButtonDisabled: false,
                    uploadEnded: false,
                  });
                }
                setStateProgress({
                  ...stateProgress,
                  currentPart: stateProgress.currentPart + 1,
                });
              })
              .catch((e) => {
                props.setAudiobookState({
                  ...props.audiobookState,
                  error: e,
                });
              });

            part = part + 1;
          }
        }
      }
    };
    if (stateModal.file != null) {
      reader.readAsArrayBuffer(stateModal.file);
    }
  };

  return (
    <Modal
      show={props.audiobookState.reAddingModal}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header>
        <Modal.Title>
          <h3>
            <b>{props.t("reAdding")}</b>
          </h3>
        </Modal.Title>
      </Modal.Header>
      {stateModal.modal == 1 ? (
        <Modal.Body>
          <InputGroup className="mb-1 input_modal py-1 ">
            <InputGroup.Text className="input-group-text-new text-light">
              {props.t("title")}
            </InputGroup.Text>
            <Form.Control
              value={stateModal.title}
              onChange={(e) => {
                handleSetTitleChange(e);
              }}
            />
          </InputGroup>
          <InputGroup className="mb-1 input_modal py-1 ">
            <InputGroup.Text className="input-group-text-new text-light">
              {props.t("author")}
            </InputGroup.Text>
            <Form.Control
              value={stateModal.author}
              onChange={(e) => {
                handleSetAuthorChange(e);
              }}
            />
          </InputGroup>
          <InputGroup className="mb-1 input_modal py-1 ">
            <InputGroup.Text className="input-group-text-new text-light">
              {props.t("categories")}
            </InputGroup.Text>
            <DropdownMultiselect
              placeholder={props.t("selectCategories")}
              placeholderMultipleChecked={props.t("slectedMultiCategories")}
              selectDeselectLabel={props.t("slectedAll")}
              options={generateCategoriesList()}
              name="countries"
              handleOnChange={(e) => {
                changeCategories(e);
              }}
              selected={stateModal.categories}
              className={"dropdown_multiselect"}
            />
          </InputGroup>
        </Modal.Body>
      ) : (
        <Modal.Body>
          {stateModal.modal == 3 ? (
            <ProgressBar
              animated
              variant="info"
              max={stateProgress.maxParts}
              now={
                stateProgress.maxParts == 1
                  ? undefined
                  : stateProgress.currentPart
              }
            />
          ) : (
            <input
              id="name"
              type="file"
              name="name"
              className="form-control mt-2"
              onChange={handleOnFileChange}
            />
          )}
        </Modal.Body>
      )}
      {stateModal.modal == 1 ? (
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            {props.t("close")}
          </Button>
          <Button
            disabled={stateModal.isNextButtonDisabled}
            variant="dark"
            onClick={nextPage}
          >
            {props.t("save")}
          </Button>
        </Modal.Footer>
      ) : (
        <Modal.Footer>
          {stateModal.upload == false ? (
            <div>
              <Button variant="dark" onClick={handleBack}>
                {props.t("back")}
              </Button>
              <Button
                disabled={!stateModal.file}
                variant="dark"
                onClick={() => {
                  reAddAudiobook();
                }}
              >
                {props.t("upload")}
              </Button>
            </div>
          ) : (
            <div>
              <Button
                disabled={stateModal.uploadEnded}
                variant="dark"
                onClick={() => {
                  handleCloseAndUpdate();
                }}
              >
                {props.t("close")}
              </Button>
            </div>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
}
