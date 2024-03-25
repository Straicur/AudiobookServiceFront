import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { HandleFetch } from 'Util/HandleFetch';
import ValidateUtil from 'Util/ValidateUtil';
import FormService from 'Service/Common/FormService';

export const UserLoginForgotPasswordModal = (props) => {
  const [state, setState] = useState({
    email: '',
    isButtonDisabled: false,
    send: false,
  });

  const userService = new FormService(setState);

  const handleSend = async () => {
    if (state.email) {
      const url = '/user/reset/password';
      const jsonData = { email: state.email };
      const method = 'POST';

      HandleFetch(url, method, jsonData, props.i18n.language)
        .then((data) => {
          if (data) {
            setState((prev) => ({
              ...prev,
              send: !state.send,
            }));

            setTimeout(function () {
              handleClose();
            }, 3000);
          }
        })
        .catch((e) => {
          props.setState((prev) => ({
            ...prev,
            error: e,
          }));
          handleClose();
        });
    }
  };

  const handleClose = () =>
    props.setFormState((prev) => ({
      ...prev,
      modal: !props.formState.modal,
    }));

  useEffect(() => {
    if (state.email.trim()) {
      if (ValidateUtil.validateEmail(state.email)) {
        setState((prev) => ({
          ...prev,
          isButtonDisabled: false,
        }));
      }
    } else {
      setState((prev) => ({
        ...prev,
        isButtonDisabled: true,
      }));
    }
  }, [state.email]);

  return (
    <Modal show={props.formState.modal} onHide={handleClose} backdrop='static'>
      <Modal.Header>
        <Modal.Title> {props.t('changePassword')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {state.send ? (
          <h4 className='text-center'>{props.t('checkEmail')}</h4>
        ) : (
          <input
            id='email'
            type='email'
            name='email'
            placeholder={props.t('insertEmail')}
            value={state.email}
            className='form-control mt-2 shadow'
            onChange={(e) => {
              userService.handleChange(e);
            }}
          />
        )}
      </Modal.Body>
      <Modal.Footer className=''>
        {state.send ? (
          <Button variant='dark' onClick={handleClose}>
            {props.t('close')}
          </Button>
        ) : (
          <div>
            <Button
              variant='dark'
              disabled={state.isButtonDisabled}
              className='auth-btn me-2'
              onClick={handleSend}
            >
              {props.t('sendEmail')}
            </Button>
            <Button className='ms-2' variant='dark' onClick={handleClose}>
              {props.t('cancel')}
            </Button>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
};
