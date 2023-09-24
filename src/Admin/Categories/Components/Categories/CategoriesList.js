import React, { useEffect, useState } from "react";
import { AdminNavBar } from "../../../../Components/NavBars/AdminNavBar";
import { HandleFetch } from "../../../../Components/HandleFetch";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import { useCategoryTreeListStore } from "../../../../store";
import RenderCategoriesList from "./RenderCategoriesList";
import JsonModal from "../../../../Components/JsonModal";
import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";

export default function CategoriesList(props) {
  const { t, i18n } = useTranslation();

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

  const fetchCategories = () => {
    HandleFetch(
      "/admin/categories/tree",
      "GET",
      null,
      props.token,
      i18n.language
    )
      .then((data) => {
        setState({ ...state, json: data.categories });

        categoriesStore.removeCategories();

        for (const category of data.categories) {
          categoriesStore.addCategory(category);
        }
        if (state.refresh) {
          setState({ ...state, refresh: !state.refresh });
        }
      })
      .catch((e) => {
        props.setCategoiesState({
          ...props.categoiesState,
          error: e,
        });
      });
  };

  useEffect(() => {
    setState({ ...state, json: categories });

    if (dateUpdate < Date.now() || state.refresh) {
      fetchCategories();
    }
  }, []);

  useEffect(() => {
    if (state.refresh) {
      fetchCategories();
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
          categoriesState={props.categoriesState}
          setCategoriesState={props.setCategoiesState}
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
              {t("addMainCategory")}
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
              i18n={i18n}
              token={props.token}
            />
          ) : null}
          {state.addCategoryModal ? (
            <AddCategoryModal
              state={state}
              setState={setState}
              t={t}
              i18n={i18n}
              token={props.token}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
