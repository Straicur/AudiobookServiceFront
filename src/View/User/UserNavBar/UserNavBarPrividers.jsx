import React from 'react';
import { NewNotificationsProvider } from 'Providers/Common/NewNotificationsProvider';
import { UserNavBar } from './UserNavBar';

export default function UserNavBarPrividers(props) {
  return (
    <NewNotificationsProvider token={props.token} i18n={props.i18n}>
      <UserNavBar />
    </NewNotificationsProvider>
  );
}
