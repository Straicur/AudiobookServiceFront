import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './UserAbout.css';
import { UserAuthorizeProvider } from 'Providers/User/UserAuthorizeProvider';
import { useTokenStore } from 'Store/store';
import UserAboutContainer from 'View/User/UserAbout/UserAboutContainer';
import { NetworkErrorBoundry } from 'Errors/NetworkErrorBoundry';

export default function UserAbout() {
  const [state, setState] = useState({
    email: '',
    myEmail: false,
  });

  const { t, i18n } = useTranslation();

  const token = useTokenStore((state) => state.token);

  return (
    <NetworkErrorBoundry>
      <UserAuthorizeProvider token={token} i18n={i18n}>
        <UserAboutContainer t={t} i18n={i18n} state={state} setState={setState} />
      </UserAuthorizeProvider>
    </NetworkErrorBoundry>
  );
}
