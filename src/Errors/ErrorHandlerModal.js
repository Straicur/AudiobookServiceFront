import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

export const ErrorHandlerModal = ({
  setErrorState,
  errorState,
  error,
  errorFunction = null,
}) => {
  const { t } = useTranslation();

  const [state, setState] = useState({
    message: "",
    data: [],
  });

  const handleClose = () =>
    setErrorState({ ...errorState, modal: !errorState.modal });

  function reloadFunction() {
    window.location.reload(false);
  }

  switch (error.name) {
    case "InvalidJsonDataError":
      setState({ data: error.data, message: error.message });
      break;
    case "ValidationError":
      setState({ data: error.data, message: error.message });
      break;
    case "SystemError":
      setState({ ...state, message: error.message });
      break;
    case "ServiceUnaviableError":
      setState({ ...state, message: error.message });
      break;
    case "PermissionError":
      setState({ ...state, message: error.message });
      break;
    case "DataNotFoundError":
      setState({ data: error.data, message: error.message });
      break;
    case "InvalidDataError":
      setState({ data: error.data, message: error.message });
      break;
    case "AuthenticationError":
      setState({ ...state, message: error.message });
      break;
    default: {
      setState({ ...state, message: t("systemError") });
      break;
    }
  }

  return (
    <Modal show={errorState.modal} onHide={handleClose}>
      <Modal.Header className="">
        <Modal.Title> {t("errorOccurred")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        <h3> {state.message}</h3>
      </Modal.Body>
      <Modal.Footer className="">
        <Button
          variant="dark"
          onClick={errorFunction != null ? errorFunction() : reloadFunction()}
        >
          {t("accept")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
