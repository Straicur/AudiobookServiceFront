import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function UserSettingsDeleteUserModal(props) {
  const [deleteSure, setDeleteSure] = useState(false);

  const handleClose = () => {
    props.setState((prev) => ({
      ...prev,
      buttonDelete: !props.state.buttonDelete,
    }));
  };

  return (
    <Modal
      size='lg'
      show={props.state.buttonDelete}
      onHide={handleClose}
      backdrop='static'
      centered
    >
      <Modal.Body
        style={{
          backgroundColor: '#262626',
        }}
      >
        <div className='text-white my-5'>
          <p className='fs-3 text-center'>{props.t('deleteMessage')}</p>
          <div className='row align-items-center row justify-content-center'>
            {deleteSure ? (
              <div className='row align-items-center row justify-content-center'>
                <p className='fs-4 text-center'>{props.t('areYouSure')}</p>
                <div className='col-3'>
                  <Button
                    name='en'
                    size='lg'
                    className='btn button px-4 my-1 question_button success_button'
                    onClick={() => props.userDelete()}
                  >
                    {props.t('yes')}
                  </Button>
                </div>
                <div className='col-3'>
                  <Button
                    name='en'
                    size='lg'
                    className='btn button px-4 my-1 question_button danger_button me-2'
                    onClick={(e) => handleClose(e)}
                  >
                    {props.t('no')}
                  </Button>
                </div>
              </div>
            ) : (
              <div className='row align-items-center row justify-content-center'>
                <div className='col-3'>
                  <Button
                    name='en'
                    size='lg'
                    className='btn button px-4 my-1 question_button success_button'
                    onClick={() => setDeleteSure(() => !deleteSure)}
                  >
                    {props.t('yes')}
                  </Button>
                </div>
                <div className='col-3'>
                  <Button
                    name='en'
                    size='lg'
                    className='btn button px-4 my-1 question_button danger_button me-2'
                    onClick={(e) => handleClose(e)}
                  >
                    {props.t('no')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
