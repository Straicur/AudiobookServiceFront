import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { HandleFetch } from "../../../../Components/HandleFetch";
import { Buffer } from "buffer";
import AudioPlayer from "react-h5-audio-player";
import { useAudiobookData } from "../../../../Components/Providers/AudiobookProviders/AudiobookDataProvider";
import { useAudiobookCover } from "../../../../Components/Providers/AudiobookProviders/AudiobookCoverDataProvider";
import { useAudiobookPart } from "../../../../Components/Providers/AudiobookProviders/AudiobookPartProvider";
// import { useAudiobookComments } from "../../../../Components/Providers/AudiobookProviders/AudiobookCommentsProvider";

export default function CategoryAudiobookDetailModal(props) {
  const audiobookDetail = useAudiobookData();
  const audiobookCover = window.URL.createObjectURL(
    new Blob([useAudiobookCover()])
  );
  const audiobookPart = window.URL.createObjectURL(
    new Blob([useAudiobookPart()])
  );

  const handleClose = () => {
    props.setState({
      ...props.state,
      detailAudiobookModal: !props.state.detailAudiobookModal,
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
        <Modal.Title>
          <h3 className="text-light">
            <b>
              {audiobookDetail != null
                ? props.t("title") + ": " + audiobookDetail.title
                : null}
            </b>
          </h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        <div className="row ">
          <div className="col">
            <img
              src={audiobookCover == null ? "/noImg.jpg" : audiobookCover}
              className="card-img-top"
              alt="..."
            />
          </div>
          <div className="col">
            <div className="row ">
              <div className="row text-light">
                {audiobookDetail != null
                  ? props.t("author") + ": " + audiobookDetail.author
                  : null}
              </div>
              <div className="row text-light">
                {audiobookDetail != null
                  ? props.t("album") + ": " + audiobookDetail.album
                  : null}
              </div>
              <div className="row text-light">
                {audiobookDetail != null
                  ? props.t("year") + ": " + audiobookDetail.year
                  : null}
              </div>
              <div className="row text-light">
                {audiobookDetail != null
                  ? props.t("parts") + ": " + audiobookDetail.parts
                  : null}
              </div>
              <div className="row text-light">
                {audiobookDetail != null
                  ? props.t("duration") + ": " + audiobookDetail.duration + "h"
                  : null}
              </div>
              <div className="row text-light">
                {audiobookDetail != null
                  ? props.t("description") + ": " + audiobookDetail.description
                  : null}
              </div>
              <div className="row text-light">
                {audiobookDetail != null
                  ? props.t("encoded") + ": " + audiobookDetail.encoded
                  : null}
              </div>
              <div className="row text-light">
                {audiobookDetail != null
                  ? props.t("parts") + ": " + audiobookDetail.parts
                  : null}
              </div>
              <div className="row text-light">
                {audiobookDetail != null
                  ? props.t("version") + ": " + audiobookDetail.version
                  : null}
              </div>
              <div className="row text-light">
                {/* {t("desc")}: {audiobookDetail.comments} */}
              </div>
              <div className="row text-light">
                {/* {t("desc")}: {audiobookDetail.categories} */}
              </div>
              <div className="row text-light">
                {audiobookDetail != null
                  ? props.t("age") +
                    ": " +
                    (audiobookDetail.age == 1
                      ? "3-7"
                      : audiobookDetail.age == 2
                      ? "7-12"
                      : audiobookDetail.age == 3
                      ? "12-16"
                      : audiobookDetail.age == 3
                      ? "16-18"
                      : audiobookDetail.age == 5
                      ? "18+"
                      : null)
                  : null}
              </div>
              <div className="row text-light">
                {audiobookDetail != null
                  ?( props.t("active")+": " + audiobookDetail.active ? (
                    <i className="bi bi-bookmark-check-fill"></i>
                  ) : (
                    <i className="bi bi-bookmark-dash"></i>
                  ))
                  : null}
     
              </div>
            </div>
            <div className="row ">
              <Button
              // variant={audiobookDetail.like ? "warning" : "success"}
              // onClick={() => like()}
              >
                {/* {audiobookDetail.like ? t("Unlike") : t("Like")} */}
              </Button>
            </div>
          </div>
        </div>
        <hr className="text-light"></hr>
        <div className="row audio">
          {audiobookPart != null ? (
            <AudioPlayer
              header={<h3></h3>}
              autoPlay={false}
              src={audiobookPart}
              // onListen={e=>timeCur(e)}
              autoPlayAfterSrcChange={false}
              showSkipControls={true}
              // onClickPrevious={()=>prevPart()}
              // onClickNext={()=>nextPart()}
            />
          ) : null}
        </div>
      </Modal.Body>
    </Modal>
  );
}
