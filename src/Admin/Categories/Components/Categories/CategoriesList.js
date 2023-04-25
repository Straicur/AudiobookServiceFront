import React, { useEffect, useState } from "react";
import { AdminNavBar } from "../../../../Components/NavBars/AdminNavBar";
import { useQuery } from "react-query";
import { HandleFetch } from "../../../../Components/HandleFetch";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import { useCategoryTreeListStore } from "../../../../store";
import RenderCategoriesList from "./RenderCategoriesList";
import JsonModal from "../../../../Components/JsonModal";
import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";

export default function CategoriesList(props) {
  const { t } = useTranslation();

  const [state, setState] = useState({
    jsonModal: false,
    json: null,
    addCategoryModal: false,
    addCategoryParent: null,
    editCategoryModal: false,
    editCategoryElement: null,
    refresh: false,
    error: null,
  });

  const categoriesStore = useCategoryTreeListStore();

  const categories = useCategoryTreeListStore((state) => state.categories);
  const dateUpdate = useCategoryTreeListStore((state) => state.dateUpdate);

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
        setState({ ...state, json: data.categories });
        //todo czy na pewno tak chciałem ? Bo tu może być problem że pobieram to a nie potrzebuje tak naprawdę jeśli trzymam to w storage
        if (dateUpdate < Date.now() || state.refresh) {
          categoriesStore.removeCategories();

          for (const category of data.categories) {
            categoriesStore.addCategory(category);
          }
          if (state.refresh) {
            setState({ ...state, refresh: !state.refresh });
          }
        }
      },
    }
  );

  useEffect(() => {
    if (state.refresh) {
      refetch();
    }
  }, [state.refresh]);

  useEffect(() => {
    if (props.categoiesState.error != null) {
      throw props.categoiesState.error;
    }
  }, [props.categoiesState.error]);

  return (
    <div className="container-fluid main-container mt-3">
      <div className="card position-relative p-3 mb-5  shadow">
        <AdminNavBar />
        <hr className="line" />
        <div className="table-title my-2">
          <h1>{t("categories")}</h1>
        </div>
        <RenderCategoriesList
          state={state}
          setState={setState}
          categories={categories}
          t={t}
        />
        <div className="row justify-content-md-center">
          <div className="col-3 d-flex justify-content-center">
            <Button
              variant="dark"
              size="lg"
              color="dark"
              className=" btn button mt-2"
              onClick={() =>
                setState({
                  ...state,
                  addCategoryModal: !state.addCategoryModal,
                })
              }
            >
              {t("addCategory")}
            </Button>
          </div>
          <div className="col-3 d-flex justify-content-center">
            <Button
              variant="dark"
              size="lg"
              color="dark"
              className=" btn button mt-2"
              onClick={() =>
                setState({ ...state, jsonModal: !state.jsonModal })
              }
            >
              {t("jsonData")}
            </Button>
          </div>
          {state.jsonModal ? (
            <JsonModal state={state} setState={setState} t={t} />
          ) : null}
          {state.editCategoryModal && state.editCategoryElement != null ? (
            <EditCategoryModal
              state={state}
              setState={setState}
              t={t}
              token={props.token}
            />
          ) : null}
          {state.addCategoryModal ? (
            <AddCategoryModal
              state={state}
              setState={setState}
              t={t}
              token={props.token}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
