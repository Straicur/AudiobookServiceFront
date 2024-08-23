import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useUserAudiobookSearch } from 'Providers/User/UserAudiobookSearchProvider';
import UserRenderAudiobooksList from './UserRenderAudiobooksList';

export default function UserAudiobooksListModal(props) {
  const [audiobooks] = useUserAudiobookSearch();

  const handleClose = () => {
    props.setReportState((prev) => ({
      ...prev,
      openAudiobooksList: !props.reportState.openAudiobooksList,
    }));
  };

  return (
    <Modal
      size='lg'
      show={props.reportState.openAudiobooksList}
      onHide={handleClose}
      backdrop='static'
    >
      <Modal.Body
        className='text-white'
        style={{
          backgroundColor: '#2b2b2b',
        }}
      >
        <p className='text-center fs-2'>{props.t('selectAudibook')}</p>
        <UserRenderAudiobooksList
          audiobooks={audiobooks}
          reportState={props.reportState}
          setReportState={props.setReportState}
          t={props.t}
          i18n={props.i18n}
          token={props.token}
        />
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
