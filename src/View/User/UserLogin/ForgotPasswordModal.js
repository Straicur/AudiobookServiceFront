import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { HandleFetch } from "../../../Util/HandleFetch";

export const ForgotPasswordModal = (props) => {
  const [state, setState] = useState({
    email: "",
    isButtonDisabled: false,
    send: false,
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
      const url = "/user/reset/password";
      const jsonData = { email: state.email };
      const method = "POST";

      HandleFetch(url, method, jsonData, props.i18n.language)
        .then((data) => {
          if (data) {
            setState({ ...state, send: !state.send });

            setTimeout(function () {
              handleClose();
            }, 3000);
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
        {state.send ? (
          <h4 className="text-center">{props.t("checkEmail")}</h4>
        ) : (
          <input
            id="email"
            type="email"
            placeholder={props.t("insertEmail")}
            value={state.email}
            className="form-control mt-2 shadow"
            onChange={handleEmailChange}
          />
        )}
      </Modal.Body>
      <Modal.Footer className="">
        {state.send ? (
          <Button variant="dark" onClick={handleClose}>
            {props.t("close")}
          </Button>
        ) : (
          <div>
            <Button
              variant="dark"
              disabled={state.isButtonDisabled}
              className="auth-btn me-2"
              onClick={handleSend}
            >
              {props.t("sendEmail")}
            </Button>
            <Button className="ms-2" variant="dark" onClick={handleClose}>
              {props.t("cancel")}
            </Button>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
};
