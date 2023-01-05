import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

export const ErrorHandlerModal = ({ error, resetErrorBoundary }) => {
  const { t } = useTranslation();

  const [state, setState] = useState({
    message: "",
    data: [],
    show: true,
  });

  const handleClose = () => setState({ ...state, show: !state.show });

  function reloadFunction() {
    window.location.reload(false);
  }

  useEffect(() => {
    switch (error.name) {
      case "InvalidJsonDataError":
        setState({ ...state, data: error.data, message: error.message });
        break;
      case "ValidationError":
        setState({ ...state, data: error.data, message: error.message });
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
        setState({ ...state, data: error.data, message: error.message });
        break;
      case "InvalidDataError":
        setState({ ...state, data: error.data, message: error.message });
        break;
      case "AuthenticationError":
        setState({ ...state, message: error.message });
        break;
      default: {
        setState({ ...state, message: t("systemError") });
        break;
      }
    }
  }, [error]);

  return (
    <Modal show={state.show} onHide={handleClose}>
      <Modal.Header className="">
        <Modal.Title> {t("errorOccurred")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        <h3> {state.message}</h3>
      </Modal.Body>
      <Modal.Footer className="">
        <Button
          variant="dark"
          onClick={
            resetErrorBoundary != null ? resetErrorBoundary : reloadFunction()
          }
        >
          {t("accept")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
