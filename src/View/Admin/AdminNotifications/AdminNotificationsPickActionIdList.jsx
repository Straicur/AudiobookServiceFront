import React from 'react';
import Button from 'react-bootstrap/Button';
import AdminNotificationsGetUsersList from './AdminNotificationsGetUsersList';
import AdminNotificationsGetAudiobooksList from './AdminNotificationsGetAudiobooksList';
import AdminNotificationsGetCategoriesList from './AdminNotificationsGetCategoriesList';
import { useAdminAudiobooksData } from 'Providers/Admin/AdminAudiobooksProvider';
import { useAdminUsersListData } from '../../../Providers/Admin/AdminUsersListProvider';
import { useAdminCategoriesListData } from 'Providers/Admin/AdminCategoriesListProvider';
import AdminRenderPageSwitches from '../Common/AdminRenderPageSwitches';

export default function AdminNotificationsPickActionIdList(props) {
  const [users] = useAdminUsersListData();
  const [categories] = useAdminCategoriesListData();
  const [audiobooks] = useAdminAudiobooksData();

  const getUsersList = () => {
    if (!props.usersState.fetched) {
      props.setUsersState((prev) => ({
        ...prev,
        fetch: !props.usersState.fetch,
      }));
    }
    props.setListState(1);
  };

  const getAudiobooksList = () => {
    if (!props.audiobooksState.fetched) {
      props.setAudiobooksState((prev) => ({
        ...prev,
        fetch: !props.audiobooksState.fetch,
      }));
    }
    props.setListState(2);
  };

  const getCategoriesList = () => {
    if (!props.categoriesState.fetched) {
      props.setCategoriesState((prev) => ({
        ...prev,
        fetch: !props.categoriesState.fetch,
      }));
    }
    props.setListState(3);
  };

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
        {props.listState === 1 ? (
          <div>
            <AdminNotificationsGetUsersList
              usersState={props.usersState}
              setUsersState={props.setUsersState}
              users={users}
              state={props.state}
              setState={props.setState}
              notificationsState={props.notificationsState}
              setNotificationsState={props.setNotificationsState}
              goBack={goBack}
              token={props.token}
              i18n={props.i18n}
              t={props.t}
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
        {props.listState === 2 ? (
          <div>
            <AdminNotificationsGetAudiobooksList
              audiobooksState={props.audiobooksState}
              setAudiobooksState={props.setAudiobooksState}
              state={props.state}
              setState={props.setState}
              notificationsState={props.notificationsState}
              setNotificationsState={props.setNotificationsState}
              goBack={goBack}
              audiobooks={audiobooks}
              token={props.token}
              i18n={props.i18n}
              t={props.t}
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
        {props.listState === 3 ? (
          <AdminNotificationsGetCategoriesList
            categoriesState={props.categoriesState}
            setCategoriesState={props.setCategoriesState}
            state={props.state}
            setState={props.setState}
            notificationsState={props.notificationsState}
            setNotificationsState={props.setNotificationsState}
            goBack={goBack}
            categories={categories}
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
            disabled={props.listState === 1}
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
            disabled={props.listState === 2}
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
            disabled={props.listState === 3}
            className='btn button mx-2'
            onClick={getCategoriesList}
          >
            {props.t('categories')}
          </Button>
        </div>
      </div>
    </div>
  );
}
