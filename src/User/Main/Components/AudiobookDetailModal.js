import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useRef } from "react";
import { useAudiobookRating } from "../../../Components/Providers/AudiobookProviders/AudiobookRatingProvider";
import { useAudiobookDetail } from "../../../Components/Providers/AudiobookProviders/AudiobookUserDetailProvider";
import { useAudiobookPart } from "../../../Components/Providers/AudiobookProviders/AudiobookPartProvider";
import { useAudiobookUserComments } from "../../../Components/Providers/AudiobookProviders/AudiobookUserCommentsProvider";
import AudiobookPlayer from "./AudiobookPlayer";
import { HandleFetch } from "../../../Components/HandleFetch";
import StarRating from "./StarRating";
import RenderCommentsList from "./RenderCommentsList";

export default function AudiobookDetailModal(props) {
  const timeAudio = useRef(0);

  const [audiobookDetail, setAudiobookDetail, setAudiobookDetailRefetch] =
    useAudiobookDetail();
  const [audiobookRating, setAudiobookRating, setRefetchRatingState] =
    useAudiobookRating();
  const [audiobookPart, setAudiobookPart, setRefetchPartState] =
    useAudiobookPart();

  const [
    audiobookUserComments,
    setAudiobookUserComments,
    setAudiobookCommnetsRefetchState,
  ] = useAudiobookUserComments();

  const handleClose = () => {
    addInfo();
    props.setAudiobooksState({
      ...props.audiobooksState,
      detailModal: !props.audiobooksState.detailModal,
      detailModalAudiobook: null,
      detailModalCover: null,
    });
  };

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
          inList: !audiobookDetail.inList,
        });

        element.target.classList.remove("disabled");
      })
      .catch((e) => {
        props.setAudiobooksState({
          ...props.audiobooksState,
          error: e,
        });
      });
  };

  //todo zrób teraz generację komentarzy oraz możliwość dodawania, edytowania i likowania (można pobrać dodatkowo dzieci komentarzy)
  // po tym muszę jeszcze zrobić listę proponowanych i tu muszę dodać trochę audiobooków, dorobić info słuchając i komenda na koniec w backendzie
  // Do tego jeszcze wyszukiwarka dojdzie po nazwie
  // To są już wtedy wszystkie detale, po nich tworze moją listę i zostają mi ustawienia

  const addInfo = () => {
    let audioContext = new window.AudioContext();
    let arrayBuffer;

    let fileReader = new FileReader();

    fileReader.onload = function (event) {
      arrayBuffer = event.target.result;
      audioContext.decodeAudioData(arrayBuffer, function (buffer) {
        let duration = buffer.duration;
        let procent = (timeAudio.current / duration) * 100;
        let watched = false;

        if (procent >= 70) {
          watched = true;
        }
        if (procent >= 20) {
          HandleFetch(
            "http://127.0.0.1:8000/api/user/audiobook/info/add",
            "PUT",
            {
              audiobookId: props.audiobooksState.detailModalAudiobook.id,
              categoryKey:
                props.audiobooksState.detailModalCategory.categoryKey,
              part: props.audiobookState.part,
              endedTime: timeAudio.current,
              watched: watched,
            },
            props.token
          )
            .then(() => {})
            .catch((e) => {
              props.setAudiobooksState({
                ...props.audiobooksState,
                error: e,
              });
            });
        }

        timeAudio.current = 0;
      });
    };

    fileReader.readAsArrayBuffer(new Blob([audiobookPart]));
  };
  const addComment = () => {};
  const showComments = () => {};

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
              paddingBottom: "3rem",
            }}
          >
            <div className="col-8">
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
                    onClick={(e) => addToMyList(e)}
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
              <div className="row">
                <div className="col-4">{props.t("rating")}:</div>
                <div className="col-8">
                  <StarRating
                    count={5}
                    audiobookDetail={audiobookDetail}
                    audiobookRating={audiobookRating}
                    token={props.token}
                    categoryKey={
                      props.audiobooksState.detailModalCategory.categoryKey
                    }
                    t={props.t}
                  />
                </div>
              </div>
              <div className="row my-1">
                <div className="col-5 fs-5">
                  {props.t("comments")}: {audiobookDetail.comments}
                </div>
              </div>
              <div className="row comments-heigth overflow-auto my-1">
                <RenderCommentsList
                  comments={audiobookUserComments}
                  audiobooksState={props.audiobooksState}
                  setAudiobooksState={props.setAudiobooksState}
                  t={props.t}
                  token={props.token}
                />
              </div>
              {audiobookDetail.canComment > 0 ? (
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
              ) : null}
            </div>
            <div className="col-4"></div>
          </div>
        ) : null}

        <div className="row mt-4 justify-content-center">
          <div className="col">
            <AudiobookPlayer
              audiobookPart={audiobookPart}
              setAudiobookState={props.setAudiobookState}
              audiobookState={props.audiobookState}
              audiobooksState={props.audiobooksState}
              timeAudio={timeAudio}
              addInfo={addInfo}
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
