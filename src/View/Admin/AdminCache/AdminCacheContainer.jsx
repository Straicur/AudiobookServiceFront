import React from 'react';
import AdminNavBarProviders from '../AdminNavBar/AdminNavBarProviders';
import { Button } from 'react-bootstrap';
import { useAdminCacheContextData } from 'Providers/Admin/AdminCacheProvider';
import { useUserAudiobooksListStore } from 'Store/store';
import { useNotificationsListStore } from 'Store/store';
import AdminPoolsList from './AdminPoolsList';

export default function AdminCacheContainer(props) {
  const [pools, clearCache] = useAdminCacheContextData();
  const audiobooksListStore = useUserAudiobooksListStore();
  const notificationsListStore = useNotificationsListStore();

  const clearAppCache = () => {
    clearCache({ all: true });
    notificationsListStore.removeNotifications();
    audiobooksListStore.removeAudiobooks();
    clearCacheData();
    //TODO tu jeszcze dojdzie czyszczenie cache przeglądarki
  };

  const clearCacheData = () => {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
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
                <Button variant='warning' className='p-2 fs-4' onClick={() => clearAppCache()}>
                  {props.t('clearUserCachePools')}
                </Button>
              </div>
              <div className='row mx-3 my-3'>
                <Button variant='warning' className='p-2 fs-4' onClick={() => clearAppCache()}>
                  {props.t('clearAdminCachePools')}
                </Button>
              </div>
              <h1>{props.t('browserCache')}</h1>
              <hr className='line' />
              <div className='row mx-3 my-3'>
                <Button variant='warning' className='p-2 fs-4' onClick={() => clearAppCache()}>
                  {props.t('clearBrowserCache')}
                </Button>
              </div>
              <div className='row mx-3 my-3'>
                <Button variant='warning' className='p-2 fs-4' onClick={() => clearAppCache()}>
                  {props.t('clearQueryCache')}
                </Button>
              </div>
              <h1>{props.t('localStorage')}</h1>
              <hr className='line' />
              <div className='row mx-3 my-3'>
                <Button variant='warning' className='p-2 fs-4' onClick={() => clearAppCache()}>
                  {props.t('clearZustandUserAudiobooksCache')}
                </Button>
              </div>
              <div className='row mx-3 my-3'>
                <Button variant='warning' className='p-2 fs-4' onClick={() => clearAppCache()}>
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
                  <Button variant='success' className='p-2 fs-4' onClick={() => clearAppCache()}>
                    {props.t('clearChosenCachePools')}
                  </Button>
                </div>
              </div>
              <AdminPoolsList pools={pools} clearCache={clearCache} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
