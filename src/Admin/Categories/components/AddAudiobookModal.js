import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { HandleFetch } from "../../../components/HandleFetch";
import sha256 from "crypto-js/sha256";

export default function AddAudiobookModal(props) {
  const [stateModal, setSateModal] = useState({
    author: "",
    title: "",
    modal: 1,
    fileAdded: false,
    upload: false,
    uploadEnded: false,
    progress: 0,
  });

  const [stateProgress, setStateProgress] = useState({
    maxParts: 0,
    currentPart: 0,
    error: false,
  });

  const handleSetAuthorChange = (event) => {
    setSateModal({ ...stateModal, author: event.target.value });
  };

  const handleSetTitleChange = (event) => {
    setSateModal({ ...stateModal, title: event.target.value });
  };

  const handleOnFileChange = (e) => {
    if (!e.target.files) {
      setSateModal({ ...stateModal, fileAdded: false });
      return;
    }
    let file = e.target.files[0];
    setSateModal({ ...stateModal, fileAdded: true, file: file });
  };

  const handleClose = () => {
    props.setState({ modalAddShow: !props.state.modalAddShow });
  };

  const handleBack = () => {
    setSateModal({ ...stateModal, modal: 1 });
  };

  const nextPage = () => {
    setSateModal({ ...stateModal, modal: 2 });
  };

  useEffect(() => {
    if (stateModal.author.trim() && stateModal.title.trim()) {
      setSateModal({ ...stateModal, isNextButtonDisabled: false });
    } else {
      setSateModal({ ...stateModal, isNextButtonDisabled: true });
    }
  }, [stateModal.author, stateModal.title]);

  const addNewAudiobook = () => {
    const url = "http://127.0.0.1:8000/admin/audiobooks/addAudiobook";
    const method = "PUT";
    const CHUNK_SIZE = 1024 * 1024 * 5;
    const reader = new FileReader();
    const fileName = stateModal.title + "_" + stateModal.author;
    const hashName = sha256(fileName).toString();

    setSateModal({ upload: true, modal: 3 });

    reader.onload = function (e) {
      if (e.target.result instanceof ArrayBuffer) {
        let buf = new Uint8Array(e.target.result);
        let allparts = 0;
        let part = 1;

        if (buf.length < CHUNK_SIZE) {
          let b64 = Buffer.from(buf).toString("base64");

          const jsonData = {
            login_token: props.categoryKey,
            set_key: props.token,
            hash_name: hashName,
            file_name: fileName,
            part_nr: part,
            all_parts_nr: part,
            base64: b64,
          };

          setStateProgress({
            ...stateProgress,
            maxParts: part,
            currentPart: part,
          });

          HandleFetch(url, jsonData, method)
            .then((data) => {
              if (data.status != 200) {
                setStateProgress({ ...stateProgress, error: true });
              }
            })
            .catch((e) => {
              if (e) {
                if (parseInt.t(e.message) === 401) {
                  props.setState({
                    ...props.state,
                    redirect: true,
                    redirectTo: "/admin/login",
                  });
                }
                console.log(e);
                props.setState({
                  ...props.state,
                  errors: parseInt.t(e.message),
                });
              }
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
              login_token: props.categoryKey,
              set_key: props.token,
              hash_name: hashName,
              file_name: fileName,
              part_nr: part,
              all_parts_nr: allparts,
              base64: b64,
            };

            HandleFetch(url, jsonData, method)
              .then((data) => {
                if (data.status != 200) {
                  setStateProgress({ ...stateProgress, error: true });
                }
              })
              .catch((e) => {
                if (e) {
                  if (parseInt.t(e.message) === 401) {
                    props.setState({
                      redirect: true,
                      redirectTo: "/admin/login",
                    });
                  }
                  console.log(e);
                  props.setState({
                    ...props.state,
                    errors: parseInt.t(e.message),
                  });
                }
              });

            part = part + 1;
          }
        }
      }
    };
    if (stateModal.file !== null) {
      reader.readAsArrayBuffer(stateModal.file);
    }
  };

  return (
    <>
      <Modal
        show={stateModal.modal === 1}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="custom-dialog"
      >
        <Modal.Header>
          <Modal.Title>
            <h3>
              <b>{props.t("AddNewBookButton")}</b>
            </h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{props.t("title")}</h5>
          <input
            id="author"
            type="text"
            name="author"
            value={stateModal.author}
            className="form-control mt-2"
            onChange={handleSetAuthorChange}
          />
          <h5>{props.t("author")}</h5>
          <input
            id="title"
            type="text"
            name="title"
            value={stateModal.title}
            className="form-control mt-2"
            onChange={handleSetTitleChange}
          />
        </Modal.Body>
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
      </Modal>

      <Modal
        show={stateModal.modal === 2 || stateModal.modal === 3}
        backdrop="static"
        keyboard={false}
        dialogClassName="custom-dialog"
      >
        <Modal.Header>
          <Modal.Title>
            <h3>
              <b>{props.t("AddNewBookButton")}</b>
            </h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {stateModal.modal === 3 || stateModal.progress > 0 ? (
            <div>Loading</div>
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
        <Modal.Footer>
          {stateModal.upload === false ? (
            <div>
              <Button variant="dark" onClick={handleBack}>
                {props.t("GoBack")}
              </Button>

              <Button
                disabled={stateModal.fileAdded === false}
                variant="dark"
                onClick={addNewAudiobook}
              >
                {props.t("Upload")}
              </Button>
            </div>
          ) : (
            <div>
              <Button
                disabled={!stateModal.uploadEnded}
                variant="dark"
                onClick={() => {
                  props.setState({
                    ...props.state,
                    updated: !props.state.updated,
                    modalAddShow: !props.state.modalAddShow,
                  });
                }}
              >
                {props.t("end")}
              </Button>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
