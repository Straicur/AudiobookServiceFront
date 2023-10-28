import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../Errors/ErrorHandlerModal";
import ForgotPage from "./Components/ForgotPage";
import DataNotFoundError from "../../Errors/Errors/DataNotFoundError";

export default function Forgot() {
  const { t, i18n } = useTranslation();

  const { id } = useParams();

  const navigate = useNavigate();

  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
    passwordStrength: 10,
    error: null,
    wrongPassword: false,
    changeLang: i18n.language,
    modal: false,
    isButtonDisabled: false,
  });

  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerModal}
      onReset={() => {
        if (state.error instanceof DataNotFoundError) {
          navigate("/login");
        }

        setState({
          ...state,
          error: null,
        });
      }}
    >
      <ForgotPage
        state={state}
        setState={setState}
        id={id}
        t={t}
        i18n={i18n}
        navigate={navigate}
      />
    </ErrorBoundary>
  );
}
