import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import InvalidDataError from './Errors/InvalidDataError';
import SystemError from './Errors/SystemError';
import ValidationError from './Errors/ValidationError';
import InvalidJsonDataError from './Errors/InvalidJsonDataError';
import ServiceUnaviableError from './Errors/ServiceUnaviableError';
import DataNotFoundError from './Errors/DataNotFoundError';

export const ErrorHandlerModal = ({ error }) => {
  const { t } = useTranslation();

  const [state, setState] = useState({
    show: true,
  });

  const handleClose = () => {
    setState((prev) => ({
      ...prev,
      show: !state.show,
    }));

    window.location.reload();
  };

  let errorMessage = '';
  let errorData = [];

  switch (true) {
    case error instanceof InvalidJsonDataError ||
      error instanceof ValidationError ||
      error instanceof DataNotFoundError ||
      error instanceof InvalidDataError:
      errorData = error.data;
      errorMessage = error.message;
      break;
    case error instanceof SystemError || error instanceof ServiceUnaviableError:
      errorMessage = error.message;
      break;
    default:
      errorMessage = t('systemError');
  }

  return (
    <Modal show={state.show} backdrop='static'>
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
        <Button variant='dark' onClick={() => handleClose()}>
          {t('accept')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
