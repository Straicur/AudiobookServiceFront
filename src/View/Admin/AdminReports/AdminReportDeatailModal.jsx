import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import CreateUtil from 'Util/CreateUtil';

export default function AdminReportDeatailModal(props) {
  const [actionState, setActionState] = useState({
    banPeriod: null,
    answer: '',
  });

  const createReportType = (element) => {
    switch (element) {
      case 1: {
        return props.t('reportTypeComment');
      }
      case 2: {
        return props.t('reportTypeAudiobook');
      }
      case 3: {
        return props.t('reportTypeCategory');
      }
      case 4: {
        return props.t('reportTypeSystem');
      }
      case 5: {
        return props.t('reportTypeUser');
      }
      case 6: {
        return props.t('reportTypeSettings');
      }
      case 7: {
        return props.t('reportTypeRecruitment');
      }
      case 8: {
        return props.t('reportTypeOther');
      }
    }
  };

  const handleClose = () => {
    props.setReportState((prev) => ({
      ...prev,
      detailReportModal: !props.reportState.detailReportModal,
    }));

    props.setReportsState((prev) => ({
      ...prev,
      refresh: true,
    }));
  };

  return (
    <Modal
      size='lg'
      show={props.reportState.detailReportModal}
      onHide={handleClose}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>{props.t('reportDetail')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <div>{props.reportState.id}</div>
              <div>{props.reportState.email}</div>
              <div>{props.reportState.actionId}</div>
              <div>{props.reportState.description}</div>
              <div>{props.reportState.ip}</div>
              <div>{CreateUtil.createDateTime(props.reportState.dateAdd)}</div>
            </div>
            <div className='col'>
              {createReportType(props.reportState.type)}
              <div>
                {props.reportState.accepted ? (
                  <i className='bi bi-bookmark-check-fill'></i>
                ) : (
                  <i className='bi bi-bookmark-dash'></i>
                )}
              </div>
              <div>
                {props.reportState.denied ? (
                  <i className='bi bi-bookmark-check-fill'></i>
                ) : (
                  <i className='bi bi-bookmark-dash'></i>
                )}
              </div>
              <div>
                {props.reportState.user ? (
                  <i className='bi bi-bookmark-check-fill'></i>
                ) : (
                  <i className='bi bi-bookmark-dash'></i>
                )}
              </div>
            </div>
            <div className='row'>
              Detale użytkownika
              <div className='row'>
                {props.reportState.user === null ? (
                  'Nie jest w systemie'
                ) : (
                  <div className='row'>
                    <div className='col'>
                      <div className='row'>
                        {props.reportState.user.active ? (
                          <i className='bi bi-bookmark-check-fill'></i>
                        ) : (
                          <i className='bi bi-bookmark-dash'></i>
                        )}
                      </div>
                      <div className='row'>
                        {props.reportState.user.banned ? (
                          <i className='bi bi-bookmark-check-fill'></i>
                        ) : (
                          <i className='bi bi-bookmark-dash'></i>
                        )}
                      </div>
                      <div className='row'>{props.reportState.user.email}</div>
                    </div>
                    <div className='col'>
                      <div className='row'>{props.reportState.user.firstname}</div>
                      <div className='row'>{props.reportState.user.lastname}</div>
                      <div className='row'>{props.reportState.user.id}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <InputGroup className='mt-2 input_modal'>
              <InputGroup.Text>
                {props.t('answer')} ({props.t('optional')})
              </InputGroup.Text>
              <Form.Control
                as='textarea'
                name='answer'
                aria-label='With textarea'
                value={
                  props.reportState.accepted || props.reportState.denied
                    ? props.reportState.answer === null
                      ? ''
                      : props.reportState.answer
                    : actionState.answer
                }
                disabled={props.reportState.accepted || props.reportState.denied}
                onChange={(e) => {
                  setActionState((prev) => ({
                    ...prev,
                    answer: e.target.value,
                  }));
                }}
              />
            </InputGroup>
          </div>
          <div className='row justify-content-center mx-5 mt-2'>
            <div className='col-4'>
              <Button
                name='en'
                variant='success'
                size='sm'
                className='btn button p-2 px-5 fs-6'
                disabled={props.reportState.accepted || props.reportState.denied}
                onClick={() => {
                  // {
                  //   banPeriod: banPeriod,
                  // },
                  //TODO tu potrzeba logiki związanej z banami i odpowiedziami
                  let json = {
                    reportId: props.reportState.id,
                    answer: actionState.answer,
                  };

                  props.acceptReport({
                    json: json,
                  }),
                    handleClose();
                }}
              >
                {props.t('accept')}
              </Button>
            </div>
            <div className='col-4'>
              <Button
                name='en'
                variant='danger'
                size='sm'
                className='btn button p-2 px-5 fs-6'
                disabled={props.reportState.accepted || props.reportState.denied}
                onClick={() => {
                  console.log('dsa');
                  props.rejectReport({
                    reportId: props.reportState.id,
                    answer: actionState.answer,
                  });
                  handleClose();
                }}
              >
                {props.t('reject')}
              </Button>
            </div>
            <div className='col-4'>
              <Button
                name='en'
                variant='dark'
                size='sm'
                className='btn button p-2 px-5 fs-6'
                onClick={() => {
                  handleClose();
                }}
              >
                {props.t('close')}
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
