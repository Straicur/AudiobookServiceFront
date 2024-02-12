import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { HandleFetch } from 'Util/HandleFetch';
import Alert from 'react-bootstrap/Alert';
import ValidateUtil from 'Util/ValidateUtil';
import FormService from 'Service/Common/FormService';

export default function UserSettingsEditEmailModal(props) {
  const [state, setState] = useState({
    oldEmail: '',
    newEmail: '',
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
    if (state.newEmail != state.oldEmail) {
      element.target.classList.add('disabled');

      HandleFetch(
        '/user/settings/email',
        'POST',
        {
          newEmail: state.newEmail,
          oldEmail: state.oldEmail,
        },
        props.token,
        props.i18n.language,
      )
        .then(() => {
          element.target.classList.remove('disabled');
          setState((prev) => ({
            ...prev,
            checkEmail: !state.checkEmail,
          }));
        })
        .catch((e) => {
          props.setState((prev) => ({
            ...prev,
            error: e,
          }));
        });
    } else {
      setState((prev) => ({
        ...prev,
        wrongNewEmail: false,
      }));
    }
  };

  useEffect(() => {
    if (state.oldEmail.length == 0) {
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
    if (state.newEmail.length == 0) {
      setState((prev) => ({
        ...prev,
        wrongNewEmail: false,
      }));
    } else if (!ValidateUtil.validateEmail(state.newEmail)) {
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
    if (props.state.error != null) {
      throw props.state.error;
    }
  }, [props.state.error]);

  return (
    <Modal size='lg' show={props.state.buttonEmail} onHide={handleClose} backdrop='static' centered>
      <Modal.Body
        style={{
          backgroundColor: '#262626',
        }}
      >
        <div className='text-white'>
          {state.checkEmail ? (
            <div className='fs-3 text-center my-3'>{props.t('checkEmail')}</div>
          ) : (
            <Form>
              <Form.Group className='mb-3'>
                <Form.Label>{props.t('oldEmail')}</Form.Label>
                <Form.Control
                  type='email'
                  name='oldEmail'
                  placeholder='name@example.com'
                  isValid={state.oldEmail.length > 1 && ValidateUtil.validateEmail(state.oldEmail)}
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
                <Form.Label>{props.t('newEmail')}</Form.Label>
                <Form.Control
                  type='email'
                  name='newEmail'
                  placeholder='name@example.com'
                  isValid={state.newEmail.length > 1 && ValidateUtil.validateEmail(state.newEmail)}
                  isInvalid={
                    state.newEmail.length > 1 && !ValidateUtil.validateEmail(state.newEmail)
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
              <div className='col-2'>
                <Button
                  name='en'
                  size='sm'
                  disabled={
                    state.wrongNewEmail ||
                    state.wrongEmail ||
                    state.oldEmail.length == 0 ||
                    state.newEmail.length == 0
                  }
                  className='btn button success_button settings-button fs-5'
                  onClick={(e) => changeEmail(e)}
                >
                  {props.t('save')}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
