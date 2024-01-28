import React from 'react';
import AdminNotificationsGetUsersList from './AdminNotificationsGetUsersList';
import AdminNotificationsGetAudiobooksList from './AdminNotificationsGetAudiobooksList';
import AdminNotificationsGetCategoriesList from './AdminNotificationsGetCategoriesList';

export default function AdminNotificationsPickActionIdAddList(props) {
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
          <AdminNotificationsGetUsersList
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
          <AdminNotificationsGetAudiobooksList
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
          <AdminNotificationsGetCategoriesList
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
