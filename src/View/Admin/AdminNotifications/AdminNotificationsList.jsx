import React, { useEffect, useState } from 'react';
import { AdminNavBar } from 'AdminNavBar/AdminNavBar';
import { useQuery } from 'react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import AdminJsonModal from 'AdminJsonModal/AdminJsonModal';
import AdminNotificationsAddModal from './AdminNotificationsAddModal';
import AdminNotificationsEditModal from './AdminNotificationsEditModal';
import AdminNotificationsSearchOffCanvas from './AdminNotificationsSearchOffCanvas';
import AdminNotificationsRenderList from './AdminNotificationsRenderList';
import AdminRenderPageSwitches from 'Common/AdminRenderPageSwitches';
import { useLastUserRolesStore } from 'Store/store';

export default function AdminNotificationsList(props) {
  const { t, i18n } = useTranslation();

  const [state, setState] = useState({
    jsonModal: false,
    json: null,
    addNotificationModal: false,
    editNotificationkModal: false,
    editNotificationElement: null,
    searchModal: false,
    refresh: false,
    error: null,
  });

  const [searchState, setSearchState] = useState({
    text: '',
    type: 0,
    deleted: null,
    order: 0,
  });

  const [pageState, setPageState] = useState({
    page: 0,
    limit: 15,
    maxPage: 0,
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

  const userRolesStore = useLastUserRolesStore();
  const roles = useLastUserRolesStore((state) => state.roles);
  const dateUpdate = useLastUserRolesStore((state) => state.dateUpdate);

  const resetSearchStates = () => {
    setSearchState({
      text: '',
      type: 0,
      deleted: null,
      order: 0,
    });
  };

  const formatData = () => {
    let searchJson = {};

    if (searchState.text != '') {
      searchJson.text = searchState.text;
    }
    if (searchState.deleted != null) {
      searchJson.deleted = searchState.deleted;
    }
    if (searchState.type != 0) {
      searchJson.type = parseInt(searchState.type);
    }
    if (searchState.order != 0) {
      searchJson.order = parseInt(searchState.order);
    }

    return searchJson;
  };

  const { refetch } = useQuery(
    'data',
    () =>
      HandleFetch(
        '/admin/user/notifications',
        'POST',
        {
          page: pageState.page,
          limit: pageState.limit,
          searchData: formatData(),
        },
        props.token,
        i18n.language,
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {
        props.setNotificationsState({
          ...props.notificationsState,
          error: e,
        });
      },
      onSuccess: (data) => {
        setState({ ...state, json: data });
        setPageState({ ...pageState, maxPage: data.maxPage });
      },
    },
  );

  const openAddModal = () => {
    setState({
      ...state,
      addNotificationModal: !state.addNotificationModal,
    });
  };

  const openSearchModal = () => {
    if (dateUpdate < Date.now()) {
      userRolesStore.removeRoles();
      HandleFetch('/admin/user/system/roles', 'GET', null, props.token, i18n.language)
        .then((data) => {
          userRolesStore.setRoles(data);
        })
        .catch((e) => {
          props.setNotificationsState({
            ...props.notificationsState,
            error: e,
          });
        });
    }

    setState({
      ...state,
      searchModal: !state.searchModal,
    });
  };

  useEffect(() => {
    if (state.refresh) {
      setState({ ...state, refresh: !state.refresh });
      refetch();
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
          <AdminNotificationsRenderList
            state={state}
            setState={setState}
            t={t}
            token={props.token}
            pageState={pageState}
            setPageState={setPageState}
            roles={roles}
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
          <div className='col-3 d-flex justify-content-center'>
            <Button
              variant='dark'
              size='lg'
              color='dark'
              className=' btn button mt-2'
              onClick={() => openAddModal()}
            >
              {t('addNotification')}
            </Button>
          </div>
          <div className='col-3 d-flex justify-content-center'>
            <Button
              variant='dark'
              size='lg'
              color='dark'
              className=' btn button mt-2'
              onClick={() => setState({ ...state, jsonModal: !state.jsonModal })}
            >
              {t('jsonData')}
            </Button>
          </div>
        </div>

        {state.addNotificationModal ? (
          <AdminNotificationsAddModal
            state={state}
            setState={setState}
            notificationsState={props.notificationsState}
            setNotificationsState={props.setNotificationsState}
            t={t}
            i18n={i18n}
            token={props.token}
            resetSearchStates={resetSearchStates}
            roles={roles}
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
            searchState={searchState}
            setSearchState={setSearchState}
            t={t}
            token={props.token}
            pageState={pageState}
            setPageState={setPageState}
            resetSearchStates={resetSearchStates}
          />
        ) : null}
        {state.editNotificationkModal && state.editNotificationElement != null ? (
          <AdminNotificationsEditModal
            state={state}
            setState={setState}
            t={t}
            i18n={i18n}
            token={props.token}
            notificationsState={props.notificationsState}
            setNotificationsState={props.setNotificationsState}
            roles={roles}
            audiobooksState={audiobooksState}
            setAudiobooksState={setAudiobooksState}
            categoriesState={categoriesState}
            setCategoriesState={setCategoriesState}
            usersState={usersState}
            setUsersState={setUsersState}
          />
        ) : null}
        {state.jsonModal ? <AdminJsonModal state={state} setState={setState} t={t} /> : null}
      </div>
    </div>
  );
}
