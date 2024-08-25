import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function UserReportDescModal(props) {
  const [state, setState] = useState({
    description: '',
    openSuccessModal: false,
  });

  const handleClose = () => {
    props.setState((prev) => ({
      ...prev,
      reportDescModal: false,
    }));
  };

  useEffect(() => {
    if (state.openSuccessModal) {
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  }, [state.openSuccessModal]);

  return (
    <Modal size='lg' show={props.state.reportDescModal} centered backdrop='static' className='pe-3'>
      <Modal.Body className='text-white report-black-insert'>
        {state.openSuccessModal ? (
          <div className='row d-flex justify-content-end'>
            <p className='fs-4 text-center mb-1'>{props.t('thanksForReport')}</p>
            <p className='fs-4 text-center mb-2'>{props.t('fastReportResponse')}</p>
            <div className='col-2 d-flex justify-content-end'>
              <Button
                name='en'
                variant='danger'
                size='sm'
                className='btn button p-2 px-4 fs-6'
                onClick={() => {
                  handleClose();
                }}
              >
                {props.t('close')}
              </Button>
            </div>
          </div>
        ) : (
          <div className='row'>
            <p className='fs-4 text-center'>{props.t('userReportCommentQuestion')}</p>
            <p className='fs-4 text-center'>{props.t('userReportCommentDesc')}</p>
            <Form.Group className='mb-3 mt-1 input_modal'>
              <Form.Label className='text-light fs-4'>{props.t('description')}: </Form.Label>
              <Form.Control
                as='textarea'
                name='description'
                aria-label='With textarea'
                value={state.description}
                className='report-desc-text-comment text-white report-black-insert'
                onChange={(e) => {
                  setState((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
              />
            </Form.Group>
            <div className='row d-flex justify-content-center'>
              <div className='col-2 d-flex justify-content-center'>
                <Button
                  name='en'
                  variant='danger'
                  size='sm'
                  className='btn button p-2 px-4 fs-6'
                  onClick={() => {
                    handleClose();
                  }}
                >
                  {props.t('cancel')}
                </Button>
              </div>
              <div className='col-2 d-flex justify-content-center'>
                <Button
                  name='en'
                  variant='success'
                  size='sm'
                  disabled={state.description.length < 20}
                  className='btn button p-2 px-4 fs-6'
                  onClick={() => {
                    props.sendLoggedUserReport({
                      json: {
                        type: 1,
                        additionalData: {
                          actionId: props.state.reportCommentId,
                          description: state.description,
                        },
                      },
                      setState: setState,
                    });
                  }}
                >
                  {props.t('send')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
