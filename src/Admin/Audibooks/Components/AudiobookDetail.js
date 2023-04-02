import { useAudiobookData } from "../../../Components/Providers/AudiobookProviders/AudiobookDataProvider";
import { useAudiobookCover } from "../../../Components/Providers/AudiobookProviders/AudiobookCoverDataProvider";
import { useAudiobookPart } from "../../../Components/Providers/AudiobookProviders/AudiobookPartProvider";
import { useAudiobookComments } from "../../../Components/Providers/AudiobookProviders/AudiobookCommentsProvider";
import { HandleFetch } from "../../../Components/HandleFetch";
import CategoryEditForm from "./CategoryEditForm";
import AudiobookCategoryList from "./AudiobookCategoryList";
import AudiobookCover from "./AudiobookCover";
import GetAudiobookZipButton from "./GetAudiobookZipButton";
import Button from "react-bootstrap/Button";
import AudioPlayer from "./AudiobookPlayer";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function AudiobookDetail(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [audiobookDetail, setAudiobookDetail, setAudiobookDetailRefetch] =
    useAudiobookData();
  const [audiobookCover, setAudiobookCover, setAudiobookCoverRefetch] =
    useAudiobookCover();
  const [audiobookPart, setAudiobookPart] = useAudiobookPart();
  const [audiobookCommnets, setAudiobookCommnets, setRefetchState] =
    useAudiobookComments();

  const deleteAudiobookEntarly = () => {
    HandleFetch(
      "http://127.0.0.1:8000/api/admin/audiobook/delete",
      "DELETE",
      {
        audiobookId: props.audiobookId,
      },
      props.token
    )
      .then(() => {
        navigate(`/admin/audiobooks`);
      })
      .catch((e) => {
        props.setAudiobookState({
          ...props.audiobookState,
          error: e,
        });
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
    <div className="m-3 ">
      <div className="row ">
        <div className="col-4">
          <AudiobookCover
            audiobookCover={audiobookCover}
            setAudiobookState={props.setAudiobookState}
            audiobookState={props.audiobookState}
            t={t}
            setAudiobookCoverRefetch={setAudiobookCoverRefetch}
            audiobookDetail={audiobookDetail}
            token={props.token}
          />
        </div>

        <div className="col-5">
          <CategoryEditForm
            audiobookDetail={props.audiobookDetail}
            setAudiobookDetail={props.setAudiobookDetail}
            setAudiobookDetailRefetch={setAudiobookDetailRefetch}
            setAudiobookState={props.setAudiobookState}
            audiobookState={props.audiobookState}
            t={t}
            token={props.token}
          />

          <hr></hr>
          <div className="row d-flex justify-content-center">
            {audiobookPart != null ? (
              <AudioPlayer
                audiobookPart={audiobookPart}
                setAudiobookState={props.setAudiobookState}
                audiobookState={props.audiobookState}
              />
            ) : null}
          </div>
        </div>
        <div className="col-3">
        <div className="row d-flex justify-content-center  text-center mb-3">
          <h4>{t("rating")}</h4>
            {renderStars()}
          </div>
          <div className="row d-flex justify-content-center  text-center">
            <h4>{t("categories")}</h4>
          </div>
          <AudiobookCategoryList audiobookDetail={audiobookDetail} t={t} />
          {props.audiobookState.deleteFromCategory ? (
            <div className="row">
              <div className="col">
                <Button
                  name="en"
                  size="sm"
                  className="btn button px-4 my-1 question_button danger_button me-2"
                  onClick={() =>
                    props.setAudiobookState({
                      ...props.audiobookState,
                      deleteFromCategory:
                        !props.audiobookState.deleteFromCategory,
                    })
                  }
                >
                  {t("no")}
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
                  props.setAudiobookState({
                    ...props.audiobookState,
                    deleteFromCategory:
                      !props.audiobookState.deleteFromCategory,
                  })
                }
              >
                {t("deleteFromCurrentCategory")}
              </Button>
            </div>
          )}

          {props.audiobookState.deleteEntarly ? (
            <div className="row">
              <div className="col">
                <Button
                  name="en"
                  size="sm"
                  className="btn button px-4 my-1 question_button success_button"
                  onClick={deleteAudiobookEntarly}
                >
                  {t("yes")}
                </Button>
              </div>
              <div className="col">
                <Button
                  name="en"
                  size="sm"
                  className="btn button px-4 my-1 question_button danger_button me-2"
                  onClick={() =>
                    props.setAudiobookState({
                      ...props.audiobookState,
                      deleteEntarly: !props.audiobookState.deleteEntarly,
                    })
                  }
                >
                  {t("no")}
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
                  props.setAudiobookState({
                    ...props.audiobookState,
                    deleteEntarly: !props.audiobookState.deleteEntarly,
                  })
                }
              >
                {t("deleteEntarly")}
              </Button>
            </div>
          )}
          <GetAudiobookZipButton
            audiobookDetail={audiobookDetail}
            setAudiobookState={props.setAudiobookState}
            audiobookState={props.audiobookState}
            t={t}
            token={props.token}
          />
        </div>
      </div>

      <hr></hr>
    </div>
  );
}
