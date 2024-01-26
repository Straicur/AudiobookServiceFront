import React, { useEffect, useState } from "react";
import { HandleFetch } from "../../../Util/HandleFetch";
import { useCategoryTreeListStore } from "../../../Store/store";
import RenderCategoriesList from "./RenderCategoriesList";
import Modal from "react-bootstrap/Modal";

export default function AudiobookAddCategoriesModal(props) {
  const [categoriesState, setCategoriesState] = useState({
    categoriesId: [],
    refresh: false,
  });

  const categoriesStore = useCategoryTreeListStore();

  const categories = useCategoryTreeListStore((state) => state.categories);
  const dateUpdate = useCategoryTreeListStore((state) => state.dateUpdate);

  const handleClose = () => {
    props.setAudiobookDetailRefetch(true);
    props.setAudiobookState({
      ...props.audiobookState,
      addCategoriesModal: !props.audiobookState.addCategoriesModal,
    });
  };

  const fetchCategories = () => {
    HandleFetch(
      "/admin/categories/tree",
      "GET",
      null,
      props.token,
      props.i18n.language
    )
      .then((data) => {
        categoriesStore.removeCategories();

        for (const category of data.categories) {
          categoriesStore.addCategory(category);
        }

        if (categoriesState.refresh) {
          setCategoriesState({
            ...categoriesState,
            refresh: !categoriesState.refresh,
          });
        }
      })
      .catch((e) => {
        props.setAudiobookState({
          ...props.audiobookState,
          error: e,
        });
      });
  };

  useEffect(() => {
    if (dateUpdate < Date.now() || categoriesState.refresh) {
      fetchCategories();
    }
  }, []);

  useEffect(() => {
    let categoriesIds = [];

    for (const category of props.audiobookDetail.categories) {
      categoriesIds.push(category.id);
    }

    setCategoriesState({ ...categoriesState, categoriesId: categoriesIds });

    if (categoriesState.refresh) {
      fetchCategories();
    }
  }, [categoriesState.refresh]);

  return (
    <Modal
      size="lg"
      show={props.audiobookState.addCategoriesModal}
      onHide={handleClose}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.t("addCategory")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RenderCategoriesList
          categories={categories}
          audiobookDetail={props.audiobookDetail}
          categoriesState={categoriesState}
          setCategoriesState={setCategoriesState}
          t={props.t}
          i18n={props.i18n}
          token={props.token}
        />
      </Modal.Body>
    </Modal>
  );
}
