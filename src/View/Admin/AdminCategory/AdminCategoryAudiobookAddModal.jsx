import React, { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';
import AdminCategoryAudiobookAddService from 'Service/Admin/AdminCategoryAudiobookAddService';
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';

export default function AdminCategoryAudiobookAddModal(props) {
  const [stateModal, setStateModal] = useState({
    author: '',
    title: '',
    modal: 1,
    age: 0,
    year: '',
    fileAdded: false,
    categoryParent: false,
    upload: false,
    uploadEnded: true,
  });

  const maxParts = useRef(0);
  const currentPart = useRef(0);
  const seconds = useRef(2000);

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
      {stateModal.modal === 1 ? (
        <Modal.Body>
          <h5>{props.t('title')}</h5>
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
          <hr />
          <p className='pt-1'> {props.t('optionalFields')}:</p>
          <InputGroup className='mb-1 input_modal'>
            <InputGroup.Text className='input-group-text-new text-light'>
              {props.t('year')}
            </InputGroup.Text>
            <Form.Control
              type='date'
              name='year'
              value={stateModal.year}
              onChange={(e) => {
                adminService.handleChange(e);
              }}
            />
          </InputGroup>
          <InputGroup className='mb-1'>
            <Dropdown
              name='age'
              onSelect={(eventKey) => adminService.handleChangeDropdown(eventKey, 'age')}
            >
              <Dropdown.Toggle className=' text-start' variant='success' id='dropdown-basic'>
                {props.t('age')}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey={1} active={stateModal.age === 1}>
                  3-7
                </Dropdown.Item>
                <Dropdown.Item eventKey={2} active={stateModal.age === 2}>
                  7-12
                </Dropdown.Item>
                <Dropdown.Item eventKey={3} active={stateModal.age === 3}>
                  12-16
                </Dropdown.Item>
                <Dropdown.Item eventKey={4} active={stateModal.age === 4}>
                  16-18
                </Dropdown.Item>
                <Dropdown.Item eventKey={5} active={stateModal.age === 5}>
                  18+
                </Dropdown.Item>
              </Dropdown.Menu>
              <InputGroup.Text id='inputGroup-sizing-default'>
                {stateModal.age === 1
                  ? '3-7'
                  : stateModal.age === 2
                  ? '7-12'
                  : stateModal.age === 3
                  ? '12-16'
                  : stateModal.age === 4
                  ? '16-18'
                  : stateModal.age === 5
                  ? '18+'
                  : null}
              </InputGroup.Text>
            </Dropdown>
          </InputGroup>
        </Modal.Body>
      ) : (
        <Modal.Body>
          {stateModal.modal === 3 ? (
            <ProgressBar
              animated
              variant='info'
              max={maxParts.current}
              now={maxParts.current === 1 ? undefined : currentPart.current}
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
      {stateModal.modal === 1 ? (
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
          {stateModal.upload === false ? (
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
