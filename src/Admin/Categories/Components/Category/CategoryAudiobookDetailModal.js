import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import AudioPlayer from "react-h5-audio-player";
import { HandleFetch } from "../../../../Components/HandleFetch";
import "react-h5-audio-player/lib/styles.css";
import { useAudiobookData } from "../../../../Components/Providers/AudiobookProviders/AudiobookDataProvider";
import { useAudiobookCover } from "../../../../Components/Providers/AudiobookProviders/AudiobookCoverDataProvider";
import { useAudiobookPart } from "../../../../Components/Providers/AudiobookProviders/AudiobookPartProvider";
import { Buffer } from "buffer";
import { v4 as uuidv4 } from "uuid";
import CategoryEditForm from "./CategoryEditForm";

//todo to jest do rozbicia na mniejsze pliki
export default function CategoryAudiobookDetailModal(props) {
  const [stateModal, setStateModal] = useState({
    file: null,
    edit: false,
    deleteFromCategory: false,
    deleteEntarly: false,
  });

  const [audiobookDetail, setAudiobookDetail, setAudiobookDetailRefetch] =
    useAudiobookData();
  const [audiobookCover, setAudiobookCover, setAudiobookCoverRefetch] =
    useAudiobookCover();
  const [audiobookPart, setAudiobookPart] = useAudiobookPart();

  const handleOnFileChange = (e) => {
    if (e.target.files) {
      let file = e.target.files[0];

      if (
        file.type == "image/png" ||
        file.type == "image/jpeg" ||
        file.type == "image/jpg"
      ) {
        setStateModal({ ...stateModal, file: file });
      }
    }
  };

  const editCover = () => {
    if (stateModal.file != null) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target.result instanceof ArrayBuffer) {
          let pattern = "/jpeg|png|jpg/i";
          let result = stateModal.file.type.match(pattern);

          if (result != null) {
            let buf = new Uint8Array(e.target.result);
            let b64 = Buffer.from(buf).toString("base64");
            HandleFetch(
              "http://127.0.0.1:8000/api/admin/audiobook/change/cover",
              "PATCH",
              {
                type: result[0],
                base64: b64,
                audiobookId: audiobookDetail.id,
              },
              props.token
            )
              .then(() => {
                setAudiobookCoverRefetch(true);
                setStateModal({ ...stateModal, file: null });
              })
              .catch((e) => {
                props.setState({
                  ...props.state,
                  error: e,
                });
                handleClose();
              });
          }
        }
      };
      if (stateModal.file != null) {
        reader.readAsArrayBuffer(stateModal.file);
      }
    }
  };

  const handleClose = () => {
    props.setState({
      ...props.state,
      detailAudiobookModal: !props.state.detailAudiobookModal,
      detailAudiobookElement: null,
      refresh: !props.state.refresh,
    });
  };

  const getZip = () => {
    HandleFetch(
      "http://127.0.0.1:8000/api/admin/audiobook/zip",
      "POST",
      {
        audiobookId: audiobookDetail.id,
      },
      props.token
    )
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));

        const link = document.createElement("a");

        link.href = url;

        link.setAttribute("download", "YourAudiobook.zip");

        document.body.appendChild(link);

        link.click();

        link.parentNode.removeChild(link);
      })
      .catch((e) => {
        props.setState({
          ...props.state,
          error: e,
        });
        handleClose();
      });
  };

  const deleteAudiobookEntarly = () => {
    HandleFetch(
      "http://127.0.0.1:8000/api/admin/audiobook/delete",
      "DELETE",
      {
        audiobookId: audiobookDetail.id,
      },
      props.token
    )
      .then(() => {
        handleClose();
      })
      .catch((e) => {
        props.setState({
          ...props.state,
          error: e,
        });
        handleClose();
      });
  };

  const deleteAudiobookFromCategory = () => {
    HandleFetch(
      "http://127.0.0.1:8000/api/admin/category/remove/audiobook",
      "DELETE",
      {
        categoryId: props.state.category.id,
        audiobookId: audiobookDetail.id,
      },
      props.token
    )
      .then(() => {
        handleClose();
      })
      .catch((e) => {
        props.setState({
          ...props.state,
          error: e,
        });
        handleClose();
      });
  };

  const createCategory = (category) => {
    return (
      <div
        key={uuidv4()}
        className="row border border-secondary category_data mb-1"
      >
        <div className="row">
          <div className="col">{props.t("name")}:</div>
          <div className="col">{category.name}</div>
          <div className="col">{props.t("active")}:</div>
          <div className="col">
            {category.active ? (
              <i className="bi bi-bookmark-check-fill"></i>
            ) : (
              <i className="bi bi-bookmark-dash"></i>
            )}
          </div>
        </div>
        <div className="row"></div>
        <div className="row">
          <div className="col">{props.t("categoryKey")}:</div>
          <div className="col">{category.categoryKey}</div>
        </div>
      </div>
    );
  };

  const getCategoryList = () => {
    let categories = [];
    if (audiobookDetail != null && audiobookDetail.categories != undefined) {
      audiobookDetail.categories.forEach((category) => {
        categories.push(createCategory(category));
      });
    }

    return (
      <div className="row text-light d-flex justify-content-center mx-1">
        {categories}
      </div>
    );
  };

  const nextPart = () => {
    let nextPart = props.state.detailAudiobookElementPart + 1;

    if (nextPart < props.state.detailAudiobookElement.parts) {
      props.setState({ ...props.state, detailAudiobookElementPart: nextPart });
    }
  };
  const prevPart = () => {
    let prevPart = props.state.detailAudiobookElementPart - 1;

    if (prevPart >= 0) {
      props.setState({ ...props.state, detailAudiobookElementPart: prevPart });
    }
  };

  return (
    <Modal
      show={props.state.detailAudiobookModal}
      onHide={handleClose}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="bg-dark">
        <Button
          name="en"
          size="sm"
          className="btn button primary_button"
          onClick={getZip}
        >
          {props.t("downloadZip")}
        </Button>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        <div className="row ">
          <div className="col">
            <div className="row ">
              <img
                src={
                  audiobookCover == null
                    ? "/noImg.jpg"
                    : window.URL.createObjectURL(new Blob([audiobookCover]))
                }
                className="card-img-top"
                alt="..."
              />
            </div>
            <div className="row d-flex justify-content-center">
              <Form.Group controlId="formFileSm" className="my-1">
                <Form.Control
                  onChange={handleOnFileChange}
                  type="file"
                  size="sm"
                />
              </Form.Group>
              <Button
                name="en"
                variant="secondary"
                size="sm"
                className="btn button px-4 my-2 modal_img_button"
                disabled={stateModal.file == null}
                onClick={editCover}
              >
                {props.t("editCover")}
              </Button>
            </div>
            <div className="row d-flex justify-content-center text-light text-center">
              <h4>{props.t("categories")}</h4>
            </div>
            {getCategoryList()}
          </div>

          <div className="col">
            < CategoryEditForm audiobookDetail={audiobookDetail} setAudiobookDetail={setAudiobookDetail} stateModal={stateModal} setStateModal = {setStateModal} setAudiobookDetailRefetch={setAudiobookDetailRefetch} handleClose={handleClose} setState={props.setState} state={props.state} t={props.t} token={props.token}/>
            {stateModal.deleteFromCategory ? (
              <div className="row">
                <div className="col">
                  <Button
                    name="en"
                    size="sm"
                    className="btn button px-4 my-1 question_button success_button"
                    onClick={deleteAudiobookFromCategory}
                  >
                    {props.t("yes")}
                  </Button>
                </div>
                <div className="col">
                  <Button
                    name="en"
                    size="sm"
                    className="btn button px-4 my-1 question_button danger_button me-2"
                    onClick={() =>
                      setStateModal({
                        ...stateModal,
                        deleteFromCategory: !stateModal.deleteFromCategory,
                      })
                    }
                  >
                    {props.t("no")}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="row">
                <Button
                  name="en"
                  size="sm"
                  className="btn button px-4 my-1 modal_button danger_button"
                  onClick={() =>
                    setStateModal({
                      ...stateModal,
                      deleteFromCategory: !stateModal.deleteFromCategory,
                    })
                  }
                >
                  {props.t("deleteFromCurrentCategory")}
                </Button>
              </div>
            )}

            {stateModal.deleteEntarly ? (
              <div className="row">
                <div className="col">
                  <Button
                    name="en"
                    size="sm"
                    className="btn button px-4 my-1 question_button success_button"
                    onClick={deleteAudiobookEntarly}
                  >
                    {props.t("yes")}
                  </Button>
                </div>
                <div className="col">
                  <Button
                    name="en"
                    size="sm"
                    className="btn button px-4 my-1 question_button danger_button me-2"
                    onClick={() =>
                      setStateModal({
                        ...stateModal,
                        deleteEntarly: !stateModal.deleteEntarly,
                      })
                    }
                  >
                    {props.t("no")}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="row">
                <Button
                  name="en"
                  size="sm"
                  className="btn button px-4 my-1 modal_button danger_button"
                  onClick={() =>
                    setStateModal({
                      ...stateModal,
                      deleteEntarly: !stateModal.deleteEntarly,
                    })
                  }
                >
                  {props.t("deleteEntarly")}
                </Button>
              </div>
            )}
          </div>
        </div>

        <hr className="text-light"></hr>
        <div className="row d-flex justify-content-center">
          {audiobookPart != null ? (
            <AudioPlayer
              autoPlay={false}
              src={window.URL.createObjectURL(new Blob([audiobookPart]))}
              autoPlayAfterSrcChange={false}
              showSkipControls={true}
              onClickPrevious={prevPart}
              onClickNext={nextPart}
            />
          ) : null}
        </div>
      </Modal.Body>
    </Modal>
  );
}
