import React, { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AdminAudiobooksAudiobookAddService from 'Service/Admin/AdminAudiobooksAudiobookAddService';
import ProgressBar from 'react-bootstrap/ProgressBar';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownMultiselect from 'react-multiselect-dropdown-bootstrap';
import Form from 'react-bootstrap/Form';

export default function AdminAudiobooksAudiobookAddModal(props) {
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

  const maxParts = useRef(0);
  const currentPart = useRef(0);
  const seconds = useRef(3000);

  const adminService = new AdminAudiobooksAudiobookAddService(
    stateModal,
    setStateModal,
    props,
    seconds,
    currentPart,
    maxParts,
  );

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
          <InputGroup className='mb-1 input_modal py-1 '>
            <InputGroup.Text className='input-group-text-new text-light'>
              {props.t('title')}
            </InputGroup.Text>
            <Form.Control
              name='title'
              value={stateModal.title}
              onChange={(e) => {
                adminService.handleChange(e);
              }}
            />
          </InputGroup>
          <InputGroup className='mb-1 input_modal py-1 '>
            <InputGroup.Text className='input-group-text-new text-light'>
              {props.t('author')}
            </InputGroup.Text>
            <Form.Control
              name='author'
              value={stateModal.author}
              onChange={(e) => {
                adminService.handleChange(e);
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
              max={maxParts.current}
              now={maxParts.current == 1 ? undefined : currentPart.current}
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
              <Button className='me-1' variant='dark' onClick={adminService.handleBack}>
                {props.t('back')}
              </Button>
              <Button
                disabled={!stateModal.file}
                variant='dark'
                className='ms-1'
                onClick={() => {
                  adminService.addAudiobook();
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
