import React, { useEffect, useLayoutEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormService from 'Service/Common/FormService';

export default function AdminCategoriesEditModal(props) {
  const [stateEditButton, setStateEditButton] = useState(true);

  const [editModal, setEditModal] = useState({
    edit: 1,
    newName: '',
  });

  const adminService = new FormService(setEditModal);

  const handleClose = () => {
    props.setState((prev) => ({
      ...prev,
      editCategoryModal: !props.state.editCategoryModal,
      editCategoryElement: null,
    }));
  };

  const editCategoryName = () => {
    props.categoryChange({
      newName: editModal.newName,
      id: props.state.editCategoryElement.id,
    });

    handleClose();
  };

  const activateCategory = () => {
    props.categoryActivate({
      id: props.state.editCategoryElement.id,
      active: !props.state.editCategoryElement.active,
    });

    handleClose();
  };

  const deleteCategory = () => {
    props.categoryDelete({
      categoryId: props.state.editCategoryElement.id,
    });

    handleClose();
  };

  useLayoutEffect(() => {
    setEditModal((prev) => ({
      ...prev,
      newName: props.state.editCategoryElement.name,
    }));
  }, [props]);

  useEffect(() => {
    if (editModal.newName !== '') {
      setStateEditButton(false);
    } else {
      setStateEditButton(true);
    }
  }, [editModal.newName]);

  return (
    <Modal
      show={props.state.editCategoryModal}
      onHide={handleClose}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h3>
            <b>{props.t('editCategory')}</b>
          </h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {editModal.edit === 1 ? (
          <div className='row'>
            <h3>{props.t('youChangeName')}</h3>
            <div className='col'>
              <input
                id='name'
                type='text'
                name='newName'
                value={editModal.newName}
                className='form-control mt-2'
                onChange={(e) => adminService.handleChange(e)}
              />
            </div>
            <div className='col'>
              <Button
                disabled={stateEditButton}
                variant='dark'
                className='form-control mt-2'
                onClick={editCategoryName}
              >
                {props.t('edit')}
              </Button>
            </div>
          </div>
        ) : null}
        {editModal.edit === 2 ? (
          <div className='row'>
            <h3>
              {props.state.editCategoryElement.active
                ? props.t('youDeactivate')
                : props.t('youActivate')}
            </h3>

            <div className='col'>
              <Button
                variant={props.state.editCategoryElement.active ? 'danger' : 'success'}
                onClick={activateCategory}
                className='form-control mt-2'
              >
                {props.t('yes')}
              </Button>
            </div>

            <div className='col'>
              <Button
                variant={props.state.editCategoryElement.active ? 'success' : 'danger'}
                onClick={handleClose}
                className='form-control mt-2'
              >
                {props.t('no')}
              </Button>
            </div>
          </div>
        ) : null}
        {editModal.edit === 3 ? (
          <div className='row'>
            <h3>{props.t('youDelete')}</h3>
            <div className='col'>
              <Button variant='danger' onClick={deleteCategory} className='form-control mt-2'>
                {props.t('yes')}
              </Button>
            </div>

            <div className='col'>
              <Button variant='success' onClick={handleClose} className='form-control mt-2'>
                {props.t('no')}
              </Button>
            </div>
          </div>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='dark'
          onClick={() =>
            setEditModal((prev) => ({
              ...prev,
              edit: 1,
            }))
          }
        >
          {props.t('editName')}
        </Button>
        <Button
          variant={props.state.editCategoryElement.active ? 'danger' : 'success'}
          onClick={() => setEditModal({ ...editModal, edit: 2 })}
        >
          {props.state.editCategoryElement.active ? props.t('deActivate') : props.t('activate')}
        </Button>
        <Button
          variant='dark'
          onClick={() =>
            setEditModal((prev) => ({
              ...prev,
              edit: 3,
            }))
          }
        >
          {props.t('delete')}
        </Button>
        <Button variant='dark' onClick={handleClose}>
          {props.t('close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
