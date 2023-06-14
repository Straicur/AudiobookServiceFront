import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { HandleFetch } from "../../../Components/HandleFetch";
import Alert from "react-bootstrap/Alert";
import md5 from "md5";

export default function EditPasswordModal(props) {
  const [state, setState] = useState({
    oldPassword: "",
    newPassword: "",
    newConfirmPassword: "",
    checkPassword: false,
    wrongOldPassword: false,
    wrongNewPassword: false,
    wrongNewConfirmPassword: false,
  });

  const handleClose = () => {
    props.setState({
      ...props.state,
      buttonPassword: !props.state.buttonPassword,
    });
  };
  const changePassword = (element) => {
    element.target.classList.add("disabled");

    if (
      state.oldPassword != state.newPassword &&
      state.newPassword == state.newConfirmPassword
    ) {
      HandleFetch(
        "http://127.0.0.1:8000/api/user/settings/password",
        "PATCH",
        {
          oldPassword: md5(state.oldPassword),
          newPassword: md5(state.newPassword),
        },
        props.token
      )
        .then(() => {
          element.target.classList.remove("disabled");
          setState({ ...state, checkPassword: !state.checkPassword });
        })
        .catch((e) => {
          props.setState({
            ...props.state,
            error: e,
          });
        });
    }else{
      setState({ ...state, wrongNewConfirmPassword: true });
    }
  };

  function validatePassword(pass) {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(pass);
  }

  const handleOldPasswordChange = (event) => {
    setState({
      ...state,
      oldPassword: event.target.value,
    });
  };
  const handleNewPasswordChange = (event) => {
    setState({
      ...state,
      newPassword: event.target.value,
    });
  };
  const handleNewConfirmPasswordChange = (event) => {
    setState({
      ...state,
      newConfirmPassword: event.target.value,
    });
  };

  useEffect(() => {
    if (state.oldPassword.length == 0) {
      setState({ ...state, wrongOldPassword: false });
    } else if (state.oldPassword == state.newPassword) {
      setState({ ...state, wrongOldPassword: true });
    } else {
      setState({ ...state, wrongOldPassword: false });
    }
  }, [state.oldPassword]);

  //todo to jest do poprawy bo nie łapie wszystkich wystąpień

  useEffect(() => {
    if (state.newPassword.length == 0) {
      setState({ ...state, wrongNewPassword: false });
    } else if (!validatePassword(state.newPassword)) {
      setState({ ...state, wrongNewPassword: true });
    } else {
      setState({ ...state, wrongNewPassword: false });
    }
  }, [state.newPassword]);

  useEffect(() => {
    if (state.newConfirmPassword.length == 0) {
      setState({ ...state, wrongNewConfirmPassword: false });
    } else if (!validatePassword(state.newConfirmPassword) || state.newConfirmPassword != state.newPassword) {
      setState({ ...state, wrongNewConfirmPassword: true });
    } else {
      setState({ ...state, wrongNewConfirmPassword: false });
    }
  }, [state.newConfirmPassword]);

  useEffect(() => {
    if (props.state.error != null) {
      throw props.state.error;
    }
  }, [props.state.error]);

  return (
    <Modal
      size="lg"
      show={props.state.buttonPassword}
      onHide={handleClose}
      centered
    >
      <Modal.Body
        style={{
          backgroundColor: "#262626",
        }}
      >
        <div className="text-white">
          {state.checkPassword ? (
            <div className="fs-3 text-center my-3">
              {props.t("checkPassword")}
            </div>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>{props.t("oldPassword")}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={props.t("insertPassword")}
                  isValid={
                    state.oldPassword.length > 1 &&
                    state.oldPassword.trim() != state.newPassword.trim()
                  }
                  isInvalid={
                    state.oldPassword.length > 1 &&
                    state.oldPassword.trim() == state.newPassword.trim()
                  }
                  onChange={(event) => handleOldPasswordChange(event)}
                />
                <Alert
                  show={state.wrongOldPassword}
                  className="dangerAllert mt-1"
                  variant="danger"
                >
                  {props.t("enterValidPassword")}
                </Alert>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{props.t("newPassword")}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={props.t("insertPassword")}
                  isValid={
                    state.newPassword.length > 1 &&
                    validatePassword(state.newPassword) &&
                    state.oldPassword.trim() != state.newPassword.trim()
                  }
                  isInvalid={
                    state.newPassword.length > 1 &&
                    !validatePassword(state.newPassword) &&
                    state.oldPassword.trim() == state.newPassword.trim()
                  }
                  onChange={(event) => handleNewPasswordChange(event)}
                />
                <Alert
                  show={state.wrongNewPassword}
                  className="dangerAllert mt-1"
                  variant="danger"
                >
                  {props.t("enterValidPassword")}
                </Alert>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{props.t("newPassword")}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={props.t("insertPasswordConfirm")}
                  isValid={
                    state.newConfirmPassword.length > 1 &&
                    validatePassword(state.newConfirmPassword) &&
                    state.newConfirmPassword.trim() == state.newPassword.trim()
                  }
                  isInvalid={
                    state.newConfirmPassword.length > 1 &&
                    !validatePassword(state.newConfirmPassword) &&
                    state.newConfirmPassword.trim() != state.newPassword.trim()
                  }
                  onChange={(event) => handleNewConfirmPasswordChange(event)}
                />
                <Alert
                  show={state.wrongNewConfirmPassword}
                  className="dangerAllert mt-1"
                  variant="danger"
                >
                  {props.t("enterValidPassword")}
                </Alert>
              </Form.Group>
            </Form>
          )}
          <div className="row align-items-center row justify-content-end">
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
            {!state.checkPassword ? (
              <div className="col-2">
                <Button
                  name="en"
                  size="sm"
                  className="btn button success_button settings-button fs-5"
                  disabled={
                    state.wrongOldPassword ||
                    state.wrongNewPassword ||
                    state.wrongNewConfirmPassword ||
                    state.oldPassword.length == 0 ||
                    state.newPassword.length == 0 ||
                    state.newConfirmPassword.length == 0
                  }
                  onClick={(e) => changePassword(e)}
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
