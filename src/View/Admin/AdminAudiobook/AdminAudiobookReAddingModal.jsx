import React, { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownMultiselect from 'react-multiselect-dropdown-bootstrap';
import Form from 'react-bootstrap/Form';
import AdminAudiobookReAddingService from 'Service/Admin/AdminAudiobookReAddingService';

export default function AdminAudiobookReAddingModal(props) {
  const [stateModal, setStateModal] = useState({
    author: '',
    title: '',
    modal: 1,
    categories: [],
    file: null,
    fileAdded: false,
    upload: false,
    uploadEnded: true,
  });

  const [stateProgress, setStateProgress] = useState({
    maxParts: 0,
    currentPart: 0,
    error: false,
  });

  const seconds = useRef(3000);

  const adminService = new AdminAudiobookReAddingService(
    stateModal,
    setStateModal,
    props,
    seconds,
    stateProgress,
    setStateProgress,
  );

  useEffect(() => {
    if (stateModal.author.trim() && stateModal.title.trim()) {
      setStateModal({ ...stateModal, isNextButtonDisabled: false });
    } else {
      setStateModal({ ...stateModal, isNextButtonDisabled: true });
    }
  }, [stateModal.author, stateModal.title]);

  useEffect(() => {
    setStateModal({
      ...stateModal,
      author: props.audiobookDetail.author,
      title: props.audiobookDetail.title,
    });
  }, [props]);

  return (
    <Modal show={props.audiobookState.reAddingModal} backdrop='static' keyboard={false} centered>
      <Modal.Header>
        <Modal.Title>
          <h3>
            <b>{props.t('reAdding')}</b>
          </h3>
        </Modal.Title>
      </Modal.Header>
      {stateModal.modal == 1 ? (
        <Modal.Body>
          <InputGroup className='mb-1 input_modal py-1 '>
            <InputGroup.Text className='input-group-text-new text-light'>
              {props.t('title')}
            </InputGroup.Text>
            <Form.Control
              value={stateModal.title}
              onChange={(e) => {
                adminService.handleSetTitleChange(e);
              }}
            />
          </InputGroup>
          <InputGroup className='mb-1 input_modal py-1 '>
            <InputGroup.Text className='input-group-text-new text-light'>
              {props.t('author')}
            </InputGroup.Text>
            <Form.Control
              value={stateModal.author}
              onChange={(e) => {
                adminService.handleSetAuthorChange(e);
              }}
            />
          </InputGroup>
          <InputGroup className='mb-1 input_modal py-1 '>
            <InputGroup.Text className='input-group-text-new text-light'>
              {props.t('categories')}
            </InputGroup.Text>
            <DropdownMultiselect
              placeholder={props.t('selectCategories')}
              placeholderMultipleChecked={props.t('slectedMultiCategories')}
              selectDeselectLabel={props.t('slectedAll')}
              options={adminService.generateCategoriesList()}
              name='countries'
              handleOnChange={(e) => {
                adminService.changeCategories(e);
              }}
              selected={stateModal.categories}
              className={'dropdown_multiselect'}
            />
          </InputGroup>
        </Modal.Body>
      ) : (
        <Modal.Body>
          {stateModal.modal == 3 ? (
            <ProgressBar
              animated
              variant='info'
              max={stateProgress.maxParts}
              now={stateProgress.maxParts == 1 ? undefined : stateProgress.currentPart}
            />
          ) : (
            <input
              id='name'
              type='file'
              name='name'
              className='form-control mt-2'
              onChange={adminService.handleOnFileChange}
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
              <Button variant='dark' onClick={adminService.handleBack}>
                {props.t('back')}
              </Button>
              <Button
                disabled={!stateModal.file}
                variant='dark'
                onClick={() => {
                  adminService.reAddAudiobook();
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
                  adminService.handleCloseAndUpdate();
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
