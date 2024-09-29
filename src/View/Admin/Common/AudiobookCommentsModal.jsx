import React from 'react';
import Modal from 'react-bootstrap/Modal';
import 'react-h5-audio-player/lib/styles.css';
import AdminRenderCommentsList from './AdminRenderCommentsList';
import { useAdminAudiobookComments } from 'Providers/Admin/AdminAudiobookCommentsProvider';

export default function AudiobookCommentsModal(props) {
  const [audiobookComments, setRefetch, deleteComment] = useAdminAudiobookComments();

  const handleClose = () => {
    props.setState((prev) => ({
      ...prev,
      detailCommentsAudiobookModal: !props.state.detailCommentsAudiobookModal,
      detailAudiobookElement: null,
    }));
  };

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
        <AdminRenderCommentsList
          comments={audiobookComments}
          setRefetch={setRefetch}
          deleteComment={deleteComment}
          t={props.t}
          token={props.token}
        />
      </Modal.Body>
    </Modal>
  );
}
