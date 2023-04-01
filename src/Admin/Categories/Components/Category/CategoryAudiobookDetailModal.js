import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AudioPlayer from "./AudiobookPlayer";
import { HandleFetch } from "../../../../Components/HandleFetch";
import "react-h5-audio-player/lib/styles.css";
import { useAudiobookData } from "../../../../Components/Providers/AudiobookProviders/AudiobookDataProvider";
import { useAudiobookCover } from "../../../../Components/Providers/AudiobookProviders/AudiobookCoverDataProvider";
import { useAudiobookPart } from "../../../../Components/Providers/AudiobookProviders/AudiobookPartProvider";
import CategoryEditForm from "./CategoryEditForm";
import AudiobookCategoryList from "./AudiobookCategoryList";
import AudiobookCover from "./AudiobookCover";
import GetAudiobookZipButton from "./GetAudiobookZipButton";

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

  const renderStars = () => {
    let stars = [];
    let amountOfStars = 5;
    if (audiobookDetail != null) {
 
      if (audiobookDetail.avgRating != 0) {
        for (let i = 0; i < audiobookDetail.avgRating; i++) {
          stars.push(
            <div className="col-1">
              <i className="bi bi-star-fill"></i>
            </div>
          );
          amountOfStars = amountOfStars - 1;
        }
      }

      for (let i = 0; i < amountOfStars; i++) {
        stars.push(
          <div className="col-1">
            <i className="bi bi-star"></i>
          </div>
        );
      }
    }
    return stars;
  };

  return (
    <Modal
      show={props.state.detailAudiobookModal}
      onHide={handleClose}
      size="lg"
      backdrop="static"
      centered
    >
      <Modal.Header closeButton className="bg-dark">
        <GetAudiobookZipButton
          audiobookDetail={audiobookDetail}
          setState={props.setState}
          state={props.state}
          handleClose={handleClose}
          t={props.t}
          token={props.token}
        />
      </Modal.Header>
      <Modal.Body className="bg-dark">
        <div className="row ">
          <div className="col">
            <AudiobookCover
              audiobookCover={audiobookCover}
              setState={props.setState}
              state={props.state}
              t={props.t}
              setAudiobookCoverRefetch={setAudiobookCoverRefetch}
              stateModal={stateModal}
              setStateModal={setStateModal}
              handleClose={handleClose}
              audiobookDetail={audiobookDetail}
              token={props.token}
            />
            <div className="row d-flex justify-content-center text-light text-center">
              {renderStars()}
            </div>
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
