import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import ValidateUtil from 'Util/ValidateUtil';
import FormService from 'Service/Common/FormService';

export default function UserSettingsEditEmailModal(props) {
  const [state, setState] = useState({
    oldEmail: '',
    newEmail: '',
    code: '',
    codeReturned: '',
    codeStep: false,
    checkEmail: false,
    wrongEmail: false,
    wrongNewEmail: false,
  });

  const userService = new FormService(setState);

  const handleClose = () => {
    props.setState((prev) => ({
      ...prev,
      buttonEmail: !props.state.buttonEmail,
    }));
  };

  const changeEmail = (element) => {
    if (state.newEmail !== state.oldEmail) {
      element.target.classList.add('disabled');
      props.userEmailChange({
        element: element,
        setState: setState,
        state: state,
      });
    } else {
      setState((prev) => ({
        ...prev,
        wrongNewEmail: false,
      }));
    }
  };

  useEffect(() => {
    if (state.oldEmail.length === 0) {
      setState((prev) => ({
        ...prev,
        wrongEmail: false,
      }));
    } else if (!ValidateUtil.validateEmail(state.oldEmail)) {
      setState((prev) => ({
        ...prev,
        wrongEmail: true,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        wrongEmail: false,
      }));
    }
  }, [state.oldEmail]);

  useEffect(() => {
    if (state.newEmail.length === 0) {
      setState((prev) => ({
        ...prev,
        wrongNewEmail: false,
      }));
    } else if (!ValidateUtil.validateEmail(state.newEmail) || state.newEmail === state.email) {
      setState((prev) => ({
        ...prev,
        wrongNewEmail: true,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        wrongNewEmail: false,
      }));
    }
  }, [state.newEmail]);

  useEffect(() => {
    if (state.checkEmail) {
      setTimeout(function () {
        handleClose();
      }, 3000);
    }
  }, [state.checkEmail]);

  return (
    <Modal size='lg' show={props.state.buttonEmail} onHide={handleClose} backdrop='static' centered>
      <Modal.Body className='user-settings-modal-black-background'>
        <div className='text-white'>
          {state.checkEmail ? (
            <div className='fs-3 text-center my-3'>{props.t('checkEmail')}</div>
          ) : (
            <Form>
              {!state.codeStep ? (
                <>
                  <Form.Group className='mb-3'>
                    <Form.Label className='fs-3'>{props.t('oldEmail')}</Form.Label>
                    <Form.Control
                      type='email'
                      name='oldEmail'
                      placeholder='name@example.com'
                      isValid={
                        state.oldEmail.length > 1 && ValidateUtil.validateEmail(state.oldEmail)
                      }
                      isInvalid={
                        state.oldEmail.length > 1 && !ValidateUtil.validateEmail(state.oldEmail)
                      }
                      onChange={(event) => userService.handleChange(event)}
                    />
                    <Alert
                      show={state.wrongEmail}
                      className='dangerAllert mt-1 text-center'
                      variant='danger'
                    >
                      {props.t('enterValidEmail')}
                    </Alert>
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label className='fs-3'>{props.t('newEmail')}</Form.Label>
                    <Form.Control
                      type='email'
                      name='newEmail'
                      placeholder='name@example.com'
                      isValid={
                        state.newEmail.length > 1 && ValidateUtil.validateEmail(state.newEmail)
                      }
                      isInvalid={
                        (state.newEmail.length > 1 &&
                          !ValidateUtil.validateEmail(state.newEmail)) ||
                        state.newEmail === state.oldEmail
                      }
                      onChange={(event) => userService.handleChange(event)}
                    />
                  </Form.Group>
                  <Alert
                    show={state.wrongNewEmail}
                    className='dangerAllert mt-1 text-center'
                    variant='danger'
                  >
                    {props.t('enterValidEmail')}
                  </Alert>
                </>
              ) : (
                <Form.Group className='mb-3'>
                  <Form.Label className='fs-3'>{props.t('code')}</Form.Label>
                  <Form.Control
                    name='code'
                    value={state.code === undefined || state.code.length <= 0 ? '' : state.code}
                    onChange={(event) => userService.handleChange(event)}
                  />
                  <Alert
                    show={state.code !== state.codeReturned}
                    className='dangerAllert mt-1 text-center'
                    variant='danger'
                  >
                    {props.t('enterCode')}
                  </Alert>
                </Form.Group>
              )}
            </Form>
          )}

          <div className='row align-items-center justify-content-end'>
            <div className='col-2'>
              <Button
                name='en'
                size='sm'
                className='btn button danger_button settings-button fs-5'
                onClick={() => handleClose()}
              >
                {props.t('close')}
              </Button>
            </div>
            {!state.checkEmail ? (
              state.codeStep ? (
                <div className='col-2'>
                  <Button
                    name='en'
                    size='sm'
                    disabled={state.code !== state.codeReturned || state.code.length === 0}
                    className='btn button success_button settings-button fs-5'
                    onClick={(e) => changeEmail(e)}
                  >
                    {props.t('save')}
                  </Button>
                </div>
              ) : (
                <div className='col-2'>
                  <Button
                    name='en'
                    size='sm'
                    disabled={
                      state.wrongNewEmail ||
                      state.wrongEmail ||
                      state.oldEmail.length === 0 ||
                      state.newEmail.length === 0 ||
                      state.oldEmail === state.newEmail
                    }
                    className='btn button success_button settings-button fs-5'
                    onClick={() => {
                      setState((prev) => ({
                        ...prev,
                        codeStep: !state.codeStep,
                      }));
                      props.userEmailChangeCode({
                        state: state,
                        setState: setState,
                      });
                    }}
                  >
                    {props.t('send')}
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
