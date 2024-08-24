import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function UserReportSuccessSendModal(props) {
  const handleClose = () => {
    props.setReportState((prev) => ({
      ...prev,
      openSuccessModal: !props.reportState.openSuccessModal,
    }));
  };

  return (
    <Modal
      size='lg'
      show={props.reportState.openSuccessModal}
      onHide={handleClose}
      backdrop='static'
    >
      <Modal.Body
        className='text-white'
        style={{
          backgroundColor: '#2b2b2b',
        }}
      >
        <p className='text-center fs-3'>{props.t('thanksForReport')}</p>
        <hr />
        <p className='text-center fs-4'>{props.t('fastReportResponse')}</p>
        <p className='text-center fs-4'>{props.t('youReciveResponse')}</p>
        <div className='row mt-3 justify-content-center'>
          <div className='col-7 align-self-center'>
            <Button
              variant='success'
              onClick={() => handleClose()}
              className='detail-button text-center'
            >
              {props.t('close')}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
