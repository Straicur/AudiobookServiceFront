import React, { useLayoutEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function UserSettingsDeleteUserModal(props) {
  const handleClose = () => {
    props.setState((prev) => ({
      ...prev,
      buttonDelete: !props.state.buttonDelete,
    }));
  };

  useLayoutEffect(() => {
    if (props.state.error != null) {
      throw props.state.error;
    }
  }, [props.state.error]);

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
          <p className='fs-4 text-center'>{props.t('areYouSure')}</p>
          <div className='row align-items-center row justify-content-center'>
            <div className='col-2'>
              <Button
                name='en'
                size='sm'
                className='btn button success_button settings-button fs-5 sure_button'
                onClick={() => props.userDelete()}
              >
                {props.t('yes')}
              </Button>
            </div>
            <div className='col-2'>
              <Button
                name='en'
                size='sm'
                className='btn button danger_button settings-button fs-5 sure_button'
                onClick={(e) => handleClose(e)}
              >
                {props.t('no')}
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
