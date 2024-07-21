import React from 'react';
import AdminNavBarProviders from '../AdminNavBar/AdminNavBarProviders';

export default function AdminTechnicalBreaksContainer(props) {
  return (
    <div className='container-fluid main-container mt-3'>
      <div className='card position-relative p-3 mb-5  shadow'>
        <AdminNavBarProviders token={props.token} t={props.t} i18n={props.i18n} />
        <hr className='line' />
        Aktualnie pracuję nad tą stroną
      </div>
    </div>
  );
}
