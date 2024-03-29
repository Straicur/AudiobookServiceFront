import React, { useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { HandleFetch } from "../../../../Components/HandleFetch";
import sha256 from "crypto-js/sha256";
import { Buffer } from "buffer";
import ProgressBar from "react-bootstrap/ProgressBar";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import Form from "react-bootstrap/Form";

export default function AddAudiobookModal(props) {
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

  // const [stateProgress, setStateProgress] = useState({
  //   maxParts: 0,
  //   currentPart: 0,
  //   error: false,
  // });

  const maxParts = useRef(0);
  const currentPart = useRef(0);
  const error = useRef(false);

  const seconds = useRef(3000);

  const handleSetAuthorChange = (event) => {
    setStateModal({ ...stateModal, author: event.target.value });
  };

  const handleSetTitleChange = (event) => {
    setStateModal({ ...stateModal, title: event.target.value });
  };

  const handleOnFileChange = (e) => {
    if (e.target.files) {
      let file = e.target.files[0];

      if (
        file.type == "application/zip" ||
        file.type == "application/vnd.rar"
      ) {
        setStateModal({ ...stateModal, file: file });
      }
    }
  };

  const handleClose = () => {
    props.setState({
      ...props.state,
      addAudiobookModal: !props.state.addAudiobookModal,
    });
  };

  const handleCloseAndUpdate = () => {
    props.resetSearchStates();
    props.setState({
      ...props.state,
      addAudiobookModal: !props.state.addAudiobookModal,
      addAudiobook: !props.state.addAudiobook,
      addAudiobookSeconds: seconds.current,
    });
  };

  const handleBack = () => {
    setStateModal({ ...stateModal, modal: 1 });
  };
  const nextPage = () => {
    setStateModal({ ...stateModal, modal: 2 });
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

  const addAudiobook = () => {
    const url = "/admin/audiobook/add";
    const method = "PUT";
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

        seconds.current = buf.length / 10000;

        if (buf.length < CHUNK_SIZE) {
          let b64 = Buffer.from(buf).toString("base64");

          const jsonData = {
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

          maxParts.current = part;
          currentPart.current = 0;

          HandleFetch(url, method, jsonData, props.token, props.i18n.language)
            .then((data) => {
              if (
                currentPart.current == maxParts.current ||
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
              currentPart.current = currentPart.current+1;
            })
            .catch((e) => {
              props.setAudiobooksState({
                ...props.audiobooksState,
                error: e,
              });
            });
        } else {
          for (let i = 0; i < buf.length; i += CHUNK_SIZE) {
            allparts = allparts + 1;
          }

          for (let i = 0; i < buf.length; i += CHUNK_SIZE) {
            const arr = new Uint8Array(buf).subarray(i, i + CHUNK_SIZE);

            maxParts.current = allparts;
            currentPart.current = part;

            let b64 = Buffer.from(arr).toString("base64");

            const jsonData = {
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
                  currentPart.current == maxParts.current ||
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
                currentPart.current =currentPart.current +1
              })
              .catch((e) => {
                props.setAudiobooksState({
                  ...props.audiobooksState,
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

  useEffect(() => {
    if (stateModal.author.trim() && stateModal.title.trim()) {
      setStateModal({ ...stateModal, isNextButtonDisabled: false });
    } else {
      setStateModal({ ...stateModal, isNextButtonDisabled: true });
    }
  }, [stateModal.author, stateModal.title]);

  return (
    <Modal
      show={props.state.addAudiobookModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>
          <h3>
            <b>{props.t("addAudiobook")}</b>
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
              max={maxParts.current}
              now={
                maxParts.current == 1
                  ? undefined
                  : currentPart.current
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
                  addAudiobook();
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
