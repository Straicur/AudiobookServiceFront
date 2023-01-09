import React, { useEffect,useState } from "react";
import Form from "./components/Form";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../Errors/ErrorHandlerModal";

export default function Register() {
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    firstname: "",
    lastname: "",
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
      state.password.trim() == state.confirmPassword.trim()
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
        // setState({
        //   ...state,
        //   isButtonDisabled: true,
        //   error: null,
        // });
      }}
    >
      <Form state={state} setState={setState} />
    </ErrorBoundary>
  );
}
