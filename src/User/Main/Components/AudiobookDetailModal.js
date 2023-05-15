import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAudiobookRating } from "../../../Components/Providers/AudiobookProviders/AudiobookRatingProvider";
import { useAudiobookDetail } from "../../../Components/Providers/AudiobookProviders/AudiobookUserDetailProvider";
import { useAudiobookPart } from "../../../Components/Providers/AudiobookProviders/AudiobookPartProvider";
import AudiobookPlayer from "./AudiobookPlayer";

export default function AudiobookDetailModal(props) {
  const handleClose = () => {
    props.setAudiobooksState({
      ...props.audiobooksState,
      detailModal: !props.audiobooksState.detailModal,
      detailModalAudiobook: null,
      detailModalCover: null,
    });
  };
  const [audiobookDetail, setAudiobookDetail, setAudiobookDetailRefetch] =
    useAudiobookDetail();
  const [audiobookRating, setAudiobookRating, setRefetchRatingState] =
    useAudiobookRating();
  const [audiobookPart, setAudiobookPart, setRefetchPartState] =
    useAudiobookPart();

  return (
    <Modal
      size="lg"
      show={props.audiobooksState.detailModal}
      onHide={handleClose}
    >
      <Modal.Body className="text-white">
        {audiobookDetail != null ? (
          <div className="row ">
            <div className="col">
              <img
                src={props.audiobooksState.detailModalCover}
                className="card-img-top"
                alt="..."
              />
            </div>
            <div className="col">
              <div className="row">
                <h1>{audiobookDetail.title}</h1>
              </div>
              <div className="row">
                <h2>
                  {props.t("author")}: {audiobookDetail.author}
                </h2>
              </div>
              <div className="row">
                <div className="col">
                  {props.t("year")}: {audiobookDetail.year}
                </div>
                <div className="col">
                  {props.t("version")}: {audiobookDetail.version}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  {props.t("parts")}: {audiobookDetail.parts}
                </div>
                <div className="col">
                  {props.t("duration")}: {audiobookDetail.duration}
                </div>
              </div>

              <div className="row">
                {" "}
                <div className="col">{audiobookDetail.description} </div>
              </div>
              <div className="row">
                <div className="col">
                  {props.t("album")}: {audiobookDetail.album}
                </div>
              </div>
              <div className="row mx-1">
                <Button variant={audiobookDetail.inList ? "danger" : "success"}>
                  {props.t("myList")}
                  {audiobookDetail.inList ? (
                    <i className="bi bi-x-lg"></i>
                  ) : (
                    <i className="bi bi-check-lg"></i>
                  )}
                </Button>
              </div>
              <div className="row">
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
                <div className="col">
                  {props.t("comments")}: {audiobookDetail.comments}
                </div>
                <div className="col">
                  {audiobookDetail.comments > 0 ? (
                    <Button variant="dark" onClick={handleClose}>
                      {props.t("show")}
                    </Button>
                  ) : (
                    <Button variant="dark" onClick={handleClose}>
                      {props.t("add")}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="row ">
          <AudiobookPlayer
            audiobookPart={audiobookPart}
            setAudiobookState={props.setAudiobookState}
            audiobookState={props.audiobookState}
            audiobooksState={props.audiobooksState}
          />
        </div>
        <div className="row ">
          <Button variant="dark" onClick={handleClose}>
            {props.t("close")}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
