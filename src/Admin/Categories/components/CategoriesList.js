import React, { useEffect, useState } from "react";
import { AdminNavBar } from "../../../components/AdminNavBar";
import { useQuery } from "react-query";
import { HandleFetch } from "../../../components/HandleFetch";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import { useCategoryListStore } from "../../../store";
import RenderList from "../components/RenderList";
import JsonModal from "../../../components/JsonModal";
import AddCategoryModal from "../components/AddCategoryModal";

export default function CategoriesList(props) {
  const { t } = useTranslation();

  const [state, setState] = useState({
    jsonModal: false,
    addCategoryModal: false,
    isButtonDisabled: true,
    error: null,
  });

  const categoriesStore = useCategoryListStore();

  const categories = useCategoryListStore((state) => state.categories);
  const dateUpdate = useCategoryListStore((state) => state.dateUpdate);

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    "data",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/admin/categories",
        "GET",
        null,
        props.token
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {},
      onSuccess: (data) => {
        if (dateUpdate < Date.now()) {
          categoriesStore.removeCategories();

          for (const category of data.categories) {
            categoriesStore.addCategory(category);
          }
        }
      },
    }
  );

  return (
    <div className="container-fluid main-container mt-3">
      <div className="card position-relative p-3 mb-5  shadow">
        <AdminNavBar />
        <hr className="line" />
        <div className="table-title">{/* <h2>{t('SetsTitle')}</h2> */}</div>
        <RenderList categories={categories} t={t} />
        <div className="row">
          <div className="col">
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
              + {t("addCategory")}
            </Button>
          </div>
          <div className="col">
            <Button
              variant="dark"
              size="lg"
              color="dark"
              className=" btn button mt-2"
              onClick={() =>
                setState({ ...state, jsonModal: !state.jsonModal })
              }
            >
              {t("categoryJson")}
            </Button>
          </div>
          {state.jsonModal ? (
            <JsonModal
              state={state}
              setState={setState}
              json={categoriesStore.categories}
            />
          ) : null}
          {state.addCategoryModal ? (
            <AddCategoryModal state={state} setState={setState} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
