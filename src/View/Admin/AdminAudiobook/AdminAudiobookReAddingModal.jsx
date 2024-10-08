import React, { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownMultiselect from 'react-multiselect-dropdown-bootstrap';
import Form from 'react-bootstrap/Form';
import AdminAudiobookReAddingService from 'Service/Admin/AdminAudiobookReAddingService';
import Dropdown from 'react-bootstrap/Dropdown';

export default function AdminAudiobookReAddingModal(props) {
  const [stateModal, setStateModal] = useState({
    author: '',
    title: '',
    modal: 1,
    age: 0,
    year: '',
    categories: [],
    file: null,
    fileAdded: false,
    upload: false,
    uploadEnded: true,
    deleteComments: false,
    deleteNotifications: false,
  });

  const maxParts = useRef(0);
  const currentPart = useRef(0);
  const seconds = useRef(3000);

  const adminService = new AdminAudiobookReAddingService(
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

  useEffect(() => {
    setStateModal((prev) => ({
      ...prev,
      author: props.audiobookDetail.author,
      title: props.audiobookDetail.title,
    }));
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
      {stateModal.modal === 1 ? (
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
              placeholderMultipleChecked={props.t('selectedMultiCategories')}
              selectDeselectLabel={props.t('selectedAll')}
              options={adminService.generateCategoriesList()}
              name='countries'
              handleOnChange={(e) => {
                adminService.changeCategories(e);
              }}
              selected={stateModal.categories}
              className={'dropdown_multiselect'}
            />
          </InputGroup>
          <InputGroup className='mb-1 input_modal py-1 '>
            <Form.Check
              type='switch'
              id='custom-switch'
              label={props.t('deleteAudiobookComments')}
              checked={stateModal.deleteComments}
              onChange={() =>
                setStateModal({
                  ...stateModal,
                  deleteComments: !stateModal.deleteComments,
                })
              }
            />
          </InputGroup>
          <InputGroup className='mb-1 input_modal py-1 '>
            <Form.Check
              type='switch'
              id='custom-switch'
              label={props.t('deleteAudiobookNotifications')}
              checked={stateModal.deleteNotifications}
              onChange={() =>
                setStateModal({
                  ...stateModal,
                  deleteNotifications: !stateModal.deleteNotifications,
                })
              }
            />
          </InputGroup>
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
              onChange={adminService.handleOnFileChange}
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
              <Button variant='dark' onClick={adminService.handleBack}>
                {props.t('back')}
              </Button>
              <Button
                disabled={!stateModal.file}
                variant='dark'
                className='ms-1'
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
