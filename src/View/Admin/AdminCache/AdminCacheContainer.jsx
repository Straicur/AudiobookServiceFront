import React from 'react';
import AdminNavBarProviders from '../AdminNavBar/AdminNavBarProviders';
import { Button } from 'react-bootstrap';
import { useAdminCacheContextData } from 'Providers/Admin/AdminCacheProvider';
import { useUserAudiobooksListStore } from 'Store/store';
import { useNotificationsListStore } from 'Store/store';

export default function AdminCacheContainer(props) {
  const [pools, clearCache] = useAdminCacheContextData();
  const audiobooksListStore = useUserAudiobooksListStore();
  const notificationsListStore = useNotificationsListStore();

  console.log(pools);

  const clearAppCache = () => {
    clearCache({ all: true });
    notificationsListStore.removeNotifications();
    audiobooksListStore.removeAudiobooks();
  };

  return (
    <div className='container-fluid main-container mt-3'>
      <div className='card position-relative p-3 mb-5  shadow'>
        <AdminNavBarProviders token={props.token} t={props.t} i18n={props.i18n} />
        <hr className='line' />
        Aktualnie pracuję nad tą stroną
        <Button onClick={() => clearAppCache()}>{props.t('clearCachePools')}</Button>
        <div className='table-title my-2'>
          <h1>{props.t('cachePools')}</h1>
        </div>
      </div>
    </div>
  );
}
