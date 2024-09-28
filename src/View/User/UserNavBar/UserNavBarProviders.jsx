import React from 'react';
import { NewNotificationsProvider } from 'Providers/Common/NewNotificationsProvider';
import { UserNavBar } from './UserNavBar';
import { UserAuthorizeProvider } from 'Providers/User/UserAuthorizeProvider';

export default function UserNavBarProviders(props) {
  return (
    <NewNotificationsProvider token={props.token} t={props.t} i18n={props.i18n}>
      <UserAuthorizeProvider token={props.token} i18n={props.i18n}>
        <UserNavBar token={props.token} t={props.t} i18n={props.i18n} />
      </UserAuthorizeProvider>
    </NewNotificationsProvider>
  );
}
