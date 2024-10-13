import React from 'react';
import Modal from 'react-bootstrap/Modal';
import CreateUtil from 'Util/CreateUtil';
import Button from 'react-bootstrap/Button';

export default function UserReportDetailModal(props) {
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
    props.setReportsState((prev) => ({
      ...prev,
      detailReportModal: !props.reportsState.detailReportModal,
    }));
  };

  return (
    <Modal
      size='lg'
      show={props.reportsState.detailReportModal}
      onHide={handleClose}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Body className='text-white report-modal-dark-backgrund'>
        <div className='container'>
          <div className='row mt-4'>
            <div className='col-7'>
              <div className='row'>
                <div className='row'>
                  <div className='col-2 fw-bold'>{props.t('type')}:</div>
                  <div className='col-2'>{createReportType(props.reportsState.report.type)}</div>
                </div>
                <div className='row mt-3'>
                  <div className='col-4 fw-bold'>{props.t('dateAdd')}:</div>
                  <div className='col'>
                    {' '}
                    {CreateUtil.createDateTime(props.reportsState.report.dateAdd)}
                  </div>
                </div>
              </div>
            </div>
            <div className='col'>
              <div className='row'>
                <div className='col-5 fw-bold'>{props.t('accepted')}:</div>
                <div className='col-2'>
                  {props.reportsState.report.accepted ? (
                    <i className='bi bi-bookmark-check-fill'></i>
                  ) : (
                    <i className='bi bi-bookmark-dash'></i>
                  )}
                </div>
              </div>
              <div className='row mt-3'>
                <div className='col-4 fw-bold'>{props.t('denied')}:</div>
                <div className='col-2'>
                  {props.reportsState.report.denied ? (
                    <i className='bi bi-bookmark-check-fill'></i>
                  ) : (
                    <i className='bi bi-bookmark-dash'></i>
                  )}
                </div>
              </div>
            </div>
            <div className='row mt-5'>
              <div className='col-4 fw-bold fs-5 mb-1'>{props.t('description')}</div>
              <div className='col text-wrap text-break'>
                {props.reportsState.report.description}
              </div>
            </div>
            <div className='row mt-3'>
              <hr />
              <div className='col-4 fw-bold fs-5 mb-1'>{props.t('answer')}</div>
              <div className='col text-wrap text-break'>
                {props.reportsState.report.answer === undefined ||
                props.reportsState.report.answer === null
                  ? props.t('noAnswer')
                  : props.reportsState.report.answer}
              </div>
            </div>
            {props.reportsState.report.comment !== undefined &&
            props.reportsState.report.comment !== null ? (
              <div className='row mt-3'>
                <hr />
                <div className='col-4 fw-bold fs-5 mb-1'>{props.t('comment')}</div>
                <div className='col text-wrap text-break'>{props.reportsState.report.comment}</div>
              </div>
            ) : null}
          </div>
        </div>
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
