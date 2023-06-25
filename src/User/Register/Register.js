import React, { useEffect, useState } from "react";
import RegisterForm from "./Components/RegisterForm";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../Errors/ErrorHandlerModal";
import { validateEmail, validatePassword } from "./Components/Events";
import "./Register.css";

export default function Register() {
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    firstname: "",
    lastname: "",
    validated: false,
    isButtonDisabled: true,
    error: null,
  });

  useEffect(() => {
    if (
      state.email.trim() != "" &&
      state.password.trim() != "" &&
      state.confirmPassword.trim() != "" &&
      state.firstname.trim() != "" &&
      state.lastname.trim() != "" &&
      state.phoneNumber.trim() != "" &&
      state.password.trim() == state.confirmPassword.trim() &&
      state.password == state.confirmPassword &&
      validateEmail(state.email) &&
      validatePassword(state.password)
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
    state.password,
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
      <RegisterForm state={state} setState={setState} />
    </ErrorBoundary>
  );
}
