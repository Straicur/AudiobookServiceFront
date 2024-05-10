import React from 'react';
import { NewNotificationsProvider } from 'Providers/Common/NewNotificationsProvider';
import { AdminNavBar } from './AdminNavBar';
import { UserAuthorizeProvider } from 'Providers/User/UserAuthorizeProvider';

export default function AdminNavBarProviders(props) {
  return (
    <NewNotificationsProvider token={props.token} t={props.t} i18n={props.i18n}>
      <UserAuthorizeProvider token={props.token} i18n={props.i18n}>
        <AdminNavBar token={props.token} t={props.t} i18n={props.i18n} />
      </UserAuthorizeProvider>
    </NewNotificationsProvider>
  );
}
