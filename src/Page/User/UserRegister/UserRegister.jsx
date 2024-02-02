import React, { useEffect, useState } from 'react';
import UserRegisterForm from 'View/User/UserRegister/UserRegisterForm';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import ValidateUtil from 'Util/ValidateUtil';
import './UserRegister.css';

export default function Register() {
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
    error: null,
  });

  useEffect(() => {
    if (
      state.email.trim() != '' &&
      state.password.trim() != '' &&
      state.confirmPassword.trim() != '' &&
      state.firstname.trim() != '' &&
      state.lastname.trim() != '' &&
      state.phoneNumber.trim() != '' &&
      state.password.trim() == state.confirmPassword.trim() &&
      state.password == state.confirmPassword &&
      ValidateUtil.validateEmail(state.email) &&
      ValidateUtil.validatePassword(state.password) &&
      ValidateUtil.validateBirthday(state.parentalControl, state.birthdayDate)
    ) {
      setState({ ...state, isButtonDisabled: false });
    } else {
      setState({ ...state, isButtonDisabled: true });
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
    <ErrorBoundary
      FallbackComponent={ErrorHandlerModal}
      onReset={() => {
        setState({
          ...state,
          isButtonDisabled: true,
          error: null,
        });
      }}
    >
      <UserRegisterForm state={state} setState={setState} />
    </ErrorBoundary>
  );
}
