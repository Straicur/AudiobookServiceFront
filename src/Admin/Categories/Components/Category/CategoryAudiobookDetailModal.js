import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AudioPlayer from "./AudiobookPlayer";
import { HandleFetch } from "../../../../Components/HandleFetch";
import "react-h5-audio-player/lib/styles.css";
import { useAudiobookData } from "../../../../Components/Providers/AudiobookProviders/AudiobookDataProvider";
import { useAudiobookCover } from "../../../../Components/Providers/AudiobookProviders/AudiobookCoverDataProvider";
import { useAudiobookPart } from "../../../../Components/Providers/AudiobookProviders/AudiobookPartProvider";
import { Buffer } from "buffer";
import CategoryEditForm from "./CategoryEditForm";
import AudiobookCategoryList from "./AudiobookCategoryList";
import AudiobookCover from "./AudiobookCover";
import GetAudiobookZipButton from "./GetAudiobookZipButton";

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
        <GetAudiobookZipButton setState={props.setState} state={props.state} t={props.t}/>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        <div className="row ">
          <div className="col">
            <AudiobookCover setState={props.setState} state={props.state} t={props.t}/>
            <div className="row d-flex justify-content-center text-light text-center">
              <h4>{props.t("categories")}</h4>
            </div>
            <AudiobookCategoryList
              audiobookDetail={audiobookDetail}
              t={props.t}
            />
          </div>

          <div className="col">
            <CategoryEditForm
              audiobookDetail={audiobookDetail}
              setAudiobookDetail={setAudiobookDetail}
              stateModal={stateModal}
              setStateModal={setStateModal}
              setAudiobookDetailRefetch={setAudiobookDetailRefetch}
              handleClose={handleClose}
              setState={props.setState}
              state={props.state}
              t={props.t}
              token={props.token}
            />
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
              audiobookPart={audiobookPart}
              setState={props.setState}
              state={props.state}
            />
          ) : null}
        </div>
      </Modal.Body>
    </Modal>
  );
}
