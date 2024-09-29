import React from 'react';
import Button from 'react-bootstrap/Button';

export default function AdminAudiobookDeleteEntirelyButton(props) {
  return props.audiobookState.deleteEntirely ? (
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
              deleteEntirely: !props.audiobookState.deleteEntirely,
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
            deleteEntirely: !props.audiobookState.deleteEntirely,
          }))
        }
      >
        {props.t('deleteEntirely')}
      </Button>
    </div>
  );
}
