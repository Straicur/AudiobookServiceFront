import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { HandleFetch } from "../../Components/HandleFetch";

export const ForgotPasswordModal = (props) => {
  const [state, setState] = useState({
    email: "",
    isButtonDisabled: false,
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

      HandleFetch(url, method, jsonData, props.i18n.language)
        .then((data) => {
          if (data) {
            setState({ ...state });
            handleClose();
          }
        })
        .catch((e) => {
          props.setState({ ...props.state, error: e });
          handleClose();
        });
    }
  };

  const handleClose = () =>
    props.setFormState({ ...props.formState, modal: !props.formState.modal });

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
    <Modal show={props.formState.modal} onHide={handleClose} backdrop="static">
      <Modal.Header>
        <Modal.Title> {props.t("changePassword")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          id="email"
          type="email"
          placeholder={props.t("insertEmail")}
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
          {props.t("sendEmail")}
        </Button>
        <Button variant="dark" onClick={handleClose}>
          {props.t("cancel")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
