import React, { useEffect, useState } from 'react';
import AdminNavBarProviders from '../AdminNavBar/AdminNavBarProviders';

import Button from 'react-bootstrap/Button';
import AdminJsonModal from '../AdminJsonModal/AdminJsonModal';
import AdminUsersRenderList from './AdminUsersRenderList';
import AdminRenderPageSwitches from '../Common/AdminRenderPageSwitches';
import AdminUsersDeleteUsersModal from './AdminUsersDeleteUsersModal';
import AdminUsersEditModal from './AdminUsersEditModal';
import AdminUsersDeletedUsersModal from './AdminUsersDeletedUsersModal';
import AdminUsersSearchOffCanvas from './AdminUsersSearchOffCanvas';
import { useAdminUsersListData } from 'Providers/Admin/AdminUsersListPrivider';
import { useAdminSystemRoles } from 'Providers/Admin/AdminSystemRolesProvider';

export default function AdminUsersList(props) {
  const [state, setState] = useState({
    json: null,
    jsonModal: false,
    deleteUsersModal: false,
    deletedUsersModal: false,
    editUserModal: false,
    editUserElement: null,
    searchModal: false,
    refresh: false,
    error: null,
  });

  const [
    usersList,
    refetch,
    forceRefetch,
    deleteUser,
    banUser,
    activateUser,
    changeUserPassword,
    changeUserPhone,
  ] = useAdminUsersListData();
  const [userRoles, removeUserRole, addUserRole] = useAdminSystemRoles();

  const resetSearchStates = () => {
    props.setSearchState({
      email: '',
      phoneNumber: '',
      firstname: '',
      lastname: '',
      active: null,
      banned: null,
      order: 0,
    });
  };

  const openSearchModal = () => {
    setState((prev) => ({
      ...prev,
      searchModal: !state.searchModal,
    }));
  };

  useEffect(() => {
    if (state.refresh) {
      setState((prev) => ({
        ...prev,
        refresh: !state.refresh,
      }));
      forceRefetch();
    }
  }, [state.refresh]);

  useEffect(() => {
    if (props.usersState.error != null) {
      throw props.usersState.error;
    }
  }, [props.usersState.error]);

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
                onClick={() => openSearchModal()}
              >
                {props.t('search')}
              </Button>
            </div>
          </div>
          <AdminUsersRenderList
            state={state}
            setState={setState}
            usersList={usersList}
            deleteUser={deleteUser}
            t={props.t}
            i18n={props.i18n}
            token={props.token}
            usersState={props.usersState}
            setUsersState={props.setUsersState}
          />
          {usersList != null && usersList.maxPage > 1 ? (
            <AdminRenderPageSwitches
              page={props.usersState.page}
              maxPage={usersList.maxPage}
              setPageState={props.setUsersState}
            />
          ) : null}
        </div>
        <div className='row justify-content-md-center'>
          <div className='col-2 d-flex justify-content-center'>
            <Button
              variant='dark'
              size='lg'
              color='dark'
              className=' btn button mt-2'
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  deleteUsersModal: !state.deleteUsersModal,
                }))
              }
            >
              {props.t('deleteUserList')}
            </Button>
          </div>
          <div className='col-2 d-flex justify-content-center'>
            <Button
              variant='dark'
              size='lg'
              color='dark'
              className=' btn button mt-2'
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  deletedUsersModal: !state.deletedUsersModal,
                }))
              }
            >
              {props.t('deletedUsers')}
            </Button>
          </div>
          <div className='col-2 d-flex justify-content-center'>
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
        {state.searchModal ? (
          <AdminUsersSearchOffCanvas
            state={state}
            setState={setState}
            resetSearchStates={resetSearchStates}
            setUsersState={props.setUsersState}
            refetch={refetch}
            searchState={props.searchState}
            setSearchState={props.setSearchState}
            t={props.t}
          />
        ) : null}
        {state.editUserModal && state.editUserElement ? (
          <AdminUsersEditModal
            state={state}
            setState={setState}
            t={props.t}
            i18n={props.i18n}
            removeUserRole={removeUserRole}
            addUserRole={addUserRole}
            banUser={banUser}
            activateUser={activateUser}
            changeUserPassword={changeUserPassword}
            changeUserPhone={changeUserPhone}
            token={props.token}
            userRoles={userRoles}
          />
        ) : null}
        {state.deleteUsersModal ? (
          <AdminUsersDeleteUsersModal
            state={state}
            setState={setState}
            t={props.t}
            i18n={props.i18n}
            token={props.token}
            usersState={props.usersState}
            setUsersState={props.setUsersState}
          />
        ) : null}
        {state.deletedUsersModal ? (
          <AdminUsersDeletedUsersModal
            state={state}
            setState={setState}
            t={props.t}
            i18n={props.i18n}
            token={props.token}
            usersState={props.usersState}
            setUsersState={props.setUsersState}
          />
        ) : null}
        {state.jsonModal ? (
          <AdminJsonModal state={state} setState={setState} json={usersList} t={props.t} />
        ) : null}
      </div>
    </div>
  );
}
