import React, { useState } from 'react';
import AdminNavBarProviders from '../AdminNavBar/AdminNavBarProviders';
import { Button } from 'react-bootstrap';
import { useAdminCacheContextData } from 'Providers/Admin/AdminCacheProvider';
import { useUserAudiobooksListStore } from 'Store/store';
import { useNotificationsListStore } from 'Store/store';
import { useQueryClient } from '@tanstack/react-query';
import AdminPoolsList from './AdminPoolsList';
import { AdminCacheClearModal } from './AdminCacheClearModal';

export default function AdminCacheContainer(props) {
  const [poolsState, setPoolsState] = useState([]);
  const [modalState, setModalState] = useState(false);

  const [pools, clearCache] = useAdminCacheContextData();
  const audiobooksListStore = useUserAudiobooksListStore();
  const notificationsListStore = useNotificationsListStore();
  const qc = useQueryClient();

  const clearAppCache = () => {
    clearCache({
      json: { all: true },
      clearQuery: true,
      setModalState: setModalState,
      modalState: modalState,
    });
    notificationsListStore.removeNotifications();
    audiobooksListStore.removeAudiobooks();
  };

  const clearQueryCache = () => {
    qc.clear();
  };

  const clearAdminServerCache = () => {
    clearCache({
      json: { admin: true },
      clearQuery: false,
      setModalState: setModalState,
      modalState: modalState,
    });
  };

  const clearUserServerCache = () => {
    clearCache({
      json: { user: true },
      clearQuery: false,
      setModalState: setModalState,
      modalState: modalState,
    });
  };

  return (
    <div className='container-fluid main-container mt-3'>
      <div className='card position-relative p-3 mb-5  shadow'>
        <AdminNavBarProviders token={props.token} t={props.t} i18n={props.i18n} />
        <hr className='line' />
        <div className='row'>
          <div className='col-5'>
            <div className='my-2 mx-3'>
              <div className='row mx-3 my-3'>
                <Button variant='success' className='p-2 fs-4' onClick={() => clearAppCache()}>
                  {props.t('clearCachePools')}
                </Button>
              </div>
              <h1>{props.t('serverCache')}</h1>
              <hr className='line' />
              <div className='row mx-3 my-3'>
                <Button
                  variant='warning'
                  className='p-2 fs-4'
                  onClick={() => clearUserServerCache()}
                >
                  {props.t('clearUserCachePools')}
                </Button>
              </div>
              <div className='row mx-3 my-3'>
                <Button
                  variant='warning'
                  className='p-2 fs-4'
                  onClick={() => clearAdminServerCache()}
                >
                  {props.t('clearAdminCachePools')}
                </Button>
              </div>
              <h1>{props.t('browserCache')}</h1>
              <hr className='line' />
              <div className='row mx-3 my-3'>
                <Button variant='warning' className='p-2 fs-4' onClick={() => clearQueryCache()}>
                  {props.t('clearQueryCache')}
                </Button>
              </div>
              <h1>{props.t('localStorage')}</h1>
              <hr className='line' />
              <div className='row mx-3 my-3'>
                <Button
                  variant='warning'
                  className='p-2 fs-4'
                  onClick={() => audiobooksListStore.removeAudiobooks()}
                >
                  {props.t('clearZustandUserAudiobooksCache')}
                </Button>
              </div>
              <div className='row mx-3 my-3'>
                <Button
                  variant='warning'
                  className='p-2 fs-4'
                  onClick={() => notificationsListStore.removeNotifications()}
                >
                  {props.t('clearZustandNotificationsCache')}
                </Button>
              </div>
            </div>
          </div>
          <div className='col-6'>
            <div className='my-2 mx-3'>
              <div className='row'>
                <div className='col'>
                  <h1>{props.t('serverCachePools')}</h1>
                </div>
                <div className='col'>
                  <Button
                    variant='success'
                    className='p-2 fs-4'
                    onClick={() =>
                      clearCache({
                        json: { pools: poolsState },
                        clearQuery: false,
                        setModalState: setModalState,
                        modalState: modalState,
                      })
                    }
                  >
                    {props.t('clearChosenCachePools')}
                  </Button>
                </div>
              </div>
              <AdminPoolsList
                pools={pools}
                clearCache={clearCache}
                setPoolsState={setPoolsState}
                poolsState={poolsState}
              />
            </div>
          </div>
          {modalState ? (
            <AdminCacheClearModal modalState={modalState} setModalState={setModalState} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
