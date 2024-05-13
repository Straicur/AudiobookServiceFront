import React from 'react';
import Button from 'react-bootstrap/Button';

export default function AdminAudiobookReAddButton(props) {
  const openReAddingModal = () => {
    props.setAudiobookState((prev) => ({
      ...prev,
      reAddingModal: !props.audiobookState.reAddingModal,
    }));
  };

  return props.audiobookState.reAdding ? (
    <div className='row justify-content-center'>
      <div className='col-4 mx-2'>
        <Button
          name='en'
          size='sm'
          className='btn button px-4 my-1 question_button success_button'
          onClick={openReAddingModal}
        >
          {props.t('yes')}
        </Button>
      </div>
      <div className='col-4 mx-2'>
        <Button
          name='en'
          size='sm'
          className='btn button px-4 my-1 question_button danger_button me-2'
          onClick={() =>
            props.setAudiobookState((prev) => ({
              ...prev,
              reAdding: !props.audiobookState.reAdding,
            }))
          }
        >
          {props.t('no')}
        </Button>
      </div>
    </div>
  ) : (
    <div className='row'>
      <Button
        name='en'
        size='sm'
        className='btn button px-4 my-1 audiobook_detail_modal_button warning_button'
        onClick={() =>
          props.setAudiobookState((prev) => ({
            ...prev,
            reAdding: !props.audiobookState.reAdding,
          }))
        }
      >
        {props.t('reAdding')}
      </Button>
    </div>
  );
}
