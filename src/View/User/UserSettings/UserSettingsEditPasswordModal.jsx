import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import md5 from 'md5';
import ValidateUtil from 'Util/ValidateUtil';
import FormService from 'Service/Common/FormService';

export default function UserSettingsEditPasswordModal(props) {
  const [state, setState] = useState({
    oldPassword: '',
    newPassword: '',
    code: '',
    codeReturned: '',
    codeStep: false,
    newConfirmPassword: '',
    checkPassword: false,
    wrongOldPassword: false,
    wrongNewPassword: false,
    wrongNewConfirmPassword: false,
  });

  const userService = new FormService(setState);

  const handleClose = () => {
    props.setState((prev) => ({
      ...prev,
      buttonPassword: !props.state.buttonPassword,
    }));
  };

  const changePassword = (element) => {
    element.target.classList.add('disabled');

    if (state.oldPassword !== state.newPassword && state.newPassword === state.newConfirmPassword) {
      props.userPasswordChange({
        oldPassword: md5(state.oldPassword),
        newPassword: md5(state.newPassword),
        code: state.code,
        element: element,
        setState: setState,
        state: state,
      });
    } else {
      setState((prev) => ({
        ...prev,
        wrongNewConfirmPassword: true,
      }));
    }
  };

  useEffect(() => {
    if (
      state.newConfirmPassword.length >= 1 &&
      (!ValidateUtil.validatePassword(state.newConfirmPassword) ||
        state.newConfirmPassword.trim() !== state.newPassword.trim())
    ) {
      setState((prev) => ({
        ...prev,
        wrongNewConfirmPassword: true,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        wrongNewConfirmPassword: false,
      }));
    }

    if (
      state.newPassword.length >= 1 &&
      (!ValidateUtil.validatePassword(state.newPassword) ||
        state.oldPassword.trim() === state.newPassword.trim())
    ) {
      setState((prev) => ({
        ...prev,
        wrongNewPassword: true,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        wrongNewPassword: false,
      }));
    }

    if (state.oldPassword.length > 0 && state.oldPassword === state.newPassword) {
      setState((prev) => ({
        ...prev,
        wrongOldPassword: true,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        wrongOldPassword: false,
      }));
    }
  }, [state.newConfirmPassword, state.newPassword, state.oldPassword]);

  useEffect(() => {
    if (state.checkPassword) {
      setTimeout(function () {
        handleClose();
      }, 1000);
    }
  }, [state.checkPassword]);

  return (
    <Modal
      size='lg'
      show={props.state.buttonPassword}
      onHide={handleClose}
      backdrop='static'
      centered
    >
      <Modal.Body className='user-settings-modal-black-background'>
        <div className='text-white text-center'>
          {state.checkPassword ? (
            <div className='fs-3 my-3'>{props.t('checkPassword')}</div>
          ) : (
            <Form>
              {!state.codeStep ? (
                <>
                  <Form.Group className='mb-3'>
                    <Form.Label className='fs-3'>{props.t('oldPassword')}</Form.Label>
                    <Form.Control
                      type='password'
                      name='oldPassword'
                      placeholder={props.t('insertPassword')}
                      onChange={(event) => userService.handleChange(event)}
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label className='fs-3'>{props.t('newPassword')}</Form.Label>
                    <Form.Control
                      type='password'
                      name='newPassword'
                      placeholder={props.t('insertPassword')}
                      isValid={!state.wrongNewPassword}
                      isInvalid={state.wrongNewPassword || state.newPassword.length === 0}
                      onChange={(event) => userService.handleChange(event)}
                    />
                    <Alert
                      show={state.wrongNewPassword}
                      className='dangerAllert mt-1 text-center'
                      variant='danger'
                    >
                      {props.t('enterValidPassword')}
                    </Alert>
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label className='fs-3'>{props.t('newPassword')}</Form.Label>
                    <Form.Control
                      type='password'
                      name='newConfirmPassword'
                      placeholder={props.t('insertPasswordConfirm')}
                      isValid={!state.wrongNewConfirmPassword}
                      isInvalid={
                        state.wrongNewConfirmPassword || state.newConfirmPassword.length === 0
                      }
                      onChange={(event) => userService.handleChange(event)}
                    />
                    <Alert
                      show={state.wrongNewConfirmPassword}
                      className='dangerAllert mt-1 text-center'
                      variant='danger'
                    >
                      {props.t('enterValidPassword')}
                    </Alert>
                  </Form.Group>
                </>
              ) : (
                <Form.Group className='mb-3'>
                  <Form.Label className='fs-3'>
                    <p className='text-center'>{props.t('enterEmailCode')}</p>
                  </Form.Label>
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
          <div className='row align-items-center row justify-content-end'>
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
            {!state.checkPassword ? (
              state.codeStep ? (
                <div className='col-2'>
                  <Button
                    name='en'
                    size='sm'
                    disabled={state.code !== state.codeReturned || state.code.length === 0}
                    className='btn button success_button settings-button fs-5'
                    onClick={(e) => changePassword(e)}
                  >
                    {props.t('save')}
                  </Button>
                </div>
              ) : (
                <div className='col-2'>
                  <Button
                    name='en'
                    size='sm'
                    className='btn button success_button settings-button fs-5'
                    disabled={
                      state.wrongOldPassword ||
                      state.wrongNewPassword ||
                      state.wrongNewConfirmPassword ||
                      state.oldPassword.length === 0 ||
                      state.newPassword.length === 0 ||
                      state.oldPassword.trim() === state.newPassword.trim() ||
                      state.newConfirmPassword.length === 0
                    }
                    onClick={() => {
                      setState((prev) => ({
                        ...prev,
                        codeStep: !state.codeStep,
                      }));
                      props.userPasswordChangeCode({
                        state: state,
                        setState: setState,
                      });
                    }}
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
