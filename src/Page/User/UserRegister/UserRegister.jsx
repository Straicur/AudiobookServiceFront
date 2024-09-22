import React, { useEffect, useState } from 'react';
import UserRegisterForm from 'View/User/UserRegister/UserRegisterForm';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import ValidateUtil from 'Util/ValidateUtil';
import './UserRegister.css';
import { UserRegisterProvider } from 'Providers/User/UserRegisterProvider';
import { useTranslation } from 'react-i18next';
import { NetworkErrorBoundry } from 'Errors/NetworkErrorBoundry';
import { NetworkErrorBoundryModal } from 'Errors/NetworkErrorBoundryModal';

export default function UserRegister() {
  const { i18n } = useTranslation();

  const [state, setState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    passwordStrength: 10,
    phoneNumber: '',
    firstname: '',
    lastname: '',
    validated: false,
    parentalControl: false,
    birthdayDate: '',
    isButtonDisabled: true,
  });

  useEffect(() => {
    if (
      state.firstname.length >= 3 &&
      state.lastname.length >= 3 &&
      ValidateUtil.validatePhoneNumber(state.phoneNumber) &&
      state.password.trim() === state.confirmPassword.trim() &&
      ValidateUtil.validateEmail(state.email) &&
      ValidateUtil.validatePassword(state.password) &&
      ValidateUtil.validateBirthday(state.parentalControl, state.birthdayDate)
    ) {
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
  }, [
    state.email,
    state.password,
    state.confirmPassword,
    state.lastname,
    state.phoneNumber,
    state.firstname,
    state.parentalControl,
    state.birthdayDate,
  ]);

  return (
    <NetworkErrorBoundry FallbackComponent={NetworkErrorBoundryModal}>
      <ErrorBoundary
        FallbackComponent={ErrorHandlerModal}
        onReset={() => {
          setState((prev) => ({
            ...prev,
            isButtonDisabled: true,
          }));
        }}
      >
        <UserRegisterProvider i18n={i18n}>
          <UserRegisterForm state={state} setState={setState} />
        </UserRegisterProvider>
      </ErrorBoundary>
    </NetworkErrorBoundry>
  );
}
