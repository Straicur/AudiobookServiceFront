import React, { useLayoutEffect, useState } from 'react';
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
    message: '',
    data: [],
    show: true,
    notAuthenticated: false,
  });

  const handleClose = () => {
    console.log('dscxzcxza');
    setState((prev) => ({
      ...prev,
      show: !state.show,
    }));
  };

  useLayoutEffect(() => {
    switch (error) {
      case error instanceof InvalidJsonDataError:
        setState({ ...state, data: error.data, message: error.message });
        break;
      case error instanceof ValidationError:
        setState({ ...state, data: error.data, message: error.message });
        break;
      case error instanceof SystemError:
        setState({ ...state, message: error.message });
        break;
      case error instanceof ServiceUnaviableError:
        setState({ ...state, message: error.message });
        break;
      case error instanceof DataNotFoundError:
        setState({ ...state, data: error.data, message: error.message });
        break;
      case error instanceof InvalidDataError:
        setState({ ...state, data: error.data, message: error.message });
        break;
      default: {
        setState({ ...state, message: t('systemError') });
        break;
      }
    }
  }, [error]);

  return (
    <Modal show={state.show} backdrop='static'>
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
        <Button variant='dark' onClick={() => handleClose()}>
          {t('accept')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
