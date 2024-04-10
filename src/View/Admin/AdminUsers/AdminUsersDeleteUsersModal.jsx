import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AdminUsersRenderDeleteUsersList from './AdminUsersRenderDeleteUsersList';
import { AdminUsersDeleteProvider } from 'Providers/Admin/AdminUsersDeleteProvider';

export default function AdminUsersDeleteUsersModal(props) {
  const [pageState, setPageState] = useState({
    page: 0,
    limit: 15,
    maxPage: 1,
  });

  const handleClose = () => {
    props.setState((prev) => ({
      ...prev,
      deleteUsersModal: !props.state.deleteUsersModal,
      refresh: !props.state.refresh,
    }));
  };

  return (
    <Modal size='lg' show={props.state.deleteUsersModal} onHide={handleClose} backdrop='static'>
      <Modal.Header>
        <Modal.Title>{props.t('deleteUsers')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AdminUsersDeleteProvider
          token={props.token}
          page={pageState.page}
          setState={props.setUsersState}
          i18n={props.i18n}
        >
          <AdminUsersRenderDeleteUsersList
            pageState={pageState}
            setPageState={setPageState}
            token={props.token}
            t={props.t}
          />
        </AdminUsersDeleteProvider>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='dark' onClick={handleClose}>
          {props.t('close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
