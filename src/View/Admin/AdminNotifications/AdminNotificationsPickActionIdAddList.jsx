import React from 'react';
import AdminNotificationsGetUsersList from './AdminNotificationsGetUsersList';
import AdminNotificationsGetAudiobooksList from './AdminNotificationsGetAudiobooksList';
import AdminNotificationsGetCategoriesList from './AdminNotificationsGetCategoriesList';
import { useAdminAudiobooksData } from 'Providers/Admin/AdminAudiobooksProvider';
import { useAdminUsersListData } from 'Providers/Admin/AdminUsersListPrivider';
import { useAdminCategoriesListData } from 'Providers/Admin/AdminCategoriesListProvider';

export default function AdminNotificationsPickActionIdAddList(props) {
  const [users] = useAdminUsersListData();
  const [categories] = useAdminCategoriesListData();
  const [audiobooks] = useAdminAudiobooksData();

  const goBack = () => {
    props.setActionState((prev) => ({
      ...prev,
      list: !props.actionState.list,
      actionIdChanged: !props.actionState.actionIdChanged,
    }));
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
            users={users}
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
            audiobooks={audiobooks}
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
            categories={categories}
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
