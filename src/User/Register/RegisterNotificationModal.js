import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

export const RegisterNotificationModal = ({ setModalState, modalstate }) => {
  const { t } = useTranslation();

  const handleClose = () => {
    setModalState({
      ...modalstate,
      modalShow: modalstate.modalShow,
      redirect: true,
      redirectTo: "/login",
    });
  };

  return (
    <>
      <Modal
        show={modalstate.modalShow}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body className="">
          <h3>{modalstate.modalText}</h3>
        </Modal.Body>
        <Modal.Footer className="">
          <Button variant="dark" className="btn" onClick={handleClose}>
            Zamknij
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
