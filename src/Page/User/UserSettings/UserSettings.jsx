import React, { useState } from 'react';
import UserNavBarPrividers from 'View/User/UserNavBar/UserNavBarPrividers';
import { useTokenStore } from 'Store/store';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import UserSettingsContainer from 'View/User/UserSettings/UserSettingsContainer';
import { UserFooter } from 'View/User/Common/UserFooter';
import './UserSettings.css';

export default function Settings() {
  const navigate = useNavigate();
  const token = useTokenStore((state) => state.token);

  const { t, i18n } = useTranslation();

  const [state, setState] = useState({
    phoneNumber: '',
    firstname: '',
    lastname: '',
    email: '',
    edited: false,
    editableDate: 0,
    buttonEmail: false,
    buttonPassword: false,
    buttonDelete: false,
    buttonUserData: false,
    error: null,
  });

  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerModal}
      onReset={() => {
        setState((prev) => ({
          ...prev,
          isButtonDisabled: true,
          validated: false,
          error: null,
        }));
      }}
    >
      <HelmetProvider>
        <Helmet>
          <style>{'body { background-color: black; }'}</style>
        </Helmet>

        <div className='container-fluid main-container mt-3'>
          <div className='card position-relative p-3 bg-dark shadow'>
            <UserNavBarPrividers token={token} />
            <UserSettingsContainer
              state={state}
              setState={setState}
              t={t}
              i18n={i18n}
              token={token}
              navigate={navigate}
            />
          </div>
        </div>
        <UserFooter />
      </HelmetProvider>
    </ErrorBoundary>
  );
}
