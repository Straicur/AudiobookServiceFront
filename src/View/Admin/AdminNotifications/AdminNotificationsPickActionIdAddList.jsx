import React from 'react';
import AdminNotificationsGetUsersList from './AdminNotificationsGetUsersList';
import AdminNotificationsGetAudiobooksList from './AdminNotificationsGetAudiobooksList';
import AdminNotificationsGetCategoriesList from './AdminNotificationsGetCategoriesList';
import { useAdminAudiobooksData } from 'Providers/Admin/AdminAudiobooksProvider';
import { useAdminUsersListData } from '../../../Providers/Admin/AdminUsersListProvider';
import { useAdminCategoriesListData } from 'Providers/Admin/AdminCategoriesListProvider';
import AdminRenderPageSwitches from '../Common/AdminRenderPageSwitches';

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
      <div className='row overflow-scroll pick_height'>
        {props.state.notificationType === 2 ? (
          <div>
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
            {users != null && users.maxPage > 1 ? (
              <AdminRenderPageSwitches
                page={props.notificationsUsersState.page}
                maxPage={users.maxPage}
                setPageState={props.setNotificationsUsersState}
              />
            ) : null}
          </div>
        ) : null}
        {props.state.notificationType === 5 ? (
          <div>
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
            {audiobooks != null && audiobooks.maxPage > 1 ? (
              <AdminRenderPageSwitches
                page={props.notificationsAudiobooksState.page}
                maxPage={audiobooks.maxPage}
                setPageState={props.setNotificationsAudiobooksState}
              />
            ) : null}
          </div>
        ) : null}
        {props.state.notificationType === 4 ? (
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
