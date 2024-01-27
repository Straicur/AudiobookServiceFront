import React from 'react';
import GetUsersList from './GetUsersList';
import GetAudiobooksList from './GetAudiobooksList';
import GetCategoriesList from './GetCategoriesList';

export default function PickActionIdAddList(props) {
  const goBack = () => {
    props.setActionState({
      ...props.actionState,
      list: !props.actionState.list,
      actionIdChanged: !props.actionState.actionIdChanged,
    });
  };

  return (
    <div className='row'>
      <div className='row'>
        {props.state.notificationType == 2 ? (
          <GetUsersList
            usersState={props.usersState}
            setUsersState={props.setUsersState}
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
        {props.state.notificationType == 5 ? (
          <GetAudiobooksList
            audiobooksState={props.audiobooksState}
            setAudiobooksState={props.setAudiobooksState}
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
        {props.state.notificationType == 4 ? (
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
    </div>
  );
}
