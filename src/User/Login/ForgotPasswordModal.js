import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { HandleFetch } from "../../components/HandleFetch";

export const ForgotPasswordModal = ({ setUserState, userState }) => {
  const { t } = useTranslation();

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

      await HandleFetch(url, jsonData, method)
        .then((data) => {
          if (data) {
            setState({ ...state, error: 200 });
            handleClose();
          }
        })
        .catch((e) => {
          if (e) {
            handleClose();
            setState({ ...state, error: parseInt(e.message) });
          }
        });
    }
  };

  const handleClose = () =>
    setUserState({ ...userState, modal: userState.modal });

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
    <>
      <Modal show={userState.modal} onHide={handleClose}>
        <Modal.Header className="">
          <Modal.Title>Zmień hasło</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <input
            id="email"
            type="email"
            name="email"
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
            Wyślij email
          </Button>
          <Button variant="dark" onClick={handleClose}>
            Anuluj
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
