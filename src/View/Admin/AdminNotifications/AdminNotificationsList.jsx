import React, { useEffect, useState } from 'react';
import AdminNavBarProviders from '../AdminNavBar/AdminNavBarProviders';
import Button from 'react-bootstrap/Button';
import AdminJsonModal from '../AdminJsonModal/AdminJsonModal';
import AdminNotificationsAddModal from './AdminNotificationsAddModal';
import AdminNotificationsEditModal from './AdminNotificationsEditModal';
import AdminNotificationsSearchOffCanvas from './AdminNotificationsSearchOffCanvas';
import AdminNotificationsRenderList from './AdminNotificationsRenderList';
import AdminRenderPageSwitches from '../Common/AdminRenderPageSwitches';
import AdminNotificationsService from 'Service/Admin/AdminNotificationsService';
import { useAdminSystemRoles } from 'Providers/Admin/AdminSystemRolesProvider';
import { useAdminNotificationsData } from 'Providers/Admin/AdminNotificationsProvider';

export default function AdminNotificationsList(props) {
  const [state, setState] = useState({
    jsonModal: false,
    json: null,
    addNotificationModal: false,
    editNotificationElement: null,
    searchModal: false,
    refresh: false,
    error: null,
  });

  const [audiobooksState, setAudiobooksState] = useState({
    audiobooks: [],
    fetched: false,
    fetch: false,
  });

  const [categoriesState, setCategoriesState] = useState({
    categories: [],
    fetched: false,
    fetch: false,
  });

  const [usersState, setUsersState] = useState({
    users: [],
    fetched: false,
    fetch: false,
  });

  const [notificationState, setNotificationState] = useState({
    actionId: '',
    dateAdd: 0,
    delete: false,
    id: '',
    notificationType: 0,
    text: '',
    userType: 0,
    editNotificationkModal: false,
  });

  const [userRoles] = useAdminSystemRoles();
  const [notifications] = useAdminNotificationsData();

  const adminService = new AdminNotificationsService(
    props,
    props.searchState,
    props.setSearchState,
    state,
    setState,
  );

  useEffect(() => {
    if (state.refresh) {
      setState((prev) => ({
        ...prev,
        refresh: !state.refresh,
      }));
      // refetch();
    }
  }, [state.refresh]);

  useEffect(() => {
    if (props.notificationsState.error != null) {
      throw props.notificationsState.error;
    }
  }, [props.notificationsState.error]);

  return (
    <div className='container-fluid main-container mt-3'>
      <div className='card position-relative p-3 mb-5  shadow'>
        <AdminNavBarProviders token={props.token} />
        <hr className='line' />
        <div className='table-title my-2'>
          <div className='d-flex justify-content-end '>
            <div className='p-2 bd-highlight'>
              <h2>{props.t('filters')}</h2>
            </div>
            <div className='p-2 bd-highlight'>
              <Button
                variant='dark'
                size='sm'
                color='dark'
                className=' btn button mt-2'
                onClick={() => adminService.openSearchModal()}
              >
                {props.t('search')}
              </Button>
            </div>
          </div>
          <AdminNotificationsRenderList
            state={state}
            setState={setState}
            t={props.t}
            token={props.token}
            notifications={notifications}
            notificationsState={props.notificationsState}
            setNotificationsState={props.setNotificationsState}
            notificationState={notificationState}
            setNotificationState={setNotificationState}
            roles={userRoles}
          />
          {state.json != null && notifications.maxPage > 1 ? (
            <AdminRenderPageSwitches
              page={props.notificationsState.page}
              maxPage={notifications.maxPage}
              setPageState={props.setNotificationsState}
            />
          ) : null}
        </div>
        <div className='row justify-content-md-center'>
          <div className='col-3 d-flex justify-content-center'>
            <Button
              variant='dark'
              size='lg'
              color='dark'
              className=' btn button mt-2'
              onClick={() => adminService.openAddModal()}
            >
              {props.t('addNotification')}
            </Button>
          </div>
          <div className='col-3 d-flex justify-content-center'>
            <Button
              variant='dark'
              size='lg'
              color='dark'
              className=' btn button mt-2'
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  jsonModal: !state.jsonModal,
                }))
              }
            >
              {props.t('jsonData')}
            </Button>
          </div>
        </div>

        {state.addNotificationModal ? (
          <AdminNotificationsAddModal
            state={state}
            setState={setState}
            notificationsState={props.notificationsState}
            setNotificationsState={props.setNotificationsState}
            t={props.t}
            i18n={props.i18n}
            token={props.token}
            resetSearchStates={adminService.resetSearchStates}
            roles={userRoles}
            audiobooksState={audiobooksState}
            setAudiobooksState={setAudiobooksState}
            categoriesState={categoriesState}
            setCategoriesState={setCategoriesState}
            usersState={usersState}
            setUsersState={setUsersState}
          />
        ) : null}
        {state.searchModal ? (
          <AdminNotificationsSearchOffCanvas
            state={state}
            setState={setState}
            notificationsState={props.notificationsState}
            setNotificationsState={props.setNotificationsState}
            searchState={props.searchState}
            setSearchState={props.setSearchState}
            t={props.t}
            token={props.token}
            resetSearchStates={adminService.resetSearchStates}
          />
        ) : null}
        {notificationState.editNotificationkModal ? (
          <AdminNotificationsEditModal
            state={state}
            setState={setState}
            t={props.t}
            i18n={props.i18n}
            token={props.token}
            notificationsState={props.notificationsState}
            setNotificationsState={props.setNotificationsState}
            notificationState={notificationState}
            setNotificationState={setNotificationState}
            roles={userRoles}
            audiobooksState={audiobooksState}
            setAudiobooksState={setAudiobooksState}
            categoriesState={categoriesState}
            setCategoriesState={setCategoriesState}
            usersState={usersState}
            setUsersState={setUsersState}
          />
        ) : null}
        {state.jsonModal ? (
          <AdminJsonModal state={state} setState={setState} json={notifications} t={props.t} />
        ) : null}
      </div>
    </div>
  );
}
