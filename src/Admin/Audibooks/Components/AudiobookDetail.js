import React, { useState } from "react";
import { useAudiobookData } from "../../../Components/Providers/AudiobookProviders/AudiobookDataProvider";
import { useAudiobookCover } from "../../../Components/Providers/AudiobookProviders/AudiobookCoverDataProvider";
import { useAudiobookPart } from "../../../Components/Providers/AudiobookProviders/AudiobookPartProvider";
import { useAudiobookComments } from "../../../Components/Providers/AudiobookProviders/AudiobookCommentsProvider";
import { AdminNavBar } from "../../../Components/NavBars/AdminNavBar";
import { HandleFetch } from "../../../Components/HandleFetch";
import CategoryEditForm from "./AudiobookEditForm";
import AudiobookCategoryList from "./AudiobookCategoryList";
import AudiobookCover from "./AudiobookCover";
import GetAudiobookZipButton from "./GetAudiobookZipButton";
import RenderCommentsList from "./RenderCommentsList";
import AudiobookAddCategoriesModal from "./AudiobookAddCategoriesModal";
import AudiobookReAddingModal from "./AudiobookReAddingModal";
import Button from "react-bootstrap/Button";
import AudioPlayer from "./AudiobookPlayer";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCategoryListStore } from "../../../store";

export default function AudiobookDetail(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [categoriesState, setCategories] = useState([]);

  const [audiobookDetail, setAudiobookDetail, setAudiobookDetailRefetch] =
    useAudiobookData();
  const [audiobookCover, setAudiobookCover, setAudiobookCoverRefetch] =
    useAudiobookCover();
  const [audiobookPart, setAudiobookPart, setAudiobookPartRefetch] =
    useAudiobookPart();
  const [
    audiobookCommnets,
    setAudiobookCommnets,
    setAudiobookCommnetsRefetchState,
  ] = useAudiobookComments();

  const categoriesStore = useCategoryListStore();

  const categories = useCategoryListStore((state) => state.categories);
  const dateUpdate = useCategoryListStore((state) => state.dateUpdate);

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

  const fetchCategoriesList = () => {
    if (dateUpdate > Date.now() && dateUpdate != 0) {
      setCategories(categories);
    } else {
      HandleFetch(
        "http://127.0.0.1:8000/api/admin/categories",
        "GET",
        null,
        props.token
      )
        .then((data) => {
          categoriesStore.removeCategories();
          for (const category of data.categories) {
            categoriesStore.addCategory(category);
          }

          setCategories(data.categories);
        })
        .catch((e) => {
          props.setAudiobooksState({
            ...props.audiobooksState,
            error: e,
          });
        });
    }
  };

  const openReAddingModal = () => {
    fetchCategoriesList();

    props.setAudiobookState({
      ...props.audiobookState,
      reAddingModal: !props.audiobookState.reAddingModal,
    });
  };
  const resetStates = () => {
    setAudiobookDetailRefetch(true);
    setAudiobookCoverRefetch(true);
    setAudiobookPartRefetch(true);
  };

  return (
    <div className="container-fluid main-container mt-3">
      <div className="card position-relative p-3 mb-5  shadow">
        <AdminNavBar />
        <hr className="line" />
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
              audiobookDetail={audiobookDetail}
              setAudiobookDetail={setAudiobookDetail}
              setAudiobookDetailRefetch={setAudiobookDetailRefetch}
              setAudiobookState={props.setAudiobookState}
              audiobookState={props.audiobookState}
              t={t}
              token={props.token}
            />

            <div className="row me-4 mt-2">
              <hr></hr>
            </div>
            <div className="row d-flex justify-content-center me-1">
              {audiobookPart != null ? (
                <AudioPlayer
                  audiobookDetail={audiobookDetail}
                  audiobookPart={audiobookPart}
                  setAudiobookState={props.setAudiobookState}
                  audiobookState={props.audiobookState}
                />
              ) : null}
            </div>
          </div>
          <div className="col-3">
            <div className="row d-flex justify-content-center text-center mb-3">
              <h4>{t("rating")}</h4>
              {renderStars()}
            </div>
            <div className="row d-flex justify-content-center text-center">
              <h4>{t("categories")}</h4>
            </div>
            <div className="row d-flex justify-content-center text-center"></div>
            <AudiobookCategoryList
              audiobookDetail={audiobookDetail}
              t={t}
              token={props.token}
              setAudiobookState={props.setAudiobookState}
              audiobookState={props.audiobookState}
              setAudiobookDetailRefetch={setAudiobookDetailRefetch}
            />

            <div className="row">
              <Button
                name="en"
                size="sm"
                className="btn button px-4 my-1 audiobook_detail_modal_button success_button"
                onClick={() =>
                  props.setAudiobookState({
                    ...props.audiobookState,
                    addCategoriesModal:
                      !props.audiobookState.addCategoriesModal,
                  })
                }
              >
                {t("addCategory")}
              </Button>
            </div>
            {props.audiobookState.deleteEntarly ? (
              <div className="row justify-content-center">
                <div className="col-4">
                  <Button
                    name="en"
                    size="sm"
                    className="btn button px-4 my-1 question_button success_button"
                    onClick={deleteAudiobookEntarly}
                  >
                    {t("yes")}
                  </Button>
                </div>
                <div className="col-4">
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
                  className="btn button px-4 my-1 audiobook_detail_modal_button danger_button"
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
            {props.audiobookState.reAdding ? (
              <div className="row justify-content-center">
                <div className="col-4">
                  <Button
                    name="en"
                    size="sm"
                    className="btn button px-4 my-1 question_button success_button"
                    onClick={openReAddingModal}
                  >
                    {t("yes")}
                  </Button>
                </div>
                <div className="col-4">
                  <Button
                    name="en"
                    size="sm"
                    className="btn button px-4 my-1 question_button danger_button me-2"
                    onClick={() =>
                      props.setAudiobookState({
                        ...props.audiobookState,
                        reAdding: !props.audiobookState.reAdding,
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
                  className="btn button px-4 my-1 audiobook_detail_modal_button warning_button"
                  onClick={() =>
                    props.setAudiobookState({
                      ...props.audiobookState,
                      reAdding: !props.audiobookState.reAdding,
                    })
                  }
                >
                  {t("reAdding")}
                </Button>
              </div>
            )}
            <div className="row my-1 ">
              <GetAudiobookZipButton
                audiobookDetail={audiobookDetail}
                setAudiobookState={props.setAudiobookState}
                audiobookState={props.audiobookState}
                t={t}
                token={props.token}
              />
            </div>
          </div>
        </div>
        <p className="text-center fs-1"> {t("comments")}</p>
        <hr></hr>
        <RenderCommentsList
          audiobookDetail={audiobookDetail}
          audiobookState={props.audiobookState}
          setAudiobookState={props.setAudiobookState}
          audiobookCommnets={audiobookCommnets}
          setAudiobookCommnetsRefetchState={setAudiobookCommnetsRefetchState}
          t={t}
          token={props.token}
        />
      </div>
      {props.audiobookState.addCategoriesModal ? (
        <AudiobookAddCategoriesModal
          audiobookDetail={audiobookDetail}
          audiobookState={props.audiobookState}
          setAudiobookState={props.setAudiobookState}
          t={t}
          token={props.token}
          setAudiobookDetailRefetch={setAudiobookDetailRefetch}
        />
      ) : null}
      {props.audiobookState.reAddingModal && categoriesState.length != 0 ? (
        <AudiobookReAddingModal
          audiobookDetail={audiobookDetail}
          audiobookState={props.audiobookState}
          setAudiobookState={props.setAudiobookState}
          categoriesState={categoriesState}
          setCategories={setCategories}
          t={t}
          token={props.token}
          resetStates={resetStates}
        />
      ) : null}
    </div>
  );
}
