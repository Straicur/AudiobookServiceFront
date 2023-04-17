import React, { useEffect, useState } from "react";
import { AdminNavBar } from "../../../Components/NavBars/AdminNavBar";
import { useQuery } from "react-query";
import { HandleFetch } from "../../../Components/HandleFetch";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import JsonModal from "../../../Components/JsonModal";
import RenderUsersList from "./RenderUsersList";
import RenderPageSwitches from "./RenderPageSwitches";
import DeleteUserModal from "./DeleteUserModal";
import EditUserModal from "./EditUserModal";
import { useLastUserRolesStore } from "../../../store";

export default function AudiobooksList(props) {
  const { t } = useTranslation();

  const userRolesStore = useLastUserRolesStore();

  const roles = useLastUserRolesStore((state) => state.roles);
  const dateUpdate = useLastUserRolesStore((state) => state.dateUpdate);

  const [state, setState] = useState({
    json: null,
    jsonModal: false,
    deleteUsersModal: false,
    editUserModal: false,
    editUserElement: null,
    searchModal: false,
    refresh: false,
    error: null,
    maxPage: 0,
  });
  const [searchState, setSearchState] = useState({
    email: "",
    phoneNumber: "",
    firstname: "",
    lastname: "",
    active: null,
    banned: null,
    order: 0,
  });

  const [pageState, setPageState] = useState({
    page: 0,
    limit: 15,
  });

  const resetSearchStates = () => {
    setSearchState({
      email: "",
      phoneNumber: "",
      firstname: "",
      lastname: "",
      active: null,
      banned: null,
      order: 0,
    });
  };
  
  const { isLoading, error, data, isFetching, refetch } = useQuery(
    "data",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/admin/users",
        "POST",
        {
          page: pageState.page,
          limit: pageState.limit,
          //   searchData: createSearchData(),
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
        setState({ ...state, json: data });
      },
    }
  );

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
          <RenderUsersList
            state={state}
            setState={setState}
            t={t}
            token={props.token}
            roles={roles}
            dateUpdate={dateUpdate}
            userRolesStore={userRolesStore}
          />
          {state.json != null && state.json.maxPage > 1 ? (
            <RenderPageSwitches
              state={state}
              setState={setState}
              pageState={pageState}
              setPageState={setPageState}
            />
          ) : null}
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
                  deleteUsersModal: !state.deleteUsersModal,
                })
              }
            >
              {t("deleteUserList")}
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

        {state.editUserModal && state.editUserElement && roles!= null? (
          <EditUserModal
            state={state}
            setState={setState}
            t={t}
            token={props.token}
            roles={roles.roles}
          />
        ) : null}
        {state.deleteUsersModal ? (
          <DeleteUserModal state={state} setState={setState} t={t} />
        ) : null}
        {state.jsonModal ? (
          <JsonModal state={state} setState={setState} t={t} />
        ) : null}
      </div>
    </div>
  );
}
