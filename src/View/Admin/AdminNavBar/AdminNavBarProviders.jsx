import React from 'react';
import { NewNotificationsProvider } from 'Providers/Common/NewNotificationsProvider';
import { AdminNavBar } from './AdminNavBar';

export default function AdminNavBarProviders(props) {
  return (
    <NewNotificationsProvider token={props.token} i18n={props.i18n}>
      <AdminNavBar />
    </NewNotificationsProvider>
  );
}
