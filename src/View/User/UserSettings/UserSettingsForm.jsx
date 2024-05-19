import React from 'react';
import Button from 'react-bootstrap/Button';

export default function UserSettingsForm(props) {
  return (
    <div className='row mt-4'>
      <div className='row align-items-center justify-content-center my-2'>
        <Button
          name='en'
          size='sm'
          className='btn button success_button settings_button fs-5'
          onClick={() =>
            props.setState((prev) => ({
              ...prev,
              buttonEmail: !props.state.buttonEmail,
            }))
          }
        >
          {props.t('editEmail')}
        </Button>
      </div>
      <div className='row align-items-center justify-content-center my-2'>
        <Button
          name='en'
          size='sm'
          className='btn button success_button settings_button fs-5'
          onClick={() =>
            props.setState((prev) => ({
              ...prev,
              buttonPassword: !props.state.buttonPassword,
            }))
          }
        >
          {props.t('editPassword')}
        </Button>
      </div>
      <div className='row align-items-center justify-content-center my-2'>
        <Button
          name='en'
          size='sm'
          className='btn button success_button settings_button fs-5'
          onClick={() =>
            props.setState((prev) => ({
              ...prev,
              buttonUserData: !props.state.buttonUserData,
            }))
          }
        >
          {props.t('changeAccountData')}
        </Button>
      </div>
      <div className='row align-items-center justify-content-center my-2'>
        <Button
          name='en'
          size='sm'
          className='btn button danger_button settings_button fs-5'
          onClick={() =>
            props.setState((prev) => ({
              ...prev,
              buttonDelete: !props.state.buttonDelete,
            }))
          }
        >
          {props.t('deleteAccount')}
        </Button>
      </div>
    </div>
  );
}
