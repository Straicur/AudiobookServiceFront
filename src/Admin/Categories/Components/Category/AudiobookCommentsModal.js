import React, {useState, useEffect } from "react";
import { useQuery } from "react-query";
import { HandleFetch } from "../../../../Components/HandleFetch";
import Modal from "react-bootstrap/Modal";
import "react-h5-audio-player/lib/styles.css";
import RenderCommentsList from "../Category/RenderCommentsList";


export default function AudiobookCommentsModal(props) {

  const [state, setState] = useState({
    comments: null,
    refresh: false,
  });

  const handleClose = () => {
    props.setState({
      ...props.state,
      detailCommentsAudiobookModal: !props.state.detailCommentsAudiobookModal,
      detailAudiobookElement: null,
    });
  };

  const {
    isLoading: isLoadingAudiobookComments,
    error: errorAudiobookComments,
    data: dataAudiobookComments,
    isFetching: isFetchingAudiobookComments,
    refetch: refetchAudiobookComments,
  } = useQuery(
    "dataAudiobookComments",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/admin/audiobook/comment/get",
        "POST",
        {
          audiobookId: props.state.detailAudiobookElement.id,
        },
        props.token
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {},
      onSuccess: (data) => {
        setState({ ...state, comments: data });
      },
    }
  );

  useEffect(() => {
    if (state.refetch) {
      refetchAudiobookComments();
      setState({ ...state, refetch: !state.refetch });
    }
  }, [state.refetch]);

  return (
    <Modal
      show={props.state.detailCommentsAudiobookModal}
      onHide={handleClose}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="bg-dark"></Modal.Header>
      <Modal.Body className="bg-dark">
        <div className="row d-flex justify-content-center text-light text-center">
          <h1>{props.t("comments")}</h1>
        </div>
        <hr className="text-light"></hr>
        <RenderCommentsList
          state={state}
          setState={setState}
          t={props.t}
          token={props.token}
        />
      </Modal.Body>
    </Modal>
  );
}
