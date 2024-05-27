import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTokenStore } from 'Store/store';
import { v4 as uuidv4 } from 'uuid';
import AuthenticationError from './Errors/AuthenticationError';
import InvalidJsonDataError from './Errors/InvalidJsonDataError';
import ServiceUnaviableError from './Errors/ServiceUnaviableError';
import DataNotFoundError from './Errors/DataNotFoundError';

export const NetworkErrorBoundryModal = ({ error, setError, onReset }) => {
  const { t } = useTranslation();
  const tokenStore = useTokenStore();
  const navigate = useNavigate();

  const [state, setState] = useState({
    show: true,
  });

  const handleClose = () => {
    if (onReset !== undefined) {
      onReset();
    }

    setError(null);

    setState((prev) => ({
      ...prev,
      show: !state.show,
    }));
  };

  function logout() {
    tokenStore.removeToken();
    setError(null);

    navigate('/login');
  }

  let errorMessage = '';
  let errorData = [];

  switch (true) {
    case error instanceof AuthenticationError:
      logout();
      break;
    case error instanceof InvalidJsonDataError:
      errorData = error.data;
      errorMessage = error.message;
      break;
    case error instanceof ServiceUnaviableError:
      errorMessage = error.message;
      break;
    case error instanceof DataNotFoundError:
      errorData = error.data;
      errorMessage = error.message;
      break;
    default:
      errorMessage = t('systemError');
  }

  return (
    <Modal show={state.show} backdrop='static'>
      <Modal.Body>
        <h3 className='text-center fw-bold py-3'> {errorMessage}</h3>
        {errorData != undefined
          ? errorData.map((element) => {
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
          onClick={() => {
            handleClose();
          }}
        >
          {t('accept')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
