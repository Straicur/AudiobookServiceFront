import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useTokenStore } from 'Store/store';
import { useNavigate } from 'react-router-dom';
import UserLoginForm from 'View/User/UserLogin/UserLoginForm';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import { useTranslation } from 'react-i18next';
import { UserAuthorizeProvider } from 'Providers/User/UserAuthorizeProvider';
import { NetworkErrorBoundry } from 'Errors/NetworkErrorBoundry';
import { NetworkErrorBoundryModal } from 'Errors/NetworkErrorBoundryModal';
import './UserLogin.css';

export default function UserLogin() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const token = useTokenStore((state) => state.token);

  const [state, setState] = useState({
    email: '',
    password: '',
    validated: false,
    isButtonDisabled: true,
  });

  useLayoutEffect(() => {
    if (token !== '') {
      navigate('/main');
    }
  }, [token]);

  useEffect(() => {
    if (state.email.trim() && state.password.trim()) {
      setState((prev) => ({
        ...prev,
        isButtonDisabled: false,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        isButtonDisabled: true,
      }));
    }
  }, [state.email, state.password]);

  return (
    <NetworkErrorBoundry FallbackComponent={NetworkErrorBoundryModal}>
      <ErrorBoundary
        FallbackComponent={ErrorHandlerModal}
        onReset={() => {
          setState((prev) => ({
            ...prev,
            isButtonDisabled: true,
            validated: false,
          }));
        }}
      >
        <UserAuthorizeProvider token={token} i18n={i18n}>
          <UserLoginForm state={state} setState={setState} t={t} i18n={i18n} />
        </UserAuthorizeProvider>
      </ErrorBoundary>
    </NetworkErrorBoundry>
  );
}
