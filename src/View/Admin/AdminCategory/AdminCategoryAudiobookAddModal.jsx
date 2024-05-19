import React, { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';
import AdminCategoryAudiobookAddService from 'Service/Admin/AdminCategoryAudiobookAddService';

export default function AdminCategoryAudiobookAddModal(props) {
  const [stateModal, setStateModal] = useState({
    author: '',
    title: '',
    modal: 1,
    fileAdded: false,
    categoryParent: false,
    upload: false,
    uploadEnded: true,
  });

  const maxParts = useRef(0);
  const currentPart = useRef(0);
  const seconds = useRef(3000);

  const adminService = new AdminCategoryAudiobookAddService(
    stateModal,
    setStateModal,
    props,
    maxParts,
    currentPart,
    seconds,
  );
  //TODO tu popraw te dodawanie(chodzi że ten loading i działanie )
  useEffect(() => {
    if (stateModal.author.trim() && stateModal.title.trim()) {
      setStateModal((prev) => ({
        ...prev,
        isNextButtonDisabled: false,
      }));
    } else {
      setStateModal((prev) => ({
        ...prev,
        isNextButtonDisabled: true,
      }));
    }
  }, [stateModal.author, stateModal.title]);

  return (
    <Modal show={props.state.addAudiobookModal} backdrop='static' keyboard={false}>
      <Modal.Header>
        <Modal.Title>
          <h3>
            <b>{props.t('addAudiobook')}</b>
          </h3>
        </Modal.Title>
      </Modal.Header>
      {stateModal.modal == 1 ? (
        <Modal.Body>
          <h5>{props.t('title')}</h5>
          <input
            id='title'
            type='text'
            name='title'
            value={stateModal.title}
            className='form-control mt-2'
            onChange={(e) => adminService.handleChange(e)}
          />
          <h5>{props.t('author')}</h5>
          <input
            id='author'
            type='text'
            name='author'
            value={stateModal.author}
            className='form-control mt-2'
            onChange={(e) => adminService.handleChange(e)}
          />
          {props.categoryDetail.parentCategoryId !== '' ? (
            <div className='mt-3'>
              <Form.Check
                type='switch'
                id='custom-switch'
                label={props.t('categoryParentSelect')}
                checked={stateModal.categoryParent}
                onChange={() =>
                  setStateModal({
                    ...stateModal,
                    categoryParent: !stateModal.categoryParent,
                  })
                }
              />
            </div>
          ) : null}
        </Modal.Body>
      ) : (
        <Modal.Body>
          {stateModal.modal == 3 ? (
            <ProgressBar
              animated
              variant='info'
              max={maxParts.current}
              now={maxParts.current == 1 ? undefined : currentPart.current}
            />
          ) : (
            <input
              id='name'
              type='file'
              name='name'
              className='form-control mt-2'
              onInput={(e) => adminService.handleOnFileChange(e)}
            />
          )}
        </Modal.Body>
      )}
      {stateModal.modal == 1 ? (
        <Modal.Footer>
          <Button variant='dark' onClick={adminService.handleClose}>
            {props.t('close')}
          </Button>
          <Button
            disabled={stateModal.isNextButtonDisabled}
            variant='dark'
            onClick={adminService.nextPage}
          >
            {props.t('save')}
          </Button>
        </Modal.Footer>
      ) : (
        <Modal.Footer>
          {stateModal.upload == false ? (
            <div>
              <Button className='me-1' variant='dark' onClick={adminService.handleBack}>
                {props.t('back')}
              </Button>
              <Button
                disabled={!stateModal.fileAdded}
                variant='dark'
                className='ms-1'
                onClick={() => {
                  adminService.addNewAudiobook();
                }}
              >
                {props.t('upload')}
              </Button>
            </div>
          ) : (
            <div>
              <Button
                disabled={stateModal.uploadEnded}
                variant='dark'
                onClick={() => {
                  adminService.handleClose();
                }}
              >
                {props.t('close')}
              </Button>
            </div>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
}
