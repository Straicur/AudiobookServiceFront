import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { HandleFetch } from "../../../Components/HandleFetch";
import Alert from "react-bootstrap/Alert";

export default function EditEmailModal(props) {
  const [state, setState] = useState({
    oldEmail: "",
    newEmail: "",
    checkEmail: false,
    wrongEmail: false,
    wrongNewEmail: false,
  });

  const handleClose = () => {
    props.setState({
      ...props.state,
      buttonEmail: !props.state.buttonEmail,
    });
  };

  const changeEmail = (element) => {
    if (state.newEmail != state.oldEmail) {
      element.target.classList.add("disabled");

      HandleFetch(
        "http://127.0.0.1:8000/api/user/settings/email",
        "POST",
        {
          newEmail: state.newEmail,
          oldEmail: state.oldEmail,
        },
        props.token,
        props.i18n.language
      )
        .then(() => {
          element.target.classList.remove("disabled");
          setState({ ...state, checkEmail: !state.checkEmail });
        })
        .catch((e) => {
          props.setState({
            ...props.state,
            error: e,
          });
        });
    } else {
      setState({ ...state, wrongNewEmail: false });
    }
  };

  const handleEmailChange = (event) => {
    setState({
      ...state,
      oldEmail: event.target.value,
    });
  };
  const handleEmailNewChange = (event) => {
    setState({
      ...state,
      newEmail: event.target.value,
    });
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  useEffect(() => {
    if (state.oldEmail.length == 0) {
      setState({ ...state, wrongEmail: false });
    } else if (!validateEmail(state.oldEmail)) {
      setState({ ...state, wrongEmail: true });
    } else {
      setState({ ...state, wrongEmail: false });
    }
  }, [state.oldEmail]);

  useEffect(() => {
    if (state.newEmail.length == 0) {
      setState({ ...state, wrongNewEmail: false });
    } else if (!validateEmail(state.newEmail)) {
      setState({ ...state, wrongNewEmail: true });
    } else {
      setState({ ...state, wrongNewEmail: false });
    }
  }, [state.newEmail]);

  useEffect(() => {
    if (props.state.error != null) {
      throw props.state.error;
    }
  }, [props.state.error]);

  return (
    <Modal
      size="lg"
      show={props.state.buttonEmail}
      onHide={handleClose}
      backdrop="static"
      centered
    >
      <Modal.Body
        style={{
          backgroundColor: "#262626",
        }}
      >
        <div className="text-white">
          {state.checkEmail ? (
            <div className="fs-3 text-center my-3">{props.t("checkEmail")}</div>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>{props.t("oldEmail")}</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  isValid={
                    state.oldEmail.length > 1 && validateEmail(state.oldEmail)
                  }
                  isInvalid={
                    state.oldEmail.length > 1 && !validateEmail(state.oldEmail)
                  }
                  onChange={(event) => handleEmailChange(event)}
                />
                <Alert
                  show={state.wrongEmail}
                  className="dangerAllert mt-1"
                  variant="danger"
                >
                  {props.t("enterValidEmail")}
                </Alert>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{props.t("newEmail")}</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  isValid={
                    state.newEmail.length > 1 && validateEmail(state.newEmail)
                  }
                  isInvalid={
                    state.newEmail.length > 1 && !validateEmail(state.newEmail)
                  }
                  onChange={(event) => handleEmailNewChange(event)}
                />
              </Form.Group>
              <Alert
                show={state.wrongNewEmail}
                className="dangerAllert mt-1"
                variant="danger"
              >
                {props.t("enterValidEmail")}
              </Alert>
            </Form>
          )}

          <div className="row align-items-center justify-content-end">
            <div className="col-2">
              <Button
                name="en"
                size="sm"
                className="btn button danger_button settings-button fs-5"
                onClick={() => handleClose()}
              >
                {props.t("close")}
              </Button>
            </div>
            {!state.checkEmail ? (
              <div className="col-2">
                <Button
                  name="en"
                  size="sm"
                  disabled={
                    state.wrongNewEmail ||
                    state.wrongEmail ||
                    state.oldEmail.length == 0 ||
                    state.newEmail.length == 0
                  }
                  className="btn button success_button settings-button fs-5"
                  onClick={(e) => changeEmail(e)}
                >
                  {props.t("save")}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
