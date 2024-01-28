import React from 'react';
import Button from 'react-bootstrap/Button';
import { HandleFetch } from 'Util/HandleFetch';

export default function ReAddAudiobookButton(props) {
  const fetchCategoriesList = () => {
    if (props.dateUpdate > Date.now() && props.dateUpdate != 0) {
      props.setCategories(props.categories);
    } else {
      HandleFetch('/admin/categories', 'GET', null, props.token, props.i18n.language)
        .then((data) => {
          props.categoriesStore.removeCategories();
          for (const category of data.categories) {
            props.categoriesStore.addCategory(category);
          }

          props.setCategories(data.categories);
        })
        .catch((e) => {
          props.setAudiobookState({
            ...props.audiobooksState,
            error: e,
          });
        });
    }
  };

  const openReAddingModal = () => {
    fetchCategoriesList();

    props.setAudiobookState({
      ...props.audiobookState,
      reAddingModal: !props.audiobookState.reAddingModal,
    });
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
            props.setAudiobookState({
              ...props.audiobookState,
              reAdding: !props.audiobookState.reAdding,
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
        className='btn button px-4 my-1 audiobook_detail_modal_button warning_button'
        onClick={() =>
          props.setAudiobookState({
            ...props.audiobookState,
            reAdding: !props.audiobookState.reAdding,
          })
        }
      >
        {props.t('reAdding')}
      </Button>
    </div>
  );
}
