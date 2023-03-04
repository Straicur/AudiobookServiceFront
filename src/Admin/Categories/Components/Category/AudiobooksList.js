import React, { useEffect, useState } from "react";
import { AdminNavBar } from "../../../../Components/NavBars/AdminNavBar";
import { useQuery } from "react-query";
import { HandleFetch } from "../../../../Components/HandleFetch";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import JsonModal from "../../../../Components/JsonModal";
import AddAudiobookModal from "../Category/AddAudiobookModal";
import RenderAudiobooksList from "../Category/RenderAudiobooksList";
import CategoryDetailProviders from "../Category/CategoryDetailProviders";

export default function AudiobooksList(props) {
  const { t } = useTranslation();

  const [state, setState] = useState({
    jsonModal: false,
    json: null,
    category: null,
    addAudiobookModal: false,
    addAudiobookParent: null,
    detailAudiobookModal: false,
    detailAudiobookElement: null,
    detailAudiobookElementPart: 0,
    refresh: false,
    error: null,
  });

  const { isLoading: isLoadingFirst,
    error: errorFirst,
    data: dataFirst,
    isFetching: isFetchingFirst,
    refetch: refetchFirst } = useQuery(
    "dataFirst",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/admin/category/audiobooks",
        "POST",
        {
          categoryKey: props.categoryKey,
          page: 0,
          limit: 10,
        },
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
        setState({ ...state, json: data.audiobooks });
      },
    }
  );

  const {
    isLoading: isLoadingSecond,
    error: errorSecond,
    data: dataSecond,
    isFetching: isFetchingSecond,
    refetch: refetchSecond,
  } = useQuery(
    "dataSecond",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/admin/category/detail",
        "POST",
        {
          categoryKey: props.categoryKey,
        },
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
      onSuccess: (dataSecond) => {
        setState({
          ...state,
          category: {
            id: dataSecond.id,
            name: dataSecond.name,
            active: dataSecond.active,
            parentCategoryName: dataSecond.parentCategoryName,
          },
        });
      },
    }
  );

  useEffect(() => {
    if (state.refresh) {
      setState({ ...state, refresh: !state.refresh });
      refetchFirst();
    }
  }, [state.refresh]);

  useEffect(() => {
    if (props.audiobooksState.error != null) {
      throw props.audiobooksState.error;
    }
  }, [props.audiobooksState.error]);

  //todo backend 2 endpointy które pobiorą mi wszystki kategorie dla audiobooka które nie są już używane i wszystkie audiobooki dla ktegorii które już w niej nie są
  //todo najpierw raczej zrobiłbym dodawanie audiobooka w modalu i podepne go pod tą kategorie
  // Modal tego audiobooka będzie miał listę kategorii, możliwość wybrania dodatkowej i jej dodania i te wszyustkie jego dane

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!11
  //Skończenie dodawania i poprawa tego progresu bo jest chujowy
  //Zrobienie listy i po niej zostaje mi jeszcze Modal tego audiobooka i jego edycja

  return (
    <div className="container-fluid main-container mt-3">
      <div className="card position-relative p-3 mb-5  shadow">
        <AdminNavBar />
        <hr className="line" />
        <div className="table-title my-2">
          <h1>{state.category == null ? null : state.category.name}</h1>
          <RenderAudiobooksList state={state} setState={setState} t={t} />
        </div>
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
                  addAudiobookModal: !state.addAudiobookModal,
                })
              }
            >
              {t("addAudiobook")}
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
        </div>
        {state.addAudiobookModal ? (
          <AddAudiobookModal
            state={state}
            setState={setState}
            t={t}
            token={props.token}
            categoryKey={props.categoryKey}
          />
        ) : null}
        {state.detailAudiobookModal && state.detailAudiobookElement != null ? (
          <CategoryDetailProviders
            state={state}
            setState={setState}
            t={t}
            token={props.token}
            categoryKey={props.categoryKey}
          />
        ) : null}
        {state.jsonModal ? (
          <JsonModal state={state} setState={setState} t={t} />
        ) : null}
      </div>
    </div>
  );
}
