import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

export const AdminCacheClearModal = (props) => {
  const { t } = useTranslation();

  const handleClose = () => {
    props.setModalState(!props.modalState.show);
  };

  return (
    <Modal show={props.modalState} backdrop='static' centered>
      <Modal.Body>
        <h3 className='text-center my-3 mx-2'>{t(props.modalState.text)}</h3>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='dark' onClick={() => handleClose()}>
          {t('accept')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
