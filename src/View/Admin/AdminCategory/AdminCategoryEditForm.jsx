import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from 'react-bootstrap/Alert';
import AdminCategoriesRenderList from '../AdminCategories/AdminCategoriesRenderList';
export default function AdminCategoryEditForm(props) {
  const [wrongState, setWrongState] = useState(0);

  const adminService = new AdminCategoriesRenderList(props, wrongState, setWrongState);

  useEffect(() => {
    if (props.audiobookDetail != null) {
      adminService.validateFields();
    }
  }, [props.audiobookDetail]);

  return (
    <div className='row'>
      <div className='row text-light'>
        <InputGroup className='mb-1 input_modal'>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('title')}
          </InputGroup.Text>
          <Form.Control
            value={props.audiobookDetail != null ? props.audiobookDetail.title : ''}
            onChange={(event) => {
              adminService.handleTitleChange(event);
            }}
          />
        </InputGroup>
      </div>
      <div className='row text-light'>
        <InputGroup className='mb-1 input_modal'>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('author')}
          </InputGroup.Text>
          <Form.Control
            value={props.audiobookDetail != null ? props.audiobookDetail.author : ''}
            onChange={(event) => {
              adminService.handleAuthorChange(event);
            }}
          />
        </InputGroup>
      </div>
      <div className='row text-light'>
        <InputGroup className='mb-1 input_modal'>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('album')}
          </InputGroup.Text>
          <Form.Control
            value={props.audiobookDetail != null ? props.audiobookDetail.album : ''}
            onChange={(event) => {
              adminService.handleAlbumChange(event);
            }}
          />
        </InputGroup>
      </div>
      <div className='row text-light'>
        <InputGroup className='mb-1 input_modal'>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('year')}
          </InputGroup.Text>
          <Form.Control
            type='date'
            value={props.audiobookDetail != null ? props.audiobookDetail.year : ''}
            onChange={(event) => {
              adminService.handleYearChange(event);
            }}
          />
        </InputGroup>
      </div>
      <div className='row text-light'>
        <InputGroup className='mb-1 input_modal'>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('parts')}
          </InputGroup.Text>
          <Form.Control
            type='number'
            value={props.audiobookDetail != null ? props.audiobookDetail.parts : ''}
            onChange={(event) => {
              adminService.handlePartsChange(event);
            }}
          />
        </InputGroup>
      </div>
      <div className='row text-light'>
        <InputGroup className='mb-1 input_modal'>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('duration')}
          </InputGroup.Text>
          <Form.Control
            value={props.audiobookDetail != null ? props.audiobookDetail.duration : ''}
            onChange={(event) => {
              adminService.handleDurationChange(event);
            }}
          />
        </InputGroup>
      </div>
      <div className='row text-light'>
        <InputGroup className='mb-1 input_modal'>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('description')}
          </InputGroup.Text>
          <Form.Control
            as='textarea'
            rows={4}
            value={props.audiobookDetail != null ? props.audiobookDetail.description : ''}
            onChange={(event) => {
              adminService.handleDescriptionChange(event);
            }}
          />
        </InputGroup>
      </div>
      <div className='row text-light'>
        <InputGroup className='mb-1 input_modal'>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('encoded')}
          </InputGroup.Text>
          <Form.Control
            value={
              props.audiobookDetail != null
                ? props.audiobookDetail.encoded != undefined
                  ? props.audiobookDetail.encoded
                  : ''
                : ''
            }
            onChange={(event) => {
              adminService.handleEncodedChange(event);
            }}
          />
        </InputGroup>
      </div>
      <div className='row text-light'>
        <InputGroup className='mb-1 input_modal'>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('size')}
          </InputGroup.Text>
          <Form.Control
            value={props.audiobookDetail != null ? props.audiobookDetail.size : ''}
            onChange={(event) => {
              adminService.handleSizeChange(event);
            }}
          />
        </InputGroup>
      </div>
      <div className='row text-light'>
        <InputGroup className='mb-1 input_modal'>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('version')}
          </InputGroup.Text>
          <Form.Control
            value={props.audiobookDetail != null ? props.audiobookDetail.version : ''}
            onChange={(event) => {
              adminService.handleVersionChange(event);
            }}
          />
        </InputGroup>
      </div>
      <div className='row text-light pe-0 input_modal'>
        <InputGroup className='mb-1'>
          <Dropdown onSelect={(event) => adminService.handleAgeChange(event)}>
            <Dropdown.Toggle className=' text-start' variant='success' id='dropdown-basic'>
              {props.t('age')}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {props.audiobookDetail != null ? (
                <Dropdown.Item eventKey={1} active={props.audiobookDetail.age == 1}>
                  3-7
                </Dropdown.Item>
              ) : null}
              {props.audiobookDetail != null ? (
                <Dropdown.Item eventKey={2} active={props.audiobookDetail.age == 2}>
                  7-12
                </Dropdown.Item>
              ) : null}

              {props.audiobookDetail != null ? (
                <Dropdown.Item eventKey={3} active={props.audiobookDetail.age == 3}>
                  12-16
                </Dropdown.Item>
              ) : null}

              {props.audiobookDetail != null ? (
                <Dropdown.Item eventKey={4} active={props.audiobookDetail.age == 4}>
                  16-18
                </Dropdown.Item>
              ) : null}

              {props.audiobookDetail != null ? (
                <Dropdown.Item eventKey={5} active={props.audiobookDetail.age == 5}>
                  18+
                </Dropdown.Item>
              ) : null}
            </Dropdown.Menu>
            <InputGroup.Text id='inputGroup-sizing-default'>
              {props.audiobookDetail != null
                ? props.audiobookDetail.age == 1
                  ? '3-7'
                  : props.audiobookDetail.age == 2
                  ? '7-12'
                  : props.audiobookDetail.age == 3
                  ? '12-16'
                  : props.audiobookDetail.age == 4
                  ? '16-18'
                  : props.audiobookDetail.age == 5
                  ? '18+'
                  : null
                : null}
            </InputGroup.Text>
          </Dropdown>
        </InputGroup>
      </div>

      <div className='row text-light me-2 input_modal'>
        <div>
          <Alert show={wrongState != 0} className='dangerAllert mt-1 text-center' variant='danger'>
            {adminService.returnFormError()}
          </Alert>
        </div>
      </div>
      {props.stateModal.edit ? (
        <div className='row'>
          <div className='col'>
            <Button
              name='en'
              size='sm'
              disabled={wrongState != 0}
              className='btn button px-4 my-1 question_button success_button'
              onClick={adminService.editAudiobookData}
            >
              {props.t('yes')}
            </Button>
          </div>
          <div className='col'>
            <Button
              name='en'
              size='sm'
              className='btn button px-4 my-1 question_button danger_button me-2'
              onClick={() =>
                props.setStateModal({
                  ...props.stateModal,
                  edit: !props.stateModal.edit,
                })
              }
            >
              {props.t('no')}
            </Button>
          </div>
        </div>
      ) : (
        <div className='row'>
          <Button
            name='en'
            size='sm'
            disabled={wrongState != 0}
            className='btn button px-4 mt-3 mb-1 modal_button success_button'
            onClick={() =>
              props.setStateModal({
                ...props.stateModal,
                edit: !props.stateModal.edit,
              })
            }
          >
            {props.t('edit')}
          </Button>
        </div>
      )}
    </div>
  );
}
