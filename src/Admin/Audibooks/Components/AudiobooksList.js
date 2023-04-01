import React, { useEffect, useState } from "react";
import { AdminNavBar } from "../../../Components/NavBars/AdminNavBar";
import { useQuery } from "react-query";
import { HandleFetch } from "../../../Components/HandleFetch";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import JsonModal from "../../../Components/JsonModal";
import AudiobookCommentsModal from "../../Categories/Components/Category/AudiobookCommentsModal";
import AddAudiobookModal from "./AddAudiobookModal";
import RenderAudiobooksList from "./RenderAudiobooksList";
import SearchAudiobooksOffCanvas from "./SearchAudiobooksOffCanvas";

export default function AudiobooksList(props) {
  const { t } = useTranslation();

  const [state, setState] = useState({
    jsonModal: false,
    json: null,
    category: null,
    addAudiobookModal: false,
    addAudiobookParent: null,
    detailCommentsAudiobookModal: false,
    searchModal: false,
    refresh: false,
    error: null,
  });

  const [searchState, setSearchState] = useState({
    sort: 0,
    categories: [],
    title: "",
    author: "",
    album: "",
    parts: 0,
    age: 0,
    year: 0,
    duration: 0,
  });

  const createSearchData = () => {
    let searchJson = {};

    if (searchState.sort != 0) {
      searchJson.order = parseInt(searchState.sort);
    }
    if (searchState.categories.length != 0) {
      searchJson.categories = searchState.categories;
    }
    if (searchState.title != "") {
      searchJson.title = searchState.title;
    }
    if (searchState.author != "") {
      searchJson.author = searchState.author;
    }
    if (searchState.album != "") {
      searchJson.album = searchState.album;
    }
    if (searchState.parts != 0) {
      searchJson.parts = parseInt(searchState.parts);
    }
    if (searchState.age != 0) {
      searchJson.age = parseInt(searchState.age);
    }
    if (searchState.year != 0) {
      let date = new Date(searchState.year);
      searchJson.year =
        date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
    }
    if (searchState.duration != 0) {
      searchJson.duration = parseInt(searchState.duration);
    }
    console.log(searchJson)
    return searchJson;
  };

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    "data",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/admin/audiobooks",
        "POST",
        {
          page: 0,
          limit: 10,
          searchData: createSearchData(),
        },
        props.token
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {
        props.setAudiobookState({
          ...props.audiobooksState,
          error: e,
        });
      },
      onSuccess: (data) => {
        console.log(data);
        setState({ ...state, json: data.audiobooks });
      },
    }
  );

  useEffect(() => {
    if (state.refresh) {
      setState({ ...state, refresh: !state.refresh });
      refetch();
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
          <div className="d-flex justify-content-end ">
            <div className="p-2 bd-highlight">
              <h2>{t("filters")}</h2>
            </div>
            <div className="p-2 bd-highlight">
              <Button
                variant="dark"
                size="sm"
                color="dark"
                className=" btn button mt-2"
                onClick={() =>
                  setState({
                    ...state,
                    searchModal: !state.searchModal,
                  })
                }
              >
                {t("search")}
              </Button>
            </div>
          </div>
          <RenderAudiobooksList
            state={state}
            setState={setState}
            t={t}
            token={props.token}
          />
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
          />
        ) : null}

        {state.searchModal ? (
          <SearchAudiobooksOffCanvas
            state={state}
            setState={setState}
            audiobooksState={props.audiobooksState}
            setAudiobooksState={props.setAudiobooksState}
            searchState={searchState}
            setSearchState={setSearchState}
            t={t}
            token={props.token}
            refetch={refetch}
          />
        ) : null}
        {state.detailCommentsAudiobookModal &&
        state.detailAudiobookElement != null ? (
          <AudiobookCommentsModal
            state={state}
            setState={setState}
            t={t}
            token={props.token}
          />
        ) : null}
        {state.jsonModal ? (
          <JsonModal state={state} setState={setState} t={t} />
        ) : null}
      </div>
    </div>
  );
}
