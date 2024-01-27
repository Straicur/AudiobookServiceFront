import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import GetUsersList from './GetUsersList';
import GetAudiobooksList from './GetAudiobooksList';
import GetCategoriesList from './GetCategoriesList';

export default function PickActionIdList(props) {
  const [listState, setListState] = useState(1);

  const getUsersList = () => {
    if (!props.usersState.fetched) {
      props.setUsersState({
        ...props.usersState,
        fetch: !props.usersState.fetch,
      });
    }
    setListState(1);
  };

  const getAudiobooksList = () => {
    if (!props.audiobooksState.fetched) {
      props.setAudiobooksState({
        ...props.audiobooksState,
        fetch: !props.audiobooksState.fetch,
      });
    }
    setListState(2);
  };

  const getCategriesList = () => {
    if (!props.categoriesState.fetched) {
      props.setCategoriesState({
        ...props.categoriesState,
        fetch: !props.categoriesState.fetch,
      });
    }
    setListState(3);
  };

  const goBack = () => {
    props.setActionState({
      ...props.actionState,
      list: !props.actionState.list,
      actionIdChanged: !props.actionState.actionIdChanged,
    });
  };

  return (
    <div className='row'>
      <div className='row overflow-scroll pick_height'>
        {listState == 1 ? (
          <GetUsersList
            usersState={props.usersState}
            setUsersState={props.setUsersState}
            state={props.state}
            setState={props.setState}
            notificationsState={props.notificationsState}
            setNotificationsState={props.setNotificationsState}
            goBack={goBack}
            token={props.token}
            i18n={props.i18n}
            t={props.t}
          />
        ) : null}
        {listState == 2 ? (
          <GetAudiobooksList
            audiobooksState={props.audiobooksState}
            setAudiobooksState={props.setAudiobooksState}
            state={props.state}
            setState={props.setState}
            notificationsState={props.notificationsState}
            setNotificationsState={props.setNotificationsState}
            goBack={goBack}
            token={props.token}
            i18n={props.i18n}
            t={props.t}
          />
        ) : null}
        {listState == 3 ? (
          <GetCategoriesList
            categoriesState={props.categoriesState}
            setCategoriesState={props.setCategoriesState}
            state={props.state}
            setState={props.setState}
            notificationsState={props.notificationsState}
            setNotificationsState={props.setNotificationsState}
            goBack={goBack}
            token={props.token}
            t={props.t}
            i18n={props.i18n}
          />
        ) : null}
      </div>
      <div className='row justify-content-center'>
        <div className='col-2 align-self-center mx-2'>
          <Button
            name='en'
            variant='dark'
            size='sm'
            disabled={listState == 1}
            className='btn button mx-2'
            onClick={getUsersList}
          >
            {props.t('users')}
          </Button>
        </div>
        <div className='col-2 align-self-center mx-2'>
          <Button
            name='en'
            variant='dark'
            size='sm'
            disabled={listState == 2}
            className='btn button mx-2'
            onClick={getAudiobooksList}
          >
            {props.t('audiobooks')}
          </Button>
        </div>
        <div className='col-2 align-self-center mx-2'>
          <Button
            name='en'
            variant='dark'
            size='sm'
            disabled={listState == 3}
            className='btn button mx-2'
            onClick={getCategriesList}
          >
            {props.t('categories')}
          </Button>
        </div>
      </div>
    </div>
  );
}
