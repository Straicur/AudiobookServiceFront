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
import UserDeletedError from './Errors/UserDeletedError';

export const NetworkErrorBoundryModal = ({ error, setError, onReset }) => {
  const { t } = useTranslation();
  const tokenStore = useTokenStore();
  const navigate = useNavigate();

  const [stateErrorBoundry, setErrorBoundryState] = useState({
    show: true,
  });

  const handleClose = () => {
    if (onReset !== undefined) {
      onReset();
    }

    setError(null);

    setErrorBoundryState((prev) => ({
      ...prev,
      show: !stateErrorBoundry.show,
    }));
  };

  function logout() {
    tokenStore.removeToken();
    setError(null);

    navigate('/login');
  }

  function technicalBreak() {
    tokenStore.removeToken();
    setError(null);

    navigate('/technicalBreak');
  }

  let errorMessage = '';
  let errorData = [];

  switch (true) {
    case error instanceof AuthenticationError || error instanceof UserDeletedError:
      logout();
      break;
    case error instanceof InvalidJsonDataError || error instanceof DataNotFoundError:
      errorData = error.data;
      errorMessage = error.message;
      break;
    case error instanceof ServiceUnaviableError:
      errorMessage = error.message;
      technicalBreak();
      break;
    default:
      errorData = error.data;
      errorMessage = error.message;
  }

  return (
    <Modal show={stateErrorBoundry.show} backdrop='static'>
      <Modal.Body>
        <h3 className='text-center fw-bold py-3'> {errorMessage}</h3>
        {errorData !== undefined
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
