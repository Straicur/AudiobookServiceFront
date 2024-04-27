import React, { useState, useLayoutEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import ValidateUtil from 'Util/ValidateUtil';
import FormService from 'Service/Common/FormService';

export default function UserSettingsEditUserDataModal(props) {
  const [state, setState] = useState({
    phoneNumber: '',
    firstname: '',
    lastname: '',
    sure: false,
    checkChanges: false,
    wrongPhoneNumber: false,
    wrongFirstname: false,
    wrongLastname: false,
  });

  const userService = new FormService(setState);

  const handleClose = () => {
    props.refetch();

    props.setState((prev) => ({
      ...prev,
      buttonUserData: !props.state.buttonUserData,
    }));
  };

  const changeUserData = (element) => {
    element.target.classList.add('disabled');

    props.userDataChange({
      state: state,
      setState: setState,
      element: element,
    });
  };

  useLayoutEffect(() => {
    if (state.firstname.length == 0) {
      setState((prev) => ({
        ...prev,
        wrongFirstname: false,
      }));
    } else if (!ValidateUtil.validateName(state.firstname)) {
      setState((prev) => ({
        ...prev,
        wrongFirstname: true,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        wrongFirstname: false,
      }));
    }
  }, [state.firstname]);

  useLayoutEffect(() => {
    if (state.lastname.length == 0) {
      setState((prev) => ({
        ...prev,
        wrongLastname: false,
      }));
    } else if (!ValidateUtil.validateLastName(state.lastname)) {
      setState((prev) => ({
        ...prev,
        wrongLastname: true,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        wrongLastname: false,
      }));
    }
  }, [state.lastname]);

  useLayoutEffect(() => {
    if (state.phoneNumber.length == 0) {
      setState((prev) => ({
        ...prev,
        wrongPhoneNumber: false,
      }));
    } else if (!ValidateUtil.validatePhoneNumber(state.phoneNumber)) {
      setState((prev) => ({
        ...prev,
        wrongPhoneNumber: true,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        wrongPhoneNumber: false,
      }));
    }
  }, [state.phoneNumber]);

  useLayoutEffect(() => {
    if (props.state.error != null) {
      throw props.state.error;
    }
  }, [props.state.error]);

  useLayoutEffect(() => {
    setState((prev) => ({
      ...prev,
      phoneNumber: props.userDetail.phoneNumber,
      firstname: props.userDetail.firstname,
      lastname: props.userDetail.lastname,
    }));
  }, [props.state]);

  return (
    <Modal
      size='lg'
      show={props.state.buttonUserData}
      onHide={handleClose}
      backdrop='static'
      centered
    >
      <Modal.Body
        style={{
          backgroundColor: '#262626',
        }}
      >
        <div className='text-white'>
          {state.checkChanges ? (
            <div className='fs-3 text-center my-3'>{props.t('checkUserData')}</div>
          ) : (
            <Form>
              <Form.Group className='mb-3'>
                <Form.Label>{props.t('firstname')}</Form.Label>
                <Form.Control
                  type='text'
                  name='firstname'
                  isValid={state.firstname.length > 1 && ValidateUtil.validateName(state.firstname)}
                  isInvalid={
                    state.firstname.length > 1 && !ValidateUtil.validateName(state.firstname)
                  }
                  value={state.firstname}
                  onChange={(event) => userService.handleChange(event)}
                />
                <Alert
                  show={state.wrongFirstname}
                  className='dangerAllert mt-1 text-center'
                  variant='danger'
                >
                  {props.t('enterValidFirstName')}
                </Alert>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>{props.t('lastname')}</Form.Label>
                <Form.Control
                  type='text'
                  name='lastname'
                  isValid={
                    state.lastname.length > 1 && ValidateUtil.validateLastName(state.lastname)
                  }
                  isInvalid={
                    state.lastname.length > 1 && !ValidateUtil.validateLastName(state.lastname)
                  }
                  value={state.lastname}
                  onChange={(event) => userService.handleChange(event)}
                />
                <Alert
                  show={state.wrongLastname}
                  className='dangerAllert mt-1 text-center'
                  variant='danger'
                >
                  {props.t('enterValidLastName')}
                </Alert>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>{props.t('phoneNumber')}</Form.Label>
                <Form.Control
                  type='tel'
                  name='phoneNumber'
                  isValid={
                    state.phoneNumber.length > 1 &&
                    ValidateUtil.validatePhoneNumber(state.phoneNumber)
                  }
                  isInvalid={
                    state.phoneNumber.length > 1 &&
                    !ValidateUtil.validatePhoneNumber(state.phoneNumber)
                  }
                  value={state.phoneNumber}
                  onChange={(event) => userService.handleChange(event)}
                />
                <Alert
                  show={state.wrongPhoneNumber}
                  className='dangerAllert mt-1 text-center'
                  variant='danger'
                >
                  {props.t('enterValidPhoneNumber')}
                </Alert>
              </Form.Group>
            </Form>
          )}
          <div className='row align-items-center row justify-content-end'>
            {!state.sure ? (
              <div className='col-2'>
                <Button
                  name='en'
                  size='sm'
                  className='btn button danger_button settings-button fs-5 sure_button'
                  onClick={() => handleClose()}
                >
                  {props.t('close')}
                </Button>
              </div>
            ) : null}
            {!state.checkChanges ? (
              state.sure ? (
                <div className='col-4'>
                  <div className='row justify-content-center'>
                    <div className='col-6'>
                      <Button
                        disabled={
                          state.wrongFirstname ||
                          state.wrongLastname ||
                          state.wrongPhoneNumber ||
                          state.firstname.length == 0 ||
                          state.lastname.length == 0 ||
                          state.phoneNumber.length == 0
                        }
                        className='btn button success_button settings-button fs-5 sure_button'
                        onClick={(e) => changeUserData(e)}
                      >
                        {props.t('yes')}
                      </Button>
                    </div>
                    <div className='col-6'>
                      <Button
                        className='btn button danger_button settings-button fs-5 sure_button'
                        size='sm'
                        onClick={() =>
                          setState((prev) => ({
                            ...prev,
                            sure: !state.sure,
                          }))
                        }
                      >
                        {props.t('no')}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='col-2'>
                  <Button
                    name='en'
                    size='sm'
                    disabled={
                      state.wrongFirstname ||
                      state.wrongLastname ||
                      state.wrongPhoneNumber ||
                      state.firstname.length == 0 ||
                      state.lastname.length == 0 ||
                      state.phoneNumber.length == 0
                    }
                    className='btn button success_button settings-button fs-5'
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        sure: !state.sure,
                      }))
                    }
                  >
                    {props.t('save')}
                  </Button>
                </div>
              )
            ) : null}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
