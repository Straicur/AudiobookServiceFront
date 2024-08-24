import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './UserAbout.css';
import { UserAuthorizeProvider } from 'Providers/User/UserAuthorizeProvider';
import { useTokenStore } from 'Store/store';
import UserAboutContainer from 'View/User/UserAbout/UserAboutContainer';
import { NetworkErrorBoundry } from 'Errors/NetworkErrorBoundry';
import { UserIpProvider } from 'Providers/User/UserIpProvider';
import { UserReportProvider } from 'Providers/User/UserReportProvider';

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
        <UserReportProvider token={token} i18n={i18n}>
          <UserIpProvider>
            <UserAboutContainer t={t} i18n={i18n} state={state} setState={setState} token={token} />
          </UserIpProvider>
        </UserReportProvider>
      </UserAuthorizeProvider>
    </NetworkErrorBoundry>
  );
}
