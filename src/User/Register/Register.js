import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HandleFetch } from "../../components/HandleFetch";
import md5 from "md5";
import { RegisterNotificationModal } from "./components/RegisterNotificationModal";
import Form from "./components/Form";
import { ErrorBoundary } from "react-error-boundary";
import {ErrorHandlerModal} from "../../Errors/ErrorHandlerModal";

export default function Register() {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const [state, setState] = useState({
    helperText: 0,
    changeLang: i18n.language,
    modalShow: false,
    modalText: "",
  });
  //TODO tu mi zostaje teraz zamknięcie tego w tym errorBoundry i sprawdzenie czy to ładzia w ogóle 
  // Jeśli nie to przebudować muszę tą funkcję od wyłatania
  return (
    <ErrorBoundary
      FallbackComponent={()=>{console.log("Cs")}}
      onReset={() => console.log("Cs")}
    >
      <Form state={state} setState={setState} />
    </ErrorBoundary>
  );
}
