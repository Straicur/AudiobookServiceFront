import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useQuery } from "react-query";
import { HandleFetch } from "../../../Components/HandleFetch";
import RenderDeleteUsersList from "./RenderDeleteUsersList";
import RenderPageSwitches from "./RenderPageSwitches";

export default function DeleteUsersModal(props) {
  const [state, setState] = useState({
    users: [],
    refresh: false,
  });

  const [pageState, setPageState] = useState({
    page: 0,
    limit: 15,
    maxPage: 1,
  });

  const handleClose = () => {
    props.setState({
      ...props.state,
      deleteUsersModal: !props.state.deleteUsersModal,
      refresh: !props.state.refresh
    });
  };

  const {    
    isLoading: isLoadingSecond,
    error: errorSecond,
    data: dataSecond,
    isFetching: isFetchingSecond,
    refetch: refetchSecond, } = useQuery(
    "dataSecond",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/admin/user/to/delete/list",
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
        props.setUsersState({
          ...props.usersState,
          error: e,
        });
      },
      onSuccess: (data) => {
        setState({ ...state, users: data.users });
        setPageState({ ...pageState, maxPage: data.maxPage });
      },
    }
  );

  useEffect(() => {
    if (state.refresh) {
      setState({ ...state, refresh: !state.refresh });
      refetchSecond();
    }
  }, [state.refresh]);

  return (
    <Modal size="lg" show={props.state.deleteUsersModal} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{props.t("deleteUsers")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RenderDeleteUsersList
          state={state}
          setState={setState}
          token={props.token}
          t={props.t}
        />
            {state.users != null && pageState.maxPage > 1 ? (
            <RenderPageSwitches
              state={state}
              setState={setState}
              pageState={pageState}
              setPageState={setPageState}
            />
          ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          {props.t("close")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
