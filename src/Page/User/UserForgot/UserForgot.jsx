import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import UserForgotView from 'View/User/UserForgot/UserForgotView';
import { UserAuthorizeProvider } from 'Providers/User/UserAuthorizeProvider';
import { useTokenStore } from 'Store/store';

export default function UserForgot() {
  const { t, i18n } = useTranslation();

  const token = useTokenStore((state) => state.token);

  const { id } = useParams();

  const navigate = useNavigate();

  const [state, setState] = useState({
    password: '',
    confirmPassword: '',
    passwordStrength: 10,
    wrongPassword: false,
    changeLang: i18n.language,
    modal: false,
    isButtonDisabled: false,
  });

  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerModal}
      onReset={() => {
        setState(() => ({
          password: '',
          confirmPassword: '',
          passwordStrength: 10,
          wrongPassword: false,
          changeLang: i18n.language,
          modal: false,
          isButtonDisabled: false,
        }));
      }}
    >
      <UserAuthorizeProvider token={token} i18n={i18n}>
        <UserForgotView
          state={state}
          setState={setState}
          id={id}
          t={t}
          i18n={i18n}
          navigate={navigate}
        />
      </UserAuthorizeProvider>
    </ErrorBoundary>
  );
}
