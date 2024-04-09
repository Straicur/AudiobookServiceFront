import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AdminUsersRenderRoles from './AdminUsersRoles';
import AdminUsersEditFrom from './AdminUsersEditFrom';

export default function AdminUsersEditModal(props) {
  const handleClose = () => {
    props.setState((prev) => ({
      ...prev,
      editUserModal: !props.state.editUserModal,
      refresh: !props.state.refresh,
    }));
  };

  return (
    <Modal size='lg' show={props.state.editUserModal} onHide={handleClose} backdrop='static'>
      <Modal.Header>
        <Modal.Title>
          {props.t('editUser')}: {props.state.editUserElement.email}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='row my-1'>
          <AdminUsersRenderRoles
            state={props.state}
            setState={props.setState}
            t={props.t}
            i18n={props.i18n}
            userRoles={props.userRoles}
            token={props.token}
            removeUserRole={props.removeUserRole}
            addUserRole={props.addUserRole}
          />
        </div>
        <div className='row'>
          <AdminUsersEditFrom
            state={props.state}
            setState={props.setState}
            activateUser={props.activateUser}
            banUser={props.banUser}
            changeUserPassword={props.changeUserPassword}
            changeUserPhone={props.changeUserPhone}
            t={props.t}
            i18n={props.i18n}
            token={props.token}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='dark' onClick={handleClose}>
          {props.t('close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
