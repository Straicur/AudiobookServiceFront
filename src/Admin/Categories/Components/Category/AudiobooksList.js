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
import AudiobookCommentsModal from "./AudiobookCommentsModal";
import RenderPageSwitches from "./RenderPageSwitches";

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
    detailCommentsAudiobookModal: false,
    detailAudiobookElementPart: 0,
    refresh: false,
    error: null,
  });

  const [pageState, setPageState] = useState({
    page: 0,
    limit: 15,
    maxPage: 0,
  });

  const {
    isLoading: isLoadingFirst,
    error: errorFirst,
    data: dataFirst,
    isFetching: isFetchingFirst,
    refetch: refetchFirst,
  } = useQuery(
    "dataFirst",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/admin/category/audiobooks",
        "POST",
        {
          categoryKey: props.categoryKey,
          page: pageState.page,
          limit: pageState.limit,
        },
        props.token
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {
        props.setAudiobooksState({
          ...props.audiobooksState,
          error: e,
        });
      },
      onSuccess: (data) => {
        setState({ ...state, json: data.audiobooks });
        setPageState({ ...pageState, maxPage: data.maxPage });
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
        props.setAudiobooksState({
          ...props.audiobooksState,
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
      setTimeout(function () {
        refetchFirst();
      }, 3000);
    }
  }, [state.refresh]);

  useEffect(() => {
    if (props.audiobooksState.error != null) {
      throw props.audiobooksState.error;
    }
  }, [props.audiobooksState.error]);

  return (
    <div className="container-fluid main-container mt-3">
      <div className="card position-relative p-3 mb-5  shadow">
        <AdminNavBar />
        <hr className="line" />
        <div className="table-title my-2">
          <h1>{state.category == null ? null : state.category.name}</h1>
          <RenderAudiobooksList
            state={state}
            setState={setState}
            t={t}
            token={props.token}
          />
          {state.json != null && pageState.maxPage > 1 ? (
            <RenderPageSwitches
              state={state}
              setState={setState}
              pageState={pageState}
              setPageState={setPageState}
            />
          ) : null}
        </div>
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
                  addAudiobookModal: !state.addAudiobookModal,
                })
              }
            >
              {t("addAudiobook")}
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
            categoryID={state.category.id}
            setAudiobooksState={props.setAudiobooksState}
            audiobooksState={props.audiobooksState}
          />
        ) : null}
        {state.detailAudiobookModal && state.detailAudiobookElement != null ? (
          //todo tu pomyśl co z providerami zrobić bo nie ma gdzie zwracać errorów
          <CategoryDetailProviders
            state={state}
            setState={setState}
            t={t}
            token={props.token}
            categoryKey={props.categoryKey}
          />
        ) : null}
        {state.detailCommentsAudiobookModal &&
        state.detailAudiobookElement != null ? (
          <AudiobookCommentsModal
            state={state}
            setState={setState}
            t={t}
            token={props.token}
            setAudiobooksState={props.setAudiobooksState}
            audiobooksState={props.audiobooksState}
          />
        ) : null}
        {state.jsonModal ? (
          <JsonModal state={state} setState={setState} t={t} />
        ) : null}
      </div>
    </div>
  );
}
