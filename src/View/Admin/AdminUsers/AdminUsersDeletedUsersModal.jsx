import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AdminUsersRenderDeletedUsersList from './AdminUsersRenderDeletedUsersList';
import { AdminUsersDeletedProvider } from 'Providers/Admin/AdminUsersDeletedProvider';

export default function AdminUsersDeletedUsersModal(props) {
  const [pageState, setPageState] = useState({
    page: 0,
  });

  const handleClose = () => {
    props.setState((prev) => ({
      ...prev,
      deletedUsersModal: !props.state.deletedUsersModal,
    }));
  };

  return (
    <Modal size='lg' show={props.state.deletedUsersModal} onHide={handleClose} backdrop='static'>
      <Modal.Header closeButton>
        <Modal.Title>{props.t('deletedUsers')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AdminUsersDeletedProvider token={props.token} page={pageState.page} i18n={props.i18n}>
          <AdminUsersRenderDeletedUsersList
            pageState={pageState}
            setPageState={setPageState}
            token={props.token}
            t={props.t}
          />
        </AdminUsersDeletedProvider>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='dark' onClick={handleClose}>
          {props.t('close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
