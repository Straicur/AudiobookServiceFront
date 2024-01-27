import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const RegisterNotificationModal = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/login');
  };

  return (
    <>
      <Modal
        show={true}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Body className=''>
          <h3>{t('mailSended')}</h3>
        </Modal.Body>
        <Modal.Footer className=''>
          <Button variant='dark' className='btn' onClick={handleClose}>
            {t('close')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
