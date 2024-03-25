import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import Modal from 'react-bootstrap/Modal';
import 'react-h5-audio-player/lib/styles.css';
import AdminCategoryRenderCommentsList from './AdminCategoryRenderCommentsList';

export default function AdminCategoryAudiobookCommentsModal(props) {
  const [state, setState] = useState({
    comments: null,
    refresh: false,
  });

  const handleClose = () => {
    props.setState((prev) => ({
      ...prev,
      detailCommentsAudiobookModal: !props.state.detailCommentsAudiobookModal,
      detailAudiobookElement: null,
    }));
  };

  const { refetch: refetchAudiobookComments } = useQuery({
    queryKey: ['dataAdminAudiobookComments'] + props.state.detailAudiobookElement.id,
    queryFn: () =>
      HandleFetch(
        '/admin/audiobook/comment/get',
        'POST',
        {
          audiobookId: props.state.detailAudiobookElement.id,
        },
        props.token,
        props.i18n.language,
      ),
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
    onError: (e) => {
      props.setAudiobooksState((prev) => ({
        ...prev,
        error: e,
      }));
    },
    onSuccess: (data) => {
      setState((prev) => ({
        ...prev,
        comments: data,
      }));
    },
  });

  useEffect(() => {
    if (state.refetch) {
      refetchAudiobookComments();
      setState((prev) => ({
        ...prev,
        refetch: !state.refetch,
      }));
    }
  }, [state.refetch]);

  return (
    <Modal
      show={props.state.detailCommentsAudiobookModal}
      onHide={handleClose}
      size='lg'
      backdrop='static'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className='row d-flex justify-content-center text-center'>
          <h1>{props.t('comments')}</h1>
        </div>
        <hr></hr>
        <AdminCategoryRenderCommentsList
          state={state}
          setState={setState}
          t={props.t}
          token={props.token}
        />
      </Modal.Body>
    </Modal>
  );
}
