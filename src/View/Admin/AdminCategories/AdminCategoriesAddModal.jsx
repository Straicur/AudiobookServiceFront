import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormService from 'Service/Common/FormService';

export default function AdminCategoriesAddModal(props) {
  const [modalState, setModalState] = useState({
    name: '',
    isButtonDisabled: true,
  });

  const adminService = new FormService(setModalState);

  const handleClose = () => {
    props.setState((prev) => ({
      ...prev,
      addCategoryModal: !props.state.addCategoryModal,
      addCategoryParent: null,
    }));
  };

  const addNewCategory = () => {
    let additionalData = {};

    if (props.state.addCategoryParent != null) {
      additionalData = { parentId: props.state.addCategoryParent.id };
    }
    props.categoryAdd({
      name: modalState.name,
      additionalData: additionalData,
    });

    handleClose();
  };

  useEffect(() => {
    if (modalState.name.trim()) {
      setModalState((prev) => ({
        ...prev,
        isButtonDisabled: false,
      }));
    } else {
      setModalState((prev) => ({
        ...prev,
        isButtonDisabled: true,
      }));
    }
  }, [modalState.name]);

  return (
    <Modal
      show={props.state.addCategoryModal}
      onHide={handleClose}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h3>
            <b>
              {props.state.addCategoryParent != null
                ? props.t('addToCategory') + ' ' + props.state.addCategoryParent.name
                : props.t('addMainCategory')}
            </b>
          </h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{props.t('name')}</h5>
        <input
          id='name'
          type='text'
          name='name'
          value={modalState.name}
          className='form-control mt-2'
          onChange={(e) => adminService.handleChange(e)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='dark' onClick={handleClose}>
          {props.t('close')}
        </Button>
        <Button disabled={modalState.isButtonDisabled} variant='dark' onClick={addNewCategory}>
          {props.t('add')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
