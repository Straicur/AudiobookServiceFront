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
        {/* <Modal.Title><h3 className="text-light"><b>{modalState.title}</b></h3></Modal.Title> */}
      </Modal.Header>
      <Modal.Body className="bg-dark">
        {console.log(useAudiobookCover())}
        <div className="col">
          <img
            src={audiobookCover == null ? "/noImg.jpg" : audiobookCover}
            className="card-img-top"
            alt="..."
          />
        </div>
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
      </Modal.Body>
    </Modal>
  );
}
