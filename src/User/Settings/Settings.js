import React, { useState } from "react";
import { UserNavBar } from "../../Components/NavBars/UserNavBar";
import { useTokenStore } from "../../store";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../Errors/ErrorHandlerModal";
import { useTranslation } from "react-i18next";
import SettingsForm from "./Components/SettingsForm";
import { useNavigate } from "react-router-dom";
import EditEmailModal from "./Components/EditEmailModal";
import EditPasswordModal from "./Components/EditPasswordModal";
import EditUserDataModal from "./Components/EditUserDataModal";
import DeleteUserModal from "./Components/DeleteUserModal";
import "./Settings.css";

export default function Settings() {
  const navigate = useNavigate();
  const token = useTokenStore((state) => state.token);

  const { t } = useTranslation();

  const [state, setState] = useState({
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
        setState({
          ...state,
          isButtonDisabled: true,
          validated: false,
          error: null,
        });
      }}
    >
      <HelmetProvider>
        <Helmet>
          <style>{"body { background-color: black; }"}</style>
        </Helmet>

        <div className="container-fluid main-container mt-3">
          <div className="card position-relative p-3 mb-5  bg-dark shadow">
            <UserNavBar />
            <SettingsForm state={state} setState={setState} t={t} />
            {state.buttonEmail ? (
              <EditEmailModal
                state={state}
                setState={setState}
                t={t}
                token={token}
              />
            ) : null}
            {state.buttonPassword ? (
              <EditPasswordModal
                state={state}
                setState={setState}
                t={t}
                token={token}
              />
            ) : null}
            {state.buttonUserData ? (
              <EditUserDataModal
                state={state}
                setState={setState}
                t={t}
                token={token}
              />
            ) : null}
            {state.buttonDelete ? (
              <DeleteUserModal
                state={state}
                setState={setState}
                t={t}
                navigate={navigate}
                token={token}
              />
            ) : null}
          </div>
        </div>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
