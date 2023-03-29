import React, { useEffect, useState } from "react";
import { AdminNavBar } from "../../../Components/NavBars/AdminNavBar";
import { useQuery } from "react-query";
import { HandleFetch } from "../../../Components/HandleFetch";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";

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
        "http://127.0.0.1:8000/api/admin/audiobooks",
        "POST",
        {
          page: 0,
          limit: 10,
          searchData:{
            
          }
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

  return(
    <div className="container-fluid main-container mt-3">
    <div className="card position-relative p-3 mb-5  shadow">
      <AdminNavBar />
      <hr className="line" />
      <div className="table-title my-2">
        <h1>{state.category == null ? null : state.category.name}</h1>
        {/* <RenderAudiobooksList
          state={state}
          setState={setState}
          t={t}
          token={props.token}
        /> */}
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
      {/* {state.addAudiobookModal ? (
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
      {state.detailCommentsAudiobookModal &&
      state.detailAudiobookElement != null ? (
        <AudiobookCommentsModal
          state={state}
          setState={setState}
          t={t}
          token={props.token}
          categoryKey={props.categoryKey}
        />
      ) : null}
      {state.jsonModal ? (
        <JsonModal state={state} setState={setState} t={t} />
      ) : null} */}
    </div>
  </div>
  )
}