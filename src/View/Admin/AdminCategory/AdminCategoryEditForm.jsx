import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from 'react-bootstrap/Alert';
import AdminAudiobookEditService from 'Service/Admin/AdminAudiobookEditService';
import CreateUtil from 'Util/CreateUtil';

export default function AdminCategoryEditForm(props) {
  const [wrongState, setWrongState] = useState(0);

  const adminService = new AdminAudiobookEditService(props, wrongState, setWrongState);

  useEffect(() => {
    if (props.audiobookDetailState != null) {
      adminService.validateFields();
    }
  }, [props.audiobookDetailState]);

  return (
    <div className='row'>
      <div className='row text-light'>
        <InputGroup className='mb-1 input_modal'>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('title')}
          </InputGroup.Text>
          <Form.Control
            name='title'
            value={props.audiobookDetailState != null ? props.audiobookDetailState.title : ''}
            onChange={(event) => {
              adminService.handleChange(event);
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
            name='author'
            value={props.audiobookDetailState != null ? props.audiobookDetailState.author : ''}
            onChange={(event) => {
              adminService.handleChange(event);
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
            name='album'
            value={props.audiobookDetailState != null ? props.audiobookDetailState.album : ''}
            onChange={(event) => {
              adminService.handleChange(event);
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
            name='year'
            value={
              props.audiobookDetailState != null
                ? CreateUtil.createDate(props.audiobookDetailState.year)
                : ''
            }
            onChange={(event) => {
              adminService.handleChange(event);
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
            name='parts'
            value={props.audiobookDetailState != null ? props.audiobookDetailState.parts : ''}
            onChange={(event) => {
              adminService.handleChangeInt(event);
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
            name='duration'
            value={
              props.audiobookDetailState != null
                ? CreateUtil.createTime(props.audiobookDetailState.duration)
                : ''
            }
            onChange={(event) => {
              adminService.handleChange(event);
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
            name='description'
            rows={4}
            value={props.audiobookDetailState != null ? props.audiobookDetailState.description : ''}
            onChange={(event) => {
              adminService.handleChange(event);
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
            name='encoded'
            value={
              props.audiobookDetailState != null
                ? props.audiobookDetailState.encoded !== undefined
                  ? props.audiobookDetailState.encoded
                  : ''
                : ''
            }
            onChange={(event) => {
              adminService.handleChange(event);
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
            name='size'
            value={props.audiobookDetailState != null ? props.audiobookDetailState.size : ''}
            onChange={(event) => {
              adminService.handleChange(event);
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
            name='version'
            value={props.audiobookDetailState != null ? props.audiobookDetailState.version : ''}
            onChange={(event) => {
              adminService.handleChange(event);
            }}
          />
        </InputGroup>
      </div>
      <div className='row text-light pe-0 input_modal'>
        <InputGroup className='mb-1'>
          <Dropdown onSelect={(eventKey) => adminService.handleChangeDropdown(eventKey, 'age')}>
            <Dropdown.Toggle className=' text-start' variant='success' id='dropdown-basic'>
              {props.t('age')}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {props.audiobookDetailState != null ? (
                <Dropdown.Item eventKey={1} active={props.audiobookDetailState.age === 1}>
                  3-7
                </Dropdown.Item>
              ) : null}
              {props.audiobookDetailState != null ? (
                <Dropdown.Item eventKey={2} active={props.audiobookDetailState.age === 2}>
                  7-12
                </Dropdown.Item>
              ) : null}

              {props.audiobookDetailState != null ? (
                <Dropdown.Item eventKey={3} active={props.audiobookDetailState.age === 3}>
                  12-16
                </Dropdown.Item>
              ) : null}

              {props.audiobookDetailState != null ? (
                <Dropdown.Item eventKey={4} active={props.audiobookDetailState.age === 4}>
                  16-18
                </Dropdown.Item>
              ) : null}

              {props.audiobookDetailState != null ? (
                <Dropdown.Item eventKey={5} active={props.audiobookDetailState.age === 5}>
                  18+
                </Dropdown.Item>
              ) : null}
            </Dropdown.Menu>
            <InputGroup.Text id='inputGroup-sizing-default'>
              {props.audiobookDetailState != null
                ? props.audiobookDetailState.age === 1
                  ? '3-7'
                  : props.audiobookDetailState.age === 2
                    ? '7-12'
                    : props.audiobookDetailState.age === 3
                      ? '12-16'
                      : props.audiobookDetailState.age === 4
                        ? '16-18'
                        : props.audiobookDetailState.age === 5
                          ? '18+'
                          : null
                : null}
            </InputGroup.Text>
          </Dropdown>
        </InputGroup>
      </div>

      <div className='row text-light me-2 input_modal'>
        <div>
          <Alert show={wrongState !== 0} className='dangerAllert mt-1 text-center' variant='danger'>
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
              disabled={wrongState !== 0}
              className='btn button px-4 my-1 question_button success_button'
              onClick={() => {
                props.setStateModal((prev) => ({
                  ...prev,
                  edit: !props.stateModal.edit,
                }));
                props.audiobookDataEdit(props.audiobookDetailState);
              }}
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
                props.setStateModal((prev) => ({
                  ...prev,
                  edit: !props.stateModal.edit,
                }))
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
            disabled={wrongState !== 0}
            className='btn button px-4 mt-3 mb-1 modal_button success_button'
            onClick={() =>
              props.setStateModal((prev) => ({
                ...prev,
                edit: !props.stateModal.edit,
              }))
            }
          >
            {props.t('edit')}
          </Button>
        </div>
      )}
    </div>
  );
}
