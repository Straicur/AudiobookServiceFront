import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { HandleFetch } from "../../Components/HandleFetch";

export const ForgotPasswordModal = ({ formState, setFormState, i18n,t }) => {
  const [state, setState] = useState({
    email: "",
    isButtonDisabled: false,
    error: 0,
  });

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  const handleEmailChange = (event) => {
    setState({ ...state, email: event.target.value });
  };

  const handleSend = async () => {
    if (state.email) {
      const url = "http://127.0.0.1:8000/api/user/reset/password";
      const jsonData = { email: state.email };
      const method = "POST";

      HandleFetch(url, method, jsonData, i18n.language)
        .then((data) => {
          if (data) {
            setState({ ...state, error: 200 });
            handleClose();
          }
        })
        .catch((e) => {
          if (e) {
            handleClose();
            setState({ ...state, error: e });
          }
        });
    }
  };

  const handleClose = () =>
    setFormState({ ...formState, modal: !formState.modal });

  useEffect(() => {
    if (state.email.trim()) {
      if (validateEmail(state.email)) {
        setState({ ...state, isButtonDisabled: false });
      }
    } else {
      setState({ ...state, isButtonDisabled: true });
    }
  }, [state.email]);

  return (
    <Modal show={formState.modal} onHide={handleClose} backdrop="static">
      <Modal.Header className="">
        <Modal.Title> {t("changePassword")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        <input
          id="email"
          type="email"
          placeholder={t("insertEmail")}
          value={state.email}
          className="form-control mt-2 shadow"
          onChange={handleEmailChange}
        />
      </Modal.Body>
      <Modal.Footer className="">
        <Button
          variant="dark"
          disabled={state.isButtonDisabled}
          className="auth-btn"
          onClick={handleSend}
        >
          {t("sendEmail")}
        </Button>
        <Button variant="dark" onClick={handleClose}>
          {t("cancel")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
