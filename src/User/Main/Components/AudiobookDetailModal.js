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
          <div className="row "style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(255,255,255,0.1)), url(${props.audiobooksState.detailModalCover})`, 
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'left center',
            marginLeft: '1rem',
          }}>
            <div className="col-3">

            </div>
            <div className="col-9">
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
