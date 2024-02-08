import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTokenStore } from 'Store/store';
import { v4 as uuidv4 } from 'uuid';

export const ErrorHandlerModal = ({ error, resetErrorBoundary }) => {
  const { t } = useTranslation();

  const tokenStore = useTokenStore();
  const navigate = useNavigate();

  const [state, setState] = useState({
    message: '',
    data: [],
    show: true,
    notAuthenticated: false,
  });

  const handleClose = () =>
    setState((prev) => ({
      ...prev,
      show: !state.show,
    }));

  function logout() {
    tokenStore.removeToken();

    navigate('/login');
  }

  function reloadFunction() {
    window.location.reload(false);
  }

  useEffect(() => {
    switch (error.name) {
      case 'InvalidJsonDataError':
        setState((prev) => ({
          ...prev,
          data: error.data,
          message: error.message,
        }));
        break;
      case 'ValidationError':
        setState((prev) => ({
          ...prev,
          data: error.data,
          message: error.message,
        }));
        break;
      case 'SystemError':
        setState((prev) => ({
          ...prev,
          message: error.message,
        }));
        break;
      case 'ServiceUnaviableError':
        setState((prev) => ({
          ...prev,
          message: error.message,
        }));
        break;
      case 'PermissionError':
        setState((prev) => ({
          ...prev,
          message: error.message,
        }));
        break;
      case 'DataNotFoundError':
        setState((prev) => ({
          ...prev,
          data: error.data,
          message: error.message,
        }));
        break;
      case 'InvalidDataError':
        setState((prev) => ({
          ...prev,
          data: error.data,
          message: error.message,
        }));
        break;
      case 'AuthenticationError':
        setState((prev) => ({
          ...prev,
          message: error.message,
          notAuthenticated: true,
        }));
        break;
      default: {
        setState((prev) => ({
          ...prev,
          message: t('systemError'),
        }));
        break;
      }
    }
  }, [error]);

  return (
    <Modal show={state.show} onHide={handleClose} backdrop='static'>
      <Modal.Body>
        <h3 className='text-center fw-bold py-3'> {t('errorOccurred')}</h3>
        {state.data != undefined
          ? state.data.map((element) => {
              return (
                <p key={uuidv4()} className='text-center pb-1 fs-5'>
                  {element}
                </p>
              );
            })
          : null}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='dark'
          onClick={
            state.notAuthenticated
              ? logout()
              : resetErrorBoundary != null
              ? resetErrorBoundary
              : reloadFunction()
          }
        >
          {t('accept')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
