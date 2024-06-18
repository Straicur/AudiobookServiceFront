import React from 'react';
import AdminNavBarProviders from '../AdminNavBar/AdminNavBarProviders';
import { Button } from 'react-bootstrap';
import { useAdminCacheContextData } from 'Providers/Admin/AdminCacheProvider';

export default function AdminCacheContainer(props) {
  const [pools, clearCache] = useAdminCacheContextData();

  console.log(pools);

  return (
    <div className='container-fluid main-container mt-3'>
      <div className='card position-relative p-3 mb-5  shadow'>
        <AdminNavBarProviders token={props.token} t={props.t} i18n={props.i18n} />
        <hr className='line' />
        <Button onClick={() => clearCache({ all: true })}>{props.t('clearCachePools')}</Button>
        <div className='table-title my-2'>
          <h1>{props.t('cachePools')}</h1>
        </div>
      </div>
    </div>
  );
}
