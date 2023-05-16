import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { useAudiobookRating } from "../../../Components/Providers/AudiobookProviders/AudiobookRatingProvider";
import { useAudiobookDetail } from "../../../Components/Providers/AudiobookProviders/AudiobookUserDetailProvider";
import { useAudiobookPart } from "../../../Components/Providers/AudiobookProviders/AudiobookPartProvider";
import AudiobookPlayer from "./AudiobookPlayer";
import { HandleFetch } from "../../../Components/HandleFetch";

export default function AudiobookDetailModal(props) {
  const [timeAudio, setTime] = useState("00:00:00");

  const [audiobookDetail, setAudiobookDetail, setAudiobookDetailRefetch] =
    useAudiobookDetail();
  const [audiobookRating, setAudiobookRating, setRefetchRatingState] =
    useAudiobookRating();
  const [audiobookPart, setAudiobookPart, setRefetchPartState] =
    useAudiobookPart();

  const handleClose = () => {
    addInfo()
    props.setAudiobooksState({
      ...props.audiobooksState,
      detailModal: !props.audiobooksState.detailModal,
      detailModalAudiobook: null,
      detailModalCover: null,
    });
  };

  function fancyTimeFormat(duration) {
    let hrs = ~~(duration / 3600);
    let mins = ~~((duration % 3600) / 60);
    let secs = ~~duration % 60;

    let ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }

  const addToMyList = (element) => {
    element.target.classList.add("disabled");
    HandleFetch(
      "http://127.0.0.1:8000/api/user/audiobook/like",
      "PATCH",
      {
        audiobookId: props.audiobooksState.detailModalAudiobook.id,
        categoryKey: props.audiobooksState.detailModalCategory.categoryKey,
      },
      props.token
    )
      .then(() => {
        setAudiobookDetail({
          ...audiobookDetail,
          inList: !audiobookDetail.inList
        })

        element.target.classList.remove("disabled");
      })
      .catch((e) => {
        props.setAudiobooksState({
          ...props.audiobooksState,
          error: e,
        });
      });
  };

  // tu muszę tera dodać do końca te info i ustawić tak jak skończył ostatnio 
  // Dodatkowow jeszcze tu weź zmień tą długość audiobooka na sekundy i zrób przedziały kiedy będzie mógł oceniać 
  // Brakuje tu jeszcze opcji oceniania i wyświetlania tych gwiazdek 
  const addInfo = () => {
    HandleFetch(
      "http://127.0.0.1:8000/api/user/audiobook/info/add",
      "PUT",
      {
        audiobookId: props.audiobooksState.detailModalAudiobook.id,
        categoryKey: props.audiobooksState.detailModalCategory.categoryKey,
        part: props.audiobookState.part ,
        endedTime: fancyTimeFormat(timeAudio),
        watched: false
      },
      props.token
    )
      .then(() => {
        // setAudiobookDetail({
        //   ...audiobookDetail,
        //   inList: !audiobookDetail.inList
        // })
      })
      .catch((e) => {
        props.setAudiobooksState({
          ...props.audiobooksState,
          error: e,
        });
      });
  };
  const addComment = () => {};
  const showComments = () => {};
  const renderStars = () => {
    // let stars = [];
    // let amountOfStars = 5;
    // if (audiobookDetail != null) {
    //   if (audiobookDetail.avgRating != 0) {
    //     for (let i = 0; i < audiobookDetail.avgRating; i++) {
    //       stars.push(
    //         <div key={uuidv4()}  className="col-1">
    //           <i className="bi bi-star-fill"></i>
    //         </div>
    //       );
    //       amountOfStars = amountOfStars - 1;
    //     }
    //   }
    //   for (let i = 0; i < amountOfStars; i++) {
    //     stars.push(
    //       <div key={uuidv4()}  className="col-1">
    //         <i className="bi bi-star"></i>
    //       </div>
    //     );
    //   }
    // }
    // return stars;
  };

  return (
    <Modal
      size="lg"
      show={props.audiobooksState.detailModal}
      onHide={handleClose}
    >
      <Modal.Body className="text-white">
        {audiobookDetail != null ? (
          <div
            className="row "
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.7) 47%, rgba(255,255,255,0.1) 82%), url(${props.audiobooksState.detailModalCover})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "60%",
              backgroundPosition: "95% 15%",
              paddingBottom: "15rem",
            }}
          >
            <div className="col-6">
              <div className="row">
                <h1>{audiobookDetail.title}</h1>
              </div>
              <div className="row mb-3">
                <h2>
                  {props.t("author")}: {audiobookDetail.author}
                </h2>
              </div>
              <div className="row mb-3 text-wrap">
                <div className="col-10">
                  {props.t("description")}: {audiobookDetail.description}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-5">
                  {props.t("year")}: {audiobookDetail.year}
                </div>
                <div className="col-4">
                  {props.t("version")}: {audiobookDetail.version}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-5">
                  {props.t("parts")}: {audiobookDetail.parts}
                </div>
                <div className="col-5">
                  {props.t("duration")}: {audiobookDetail.duration}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col">
                  {props.t("album")}: {audiobookDetail.album}
                </div>
              </div>
              <div className="row justify-content-center mb-2">
                <div className="col-6">
                  <Button
                    onClick={(e)=>addToMyList(e)}
                    variant={audiobookDetail.inList ? "danger" : "success"}
                  >
                    {props.t("myList")}{" "}
                    {audiobookDetail.inList ? (
                      <i className="bi bi-x-lg"></i>
                    ) : (
                      <i className="bi bi-check-lg"></i>
                    )}
                  </Button>
                </div>
              </div>
              <div className="row mb-5">
                <div className="col">
                  {props.t("categories")}:{" "}
                  {audiobookDetail.categories.map((category, index) => {
                    let name = category.name;

                    if (index != audiobookDetail.categories.length - 1) {
                      name = name + ", ";
                    }

                    return name;
                  })}
                </div>
              </div>
              <div className="row my-1">
                <div className="col-5 fs-5">
                  {props.t("comments")}: {audiobookDetail.comments}
                </div>
                <div className="col">
                  {audiobookDetail.comments > 0 ? (
                    <Button
                      size="sm"
                      variant="dark"
                      onClick={showComments}
                      className="comments-show-button"
                    >
                      {props.t("show")}
                    </Button>
                  ) : null}
                </div>
              </div>
              <div className="row justify-content-start mb-2">
                <div className="col-8">
                  <Button
                    size="sm"
                    variant="dark"
                    onClick={addComment}
                    className="comments-button"
                  >
                    {props.t("add")}
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-6"></div>
          </div>
        ) : null}

        <div className="row mt-4 justify-content-center">
          <div className="col">
            <AudiobookPlayer
              audiobookPart={audiobookPart}
              setAudiobookState={props.setAudiobookState}
              audiobookState={props.audiobookState}
              audiobooksState={props.audiobooksState}
              setTime={setTime}
              t={props.t}
            />
          </div>
        </div>
        <div className="row mt-3 justify-content-center">
          <div className="col-7  align-self-center">
            <Button
              variant="dark"
              onClick={handleClose}
              className="detail-button text-center"
            >
              {props.t("close")}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
