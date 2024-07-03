import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import AdminUsersEditService from 'Service/Admin/AdminUsersEditService';

export default function AdminUsersEditFrom(props) {
  const [passwordState, setPasswordState] = useState({
    password: '',
    sure: false,
    wrong: false,
    buttonDisabled: false,
  });
  const [phoneNumberState, setPhoneNumberState] = useState({
    phoneNumber: '',
    sure: false,
    wrong: false,
    buttonDisabled: false,
  });

  const adminService = new AdminUsersEditService(
    passwordState,
    setPasswordState,
    props,
    phoneNumberState,
    setPhoneNumberState,
  );

  return (
    <div className='row mt-3 align-items-center'>
      <hr></hr>
      <div className='row align-items-center'>
        <h3>{props.t('active/ban')}</h3>
      </div>
      <div className='row align-items-center mt-2'>
        <div className='col-2'>{props.t('active')}:</div>
        <div className='col-2'>
          {props.state.editUserElement.active ? (
            <i className='bi bi-bookmark-check-fill'></i>
          ) : (
            <i className='bi bi-bookmark-dash'></i>
          )}
        </div>
        <div className='col-4 align-self-center'>
          <Button
            variant='warning'
            size='sm'
            disabled={props.state.editUserElement.active}
            className=' btn button text-light'
            onClick={(e) => {
              e.target.classList.add('disabled');

              props.activateUser({
                state: props.state,
                setState: props.setState,
              });
            }}
          >
            {props.t('activate')}
          </Button>
        </div>
      </div>
      <div className='row mb-3 align-items-center mt-2'>
        <div className='col-2'>{props.t('banned')}:</div>
        <div className='col-2'>
          {props.state.editUserElement.banned ? (
            <i className='bi bi-bookmark-check-fill'></i>
          ) : (
            <i className='bi bi-bookmark-dash'></i>
          )}
        </div>
        <div className='col-4 align-self-center'>
          <Button
            variant='warning'
            size='sm'
            className=' btn button text-light'
            onClick={(e) => {
              e.target.classList.add('disabled');
              props.banUser({
                state: props.state,
                setState: props.setState,
                e: e,
              });
            }}
          >
            {props.state.editUserElement.banned ? props.t('unban') : props.t('ban')}
          </Button>
        </div>
      </div>
      <hr></hr>
      <div className='row'>
        <h3>{props.t('changeData')}</h3>
      </div>
      <InputGroup className='mb-1 input_modal ms-3'>
        <InputGroup.Text className='input_group_text'>{props.t('changePassword')}</InputGroup.Text>
        <Form.Control
          type='password'
          onChange={(event) => {
            adminService.handlePasswordChange(event);
          }}
        />
      </InputGroup>
      <div className='row input_modal ms-3'>
        <div>
          <Alert
            show={passwordState.wrong}
            className='dangerAllert mt-1 text-center'
            variant='danger'
          >
            {props.t('enterValidPassword')}
          </Alert>
        </div>
      </div>
      {passwordState.sure ? (
        <div className='row justify-content-center mt-2 mb-1'>
          <div className='col-3'>
            <Button
              name='en'
              size='sm'
              className='btn button px-4 my-1 question_button success_button'
              onClick={(e) => adminService.changeUserPassword(e)}
            >
              {props.t('yes')}
            </Button>
          </div>
          <div className='col-3'>
            <Button
              name='en'
              size='sm'
              className='btn button px-4 my-1 question_button danger_button me-2'
              onClick={() =>
                setPasswordState((prev) => ({
                  ...prev,
                  sure: !passwordState.sure,
                }))
              }
            >
              {props.t('no')}
            </Button>
          </div>
        </div>
      ) : (
        <div className='row justify-content-md-center mt-2 mb-1'>
          <div className='col-6'>
            <Button
              variant='success'
              size='sm'
              className=' btn button text-light my-1 button_save'
              disabled={passwordState.buttonDisabled}
              onClick={() => {
                setPasswordState((prev) => ({
                  ...prev,
                  sure: !passwordState.sure,
                }));
              }}
            >
              {props.t('save')}
            </Button>
          </div>
        </div>
      )}

      <InputGroup className='mb-1 input_modal ms-3'>
        <InputGroup.Text>{props.t('changePhoneNumber')}</InputGroup.Text>
        <Form.Control
          onChange={(event) => {
            adminService.handlePhoneNumberChange(event);
          }}
        />
      </InputGroup>
      <div className='row input_modal ms-3'>
        <div>
          <Alert
            show={phoneNumberState.wrong}
            className='dangerAllert mt-1 text-center'
            variant='danger'
          >
            {props.t('enterValidPhoneNumber')}
          </Alert>
        </div>
      </div>
      {phoneNumberState.sure ? (
        <div className='row justify-content-center mt-2 mb-1'>
          <div className='col-3'>
            <Button
              name='en'
              size='sm'
              className='btn button px-4 my-1 question_button success_button'
              onClick={(e) => adminService.changeUserPhone(e)}
            >
              {props.t('yes')}
            </Button>
          </div>
          <div className='col-3'>
            <Button
              name='en'
              size='sm'
              className='btn button px-4 my-1 question_button danger_button me-2'
              onClick={() =>
                setPhoneNumberState((prev) => ({
                  ...prev,
                  sure: !phoneNumberState.sure,
                }))
              }
            >
              {props.t('no')}
            </Button>
          </div>
        </div>
      ) : (
        <div className='row justify-content-md-center mt-2 mb-1'>
          <div className='col-6'>
            <Button
              variant='success'
              size='sm'
              className=' btn button text-light my-1 button_save'
              disabled={phoneNumberState.buttonDisabled}
              onClick={() => {
                setPhoneNumberState((prev) => ({
                  ...prev,
                  sure: !phoneNumberState.sure,
                }));
              }}
            >
              {props.t('save')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
