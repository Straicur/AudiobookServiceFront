import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './AdminJsonModal.css';

export default function AdminJsonModal(props) {
  const handleClose = () => {
    props.setState({
      ...props.state,
      jsonModal: !props.state.jsonModal,
    });
  };

  const format = () => {
    return (
      <div>
        <pre className='preStyle overflow-auto '>{JSON.stringify(props.state.json, null, 2)}</pre>
      </div>
    );
  };
  return (
    <Modal size='lg' show={props.state.jsonModal} onHide={handleClose} backdrop='static'>
      <Modal.Header closeButton>
        <Modal.Title>{props.t('jsonData')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='background_json'>{format()}</Modal.Body>
      <Modal.Footer>
        <Button variant='dark' onClick={handleClose}>
          {props.t('close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
