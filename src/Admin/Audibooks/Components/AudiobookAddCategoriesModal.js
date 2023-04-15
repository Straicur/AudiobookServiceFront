import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { HandleFetch } from "../../../Components/HandleFetch";
import { useCategoryTreeListStore } from "../../../store";
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

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    "data",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/admin/categories/tree",
        "GET",
        null,
        props.token
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {
        props.setCategoiesState({
          ...props.categoiesState,
          error: e,
        });
      },
      onSuccess: (data) => {
        let categoriesIds = [];
        
        for (const category of props.audiobookDetail.categories) {
          categoriesIds.push(category.id);
        }

        setCategoriesState({ ...categoriesState, categoriesId: categoriesIds });

        //todo czy na pewno tak chciałem ? Bo tu może być problem że pobieram to a nie potrzebuje tak naprawdę jeśli trzymam to w storage
        if (dateUpdate < Date.now() || categoriesState.refresh) {
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
        }
      },
    }
  );

  useEffect(() => {
    if (categoriesState.refresh) {
      refetch();
    }
  }, [categoriesState.refresh]);

  return (
    <Modal
      size="lg"
      show={props.audiobookState.addCategoriesModal}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.t("addCategory")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RenderCategoriesList
          categories={categories}
          audiobookDetail={props.audiobookDetail}
          categoriesState={categoriesState}
          t={props.t}
          token={props.token}
        />
      </Modal.Body>
    </Modal>
  );
}