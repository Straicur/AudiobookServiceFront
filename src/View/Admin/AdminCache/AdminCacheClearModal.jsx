import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

export const AdminCacheClearModal = (props) => {
  const { t } = useTranslation();

  const handleClose = () => {
    props.setModalState(!props.modalState);
  };

  return (
    <Modal show={props.modalState} backdrop='static'>
      <Modal.Body>{t('cacheClearedSuccesfuly')}</Modal.Body>
      <Modal.Footer>
        <Button variant='dark' onClick={() => handleClose()}>
          {t('accept')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
