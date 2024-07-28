import React from 'react';
import Button from 'react-bootstrap/Button';

export default function AdminAudiobookDeleteEntarlyButton(props) {
  return props.audiobookState.deleteEntarly ? (
    <div className='row justify-content-center'>
      <div className='col-4 mx-2'>
        <Button
          name='en'
          size='sm'
          className='btn button px-4 my-1 question_button success_button'
          onClick={() => {
            props.deleted.current = false;
            props.deleteAudiobook({
              audiobookId: props.audiobookDetail.id,
              deleted: props.deleted,
            });
          }}
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
              deleteEntarly: !props.audiobookState.deleteEntarly,
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
        className='btn button px-4 my-1 audiobook_detail_modal_button danger_button'
        onClick={() =>
          props.setAudiobookState((prev) => ({
            ...prev,
            deleteEntarly: !props.audiobookState.deleteEntarly,
          }))
        }
      >
        {props.t('deleteEntarly')}
      </Button>
    </div>
  );
}
