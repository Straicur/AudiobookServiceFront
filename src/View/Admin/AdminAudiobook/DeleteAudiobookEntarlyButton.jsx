import React from 'react';
import Button from 'react-bootstrap/Button';
import { HandleFetch } from '../../../Util/HandleFetch';
import { useNavigate } from 'react-router-dom';

export default function DeleteAudiobookEntarlyButton(props) {
  const navigate = useNavigate();

  const deleteAudiobookEntarly = () => {
    HandleFetch(
      '/admin/audiobook/delete',
      'DELETE',
      {
        audiobookId: props.audiobookDetail.id,
      },
      props.token,
      props.i18n.language
    )
      .then(() => {
        navigate(`/admin/audiobooks`);
      })
      .catch((e) => {
        props.setAudiobookState({
          ...props.audiobookState,
          error: e,
        });
      });
  };

  return props.audiobookState.deleteEntarly ? (
    <div className='row justify-content-center'>
      <div className='col-4 mx-2'>
        <Button
          name='en'
          size='sm'
          className='btn button px-4 my-1 question_button success_button'
          onClick={deleteAudiobookEntarly}
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
            props.setAudiobookState({
              ...props.audiobookState,
              deleteEntarly: !props.audiobookState.deleteEntarly,
            })
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
          props.setAudiobookState({
            ...props.audiobookState,
            deleteEntarly: !props.audiobookState.deleteEntarly,
          })
        }
      >
        {props.t('deleteEntarly')}
      </Button>
    </div>
  );
}
