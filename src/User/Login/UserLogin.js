import React, { useState, useEffect } from "react";
import { useTokenStore } from "../../Store/store";
import { useNavigate } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../Errors/ErrorHandlerModal";
import "./UserLogin.css";

export default function UserLogin() {
  const navigate = useNavigate();
  const token = useTokenStore((state) => state.token);

  const [state, setState] = useState({
    email: "",
    password: "",
    validated: false,
    isButtonDisabled: true,
    error: null,
  });

  useEffect(() => {
    if (token != "") {
      navigate("/main");
    }
  }, [token]);

  useEffect(() => {
    if (state.email.trim() && state.password.trim()) {
      setState({ ...state, isButtonDisabled: false });
    } else {
      setState({ ...state, isButtonDisabled: true });
    }
  }, [state.email, state.password]);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerModal}
      onReset={() => {
        setState({
          ...state,
          isButtonDisabled: true,
          validated: false,
          error: null,
        });
      }}
    >
      <LoginForm state={state} setState={setState} token={token} />
    </ErrorBoundary>
  );
}
