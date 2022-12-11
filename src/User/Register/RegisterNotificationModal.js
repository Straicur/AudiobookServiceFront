import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

export const RegisterNotificationModal = ({ setModalState, state }) => {
  const { t } = useTranslation();

  const handleClose = () => {
    setModalState({
      modalShow: !state.modalShow,
      redirect: true,
      redirectTo: "/login",
    });
  };

  return (
    <>
      <Modal
        show={state.modalShow}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body className="auth-bg text-light">
          <h3>Wysłaliśmy mail potwierdzający do ciebie</h3>
        </Modal.Body>
        <Modal.Footer className="auth-bg">
          <Button variant="black" className="auth-btn" onClick={handleClose}>
            Zamknij
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};