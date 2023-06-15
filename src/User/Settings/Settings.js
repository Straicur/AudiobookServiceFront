import React, { useState } from "react";
import { UserNavBar } from "../../Components/NavBars/UserNavBar";
import { useTokenStore } from "../../store";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../Errors/ErrorHandlerModal";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SettingsContainer from "./Components/SettingsContainer";
import { Footer } from "../../Components/Footers/Footer";
import "./Settings.css";

export default function Settings() {
  const navigate = useNavigate();
  const token = useTokenStore((state) => state.token);

  const { t } = useTranslation();

  const [state, setState] = useState({
    phoneNumber: "",
    firstname: "",
    lastname: "",
    email: "",
    edited: false,
    editableDate: 0,
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
          <div className="card position-relative p-3 bg-dark shadow">
            <UserNavBar />
            <SettingsContainer state={state} setState={setState} t={t} token={token} navigate={navigate}/>
          </div>
        </div>
        <Footer/>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
