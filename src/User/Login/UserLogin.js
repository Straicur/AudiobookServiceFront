import React, { useState, useEffect } from "react";
import { useTokenStore } from "../../store";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import md5 from "md5";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
import { useTranslation } from "react-i18next";
import {Form} from "./components/Form";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../Errors/ErrorHandlerModal";

export default function UserLogin() {
  const [state, setState] = useState({
    email: "",
    password: "",
    isButtonDisabled: true,
    error: null,
  });

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
      <Form state={state} setState={setState} />
    </ErrorBoundary>
  );
}
