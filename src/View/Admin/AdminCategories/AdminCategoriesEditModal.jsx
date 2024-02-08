import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { HandleFetch } from 'Util/HandleFetch';

export default function AdminCategoriesEditModal(props) {
  const [stateEditButton, setStateEditButton] = useState(true);

  const [editModal, setEditModal] = useState({
    edit: 1,
    new_name: '',
    error: 0,
  });

  const handleClose = () => {
    props.setState((prev) => ({
      ...prev,
      editCategoryModal: !props.state.editCategoryModal,
      editCategoryElement: null,
      refresh: !props.state.refresh,
    }));
  };

  const handleNewNameChange = (event) => {
    setEditModal((prev) => ({
      ...prev,
      new_name: event.target.value,
    }));
  };

  const editCategoryName = () => {
    HandleFetch(
      '/admin/category/edit',
      'PATCH',
      {
        name: editModal.new_name,
        categoryId: props.state.editCategoryElement.id,
      },
      props.token,
      props.i18n.language,
    )
      .then(() => {
        handleClose();
      })
      .catch((e) => {
        props.setCategoiesState((prev) => ({
          ...prev,
          error: e,
        }));
      });
  };

  const deleteCategory = () => {
    HandleFetch(
      '/admin/category/remove',
      'DELETE',
      {
        categoryId: props.state.editCategoryElement.id,
      },
      props.token,
      props.i18n.language,
    )
      .then(() => {
        handleClose();
      })
      .catch((e) => {
        props.setCategoiesState((prev) => ({
          ...prev,
          error: e,
        }));
      });
  };
  const activateCategory = () => {
    HandleFetch(
      '/admin/category/active',
      'PATCH',
      {
        categoryId: props.state.editCategoryElement.id,
        active: !props.state.editCategoryElement.active,
      },
      props.token,
      props.i18n.language,
    )
      .then(() => {
        handleClose();
      })
      .catch((e) => {
        props.setCategoiesState({
          ...props.categoiesState,
          error: e,
        });
      });
  };

  useEffect(() => {
    if (editModal.new_name != '') {
      setStateEditButton(false);
    } else {
      setStateEditButton(true);
    }
  }, [editModal.new_name]);

  return (
    <Modal show={props.state.editCategoryModal} backdrop='static' keyboard={false}>
      <Modal.Header>
        <Modal.Title>
          <h3>
            <b>{props.t('editCategory')}</b>
          </h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {editModal.edit == 1 ? (
          <div className='row'>
            <h3>{props.t('youChangeName')}</h3>
            <div className='col'>
              <input
                id='name'
                type='text'
                name='name'
                value={editModal.new_name}
                className='form-control mt-2'
                onChange={handleNewNameChange}
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
        {editModal.edit == 2 ? (
          <div className='row'>
            <h3>
              {props.state.editCategoryElement.active
                ? props.t('youDeactivate')
                : props.t('youActivete')}
            </h3>

            <div className='col'>
              <Button variant='danger' onClick={activateCategory} className='form-control mt-2'>
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
        {editModal.edit == 3 ? (
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
