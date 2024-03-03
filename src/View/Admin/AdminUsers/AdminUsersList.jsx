import React, { useEffect, useState } from 'react';
import { AdminNavBar } from '../AdminNavBar/AdminNavBar';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import AdminJsonModal from '../AdminJsonModal/AdminJsonModal';
import AdminUsersRenderList from './AdminUsersRenderList';
import AdminRenderPageSwitches from '../Common/AdminRenderPageSwitches';
import AdminUsersDeleteUsersModal from './AdminUsersDeleteUsersModal';
import AdminUsersEditModal from './AdminUsersEditModal';
import AdminUsersDeletedUsersModal from './AdminUsersDeletedUsersModal';
import AdminUsersSearchOffCanvas from './AdminUsersSearchOffCanvas';
import { useLastUserRolesStore } from 'Store/store';

export default function AdminUsersList(props) {
  const { t, i18n } = useTranslation();

  const userRolesStore = useLastUserRolesStore();

  const roles = useLastUserRolesStore((state) => state.roles);
  const dateUpdate = useLastUserRolesStore((state) => state.dateUpdate);

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
  const [searchState, setSearchState] = useState({
    email: '',
    phoneNumber: '',
    firstname: '',
    lastname: '',
    active: null,
    banned: null,
    order: 0,
  });

  const [pageState, setPageState] = useState({
    page: 0,
    limit: 15,
    maxPage: 0,
  });

  const resetSearchStates = () => {
    setSearchState({
      email: '',
      phoneNumber: '',
      firstname: '',
      lastname: '',
      active: null,
      banned: null,
      order: 0,
    });
  };

  const createSearchData = () => {
    let searchJson = {};

    if (searchState.email != '') {
      searchJson.email = searchState.email;
    }
    if (searchState.phoneNumber != '') {
      searchJson.phoneNumber = searchState.phoneNumber;
    }
    if (searchState.firstname != '') {
      searchJson.firstname = searchState.firstname;
    }
    if (searchState.lastname != '') {
      searchJson.lastname = searchState.lastname;
    }
    if (searchState.active != null) {
      searchJson.active = searchState.active;
    }
    if (searchState.banned != null) {
      searchJson.banned = searchState.banned;
    }
    if (searchState.order != 0) {
      searchJson.order = searchState.order;
    }
    return searchJson;
  };

  const { refetch } = useQuery({
    queryKey: ['dataAdminUsersList'],
    queryFn: () =>
      HandleFetch(
        '/admin/users',
        'POST',
        {
          page: pageState.page,
          limit: pageState.limit,
          searchData: createSearchData(),
        },
        props.token,
        i18n.language,
      ),
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
    onError: (e) => {
      props.setUsersState({
        ...props.usersState,
        error: e,
      });
    },
    onSuccess: (data) => {
      setState((prev) => ({
        ...prev,
        json: data,
      }));
      setPageState((prev) => ({
        ...prev,
        maxPage: data.maxPage,
      }));
      resetSearchStates();
    },
  });

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
      refetch();
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
        <AdminNavBar />
        <hr className='line' />
        <div className='table-title my-2'>
          <div className='d-flex justify-content-end '>
            <div className='p-2 bd-highlight'>
              <h2>{t('filters')}</h2>
            </div>
            <div className='p-2 bd-highlight'>
              <Button
                variant='dark'
                size='sm'
                color='dark'
                className=' btn button mt-2'
                onClick={() => openSearchModal()}
              >
                {t('search')}
              </Button>
            </div>
          </div>
          <AdminUsersRenderList
            state={state}
            setState={setState}
            t={t}
            i18n={i18n}
            token={props.token}
            roles={roles}
            dateUpdate={dateUpdate}
            userRolesStore={userRolesStore}
            pageState={pageState}
            setPageState={setPageState}
          />
          {state.json != null && pageState.maxPage > 1 ? (
            <AdminRenderPageSwitches
              state={state}
              setState={setState}
              pageState={pageState}
              setPageState={setPageState}
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
              {t('deleteUserList')}
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
              {t('deletedUsers')}
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
              {t('jsonData')}
            </Button>
          </div>
        </div>
        {state.searchModal ? (
          <AdminUsersSearchOffCanvas
            state={state}
            setState={setState}
            resetSearchStates={resetSearchStates}
            searchState={searchState}
            setSearchState={setSearchState}
            t={t}
          />
        ) : null}
        {state.editUserModal && state.editUserElement && roles != null ? (
          <AdminUsersEditModal
            state={state}
            setState={setState}
            t={t}
            i18n={i18n}
            token={props.token}
            roles={roles.roles}
          />
        ) : null}
        {state.deleteUsersModal ? (
          <AdminUsersDeleteUsersModal
            state={state}
            setState={setState}
            t={t}
            i18n={i18n}
            token={props.token}
            pageState={pageState}
            setPageState={setPageState}
          />
        ) : null}
        {state.deletedUsersModal ? (
          <AdminUsersDeletedUsersModal
            state={state}
            setState={setState}
            t={t}
            i18n={i18n}
            token={props.token}
            pageState={pageState}
            setPageState={setPageState}
          />
        ) : null}
        {state.jsonModal ? <AdminJsonModal state={state} setState={setState} t={t} /> : null}
      </div>
    </div>
  );
}
