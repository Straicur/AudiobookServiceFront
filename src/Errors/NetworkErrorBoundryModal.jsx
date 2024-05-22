import React, { useLayoutEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTokenStore } from 'Store/store';
import { v4 as uuidv4 } from 'uuid';
import { networkErrorAtom } from 'App';
import AuthenticationError from './Errors/AuthenticationError';
import { useAtom } from 'jotai';

export const NetworkErrorBoundryModal = ({ error }) => {
  const { t } = useTranslation();
  const [errorAtomState, setErrorAtomState] = useAtom(networkErrorAtom);
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

    if (errorAtomState !== null) {
      setErrorAtomState(null);
    }

    navigate('/login');
  }

  function reloadFunction() {
    window.location.reload();
  }

  useLayoutEffect(() => {
    if (error instanceof AuthenticationError) {
      logout();
    } else {
      setState((prev) => ({
        ...prev,
        data: error.data,
        message: error.message,
      }));
    }
    //TODO TU dorób reportowanie potem
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
          onClick={() => {
            reloadFunction();
          }}
        >
          {t('accept')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
