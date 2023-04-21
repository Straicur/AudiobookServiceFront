import React, { useEffect, useState } from "react";
import { AdminNavBar } from "../../../../Components/NavBars/AdminNavBar";
import { useQuery } from "react-query";
import { HandleFetch } from "../../../../Components/HandleFetch";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import JsonModal from "../../../../Components/JsonModal";
// import AudiobookCommentsModal from "../../../Categories/Components/Category/AudiobookCommentsModal";
// import AddAudiobookModal from "./AddAudiobookModal";
import RenderNotificationsList from "./RenderNotificationsList";
import RenderPageSwitches from "./RenderPageSwitches";
// import SearchAudiobooksOffCanvas from "./SearchAudiobooksOffCanvas";
// import { useCategoryListStore } from "../../../../store";

export default function NotificationsList(props) {
  const { t } = useTranslation();

  const [state, setState] = useState({
    jsonModal: false,
    json: null,
    addAudiobookModal: false,
    addAudiobookParent: null,
    detailCommentsAudiobookModal: false,
    detailAudiobookElement: null,
    searchModal: false,
    refresh: false,
    addAudiobook: false,
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

  const [pageState, setPageState] = useState({
    page: 0,
    limit: 15,
    maxPage: 0,
  });

  const resetSearchStates = () => {
    setSearchState({
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
  };

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    "data",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/admin/user/notifications",
        "POST",
        {
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
        props.setNotificationsState({
          ...props.notificationsState,
          error: e,
        });
      },
      onSuccess: (data) => {
        setState({ ...state, json: data });
        setPageState({ ...pageState, maxPage: data.maxPage });
      },
    }
  );

  const openAddModal = () => {
    setState({
      ...state,
      addAudiobookModal: !state.addAudiobookModal,
    });
  };

  const openSearchModal = () => {
    setState({
      ...state,
      searchModal: !state.searchModal,
    });
  };

  useEffect(() => {
    if (state.refresh) {
      setState({ ...state, refresh: !state.refresh });
      refetch();
    }
  }, [state.refresh]);

  useEffect(() => {
    if (props.notificationsState.error != null) {
      throw props.notificationsState.error;
    }
  }, [props.notificationsState.error]);

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
                onClick={() => openSearchModal()}
              >
                {t("search")}
              </Button>
            </div>
          </div>
          <RenderNotificationsList
            state={state}
            setState={setState}
            t={t}
            token={props.token}
            pageState={pageState}
            setPageState={setPageState}
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
              onClick={() => openAddModal()}
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

        {/* {state.addAudiobookModal && categoriesState.length != 0 ? (
          <AddAudiobookModal
            state={state}
            setState={setState}
            notificationsState={props.notificationsState}
            setNotificationsState={props.setNotificationsState}
            t={t}
            token={props.token}
            categoriesState={categoriesState}
            setCategories={setCategories}
            resetSearchStates={resetSearchStates}
          />
        ) : null}

        {state.searchModal && categoriesState.length != 0 ? (
          <SearchAudiobooksOffCanvas
            state={state}
            setState={setState}
            notificationsState={props.notificationsState}
            setNotificationsState={props.setNotificationsState}
            searchState={searchState}
            setSearchState={setSearchState}
            t={t}
            token={props.token}
            categoriesState={categoriesState}
            setCategories={setCategories}
            pageState={pageState}
            setPageState={setPageState}
            resetSearchStates={resetSearchStates}
          />
        ) : null}
        {state.detailCommentsAudiobookModal &&
        state.detailAudiobookElement != null ? (
          <AudiobookCommentsModal
            state={state}
            setState={setState}
            t={t}
            token={props.token}
            notificationsState={props.notificationsState}
            setNotificationsState={props.setNotificationsState}
          />
        ) : null} */}
        {state.jsonModal ? (
          <JsonModal state={state} setState={setState} t={t} />
        ) : null}
      </div>
    </div>
  );
}
