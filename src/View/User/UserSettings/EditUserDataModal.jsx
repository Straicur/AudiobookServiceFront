import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { HandleFetch } from "../../../Util/HandleFetch";
import Alert from "react-bootstrap/Alert";

export default function EditUserDataModal(props) {
  const [state, setState] = useState({
    phoneNumber: "",
    firstname: "",
    lastname: "",
    sure: false,
    checkChanges: false,
    wrongPhoneNumber: false,
    wrongFirstname: false,
    wrongLastname: false,
  });

  const handleClose = () => {
    props.refetch();

    props.setState({
      ...props.state,
      buttonUserData: !props.state.buttonUserData,
    });
  };

  const changeUserData = (element) => {
    element.target.classList.add("disabled");

    HandleFetch(
      "/user/settings/change",
      "PATCH",
      {
        phoneNumber: state.phoneNumber,
        firstName: state.firstname,
        lastName: state.lastname,
      },
      props.token,
      props.i18n.language
    )
      .then(() => {
        element.target.classList.remove("disabled");
        setState({
          ...state,
          checkChanges: !state.checkChanges,
          sure: !state.sure,
        });
      })
      .catch((e) => {
        props.setState({
          ...props.state,
          error: e,
        });
      });
  };

  const handleFirstnameChange = (event) => {
    setState({
      ...state,
      firstname: event.target.value,
    });
  };
  const handleLastnameChange = (event) => {
    setState({
      ...state,
      lastname: event.target.value,
    });
  };
  const handlePhoneNumberChange = (event) => {
    setState({
      ...state,
      phoneNumber: event.target.value,
    });
  };

  function validateName(name) {
    const re = /^[A-Za-z]+(?:\s[A-Za-z]+)?$/;
    return re.test(name);
  }

  function validateLastName(lastName) {
    const re =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    return re.test(lastName);
  }

  function validatePhone(phoneNumber) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/;
    return re.test(phoneNumber);
  }

  useEffect(() => {
    if (state.firstname.length == 0) {
      setState({ ...state, wrongFirstname: false });
    } else if (!validateName(state.firstname)) {
      setState({ ...state, wrongFirstname: true });
    } else {
      setState({ ...state, wrongFirstname: false });
    }
  }, [state.firstname]);

  useEffect(() => {
    if (state.lastname.length == 0) {
      setState({ ...state, wrongLastname: false });
    } else if (!validateLastName(state.lastname)) {
      setState({ ...state, wrongLastname: true });
    } else {
      setState({ ...state, wrongLastname: false });
    }
  }, [state.lastname]);

  useEffect(() => {
    if (state.phoneNumber.length == 0) {
      setState({ ...state, wrongPhoneNumber: false });
    } else if (!validatePhone(state.phoneNumber)) {
      setState({ ...state, wrongPhoneNumber: true });
    } else {
      setState({ ...state, wrongPhoneNumber: false });
    }
  }, [state.phoneNumber]);

  useEffect(() => {
    if (props.state.error != null) {
      throw props.state.error;
    }
  }, [props.state.error]);

  useEffect(() => {
    setState({
      ...state,
      phoneNumber: props.state.phoneNumber,
      firstname: props.state.firstname,
      lastname: props.state.lastname,
    });
  }, [props]);

  return (
    <Modal
      size="lg"
      show={props.state.buttonUserData}
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
          {state.checkChanges ? (
            <div className="fs-3 text-center my-3">
              {props.t("checkUserData")}
            </div>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>{props.t("firstname")}</Form.Label>
                <Form.Control
                  type="text"
                  isValid={
                    state.firstname.length > 1 && validateName(state.firstname)
                  }
                  isInvalid={
                    state.firstname.length > 1 && !validateName(state.firstname)
                  }
                  value={state.firstname}
                  onChange={(event) => handleFirstnameChange(event)}
                />
                <Alert
                  show={state.wrongFirstname}
                  className="dangerAllert mt-1 text-center"
                  variant="danger"
                >
                  {props.t("enterValidFirstName")}
                </Alert>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{props.t("lastname")}</Form.Label>
                <Form.Control
                  type="text"
                  isValid={
                    state.lastname.length > 1 &&
                    validateLastName(state.lastname)
                  }
                  isInvalid={
                    state.lastname.length > 1 &&
                    !validateLastName(state.lastname)
                  }
                  value={state.lastname}
                  onChange={(event) => handleLastnameChange(event)}
                />
                <Alert
                  show={state.wrongLastname}
                  className="dangerAllert mt-1 text-center"
                  variant="danger"
                >
                  {props.t("enterValidLastName")}
                </Alert>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{props.t("phoneNumber")}</Form.Label>
                <Form.Control
                  type="tel"
                  isValid={
                    state.phoneNumber.length > 1 &&
                    validatePhone(state.phoneNumber)
                  }
                  isInvalid={
                    state.phoneNumber.length > 1 &&
                    !validatePhone(state.phoneNumber)
                  }
                  value={state.phoneNumber}
                  onChange={(event) => handlePhoneNumberChange(event)}
                />
                <Alert
                  show={state.wrongPhoneNumber}
                  className="dangerAllert mt-1 text-center"
                  variant="danger"
                >
                  {props.t("enterValidPhoneNumber")}
                </Alert>
              </Form.Group>
            </Form>
          )}
          <div className="row align-items-center row justify-content-end">
            {!state.sure ? (
              <div className="col-2">
                <Button
                  name="en"
                  size="sm"
                  className="btn button danger_button settings-button fs-5 sure_button"
                  onClick={() => handleClose()}
                >
                  {props.t("close")}
                </Button>
              </div>
            ) : null}
            {!state.checkChanges ? (
              state.sure ? (
                <div className="col-4">
                  <div className="row justify-content-center">
                    <div className="col-6">
                      <Button
                        disabled={
                          state.wrongFirstname ||
                          state.wrongLastname ||
                          state.wrongPhoneNumber ||
                          state.firstname.length == 0 ||
                          state.lastname.length == 0 ||
                          state.phoneNumber.length == 0
                        }
                        className="btn button success_button settings-button fs-5 sure_button"
                        onClick={(e) => changeUserData(e)}
                      >
                        {props.t("yes")}
                      </Button>
                    </div>
                    <div className="col-6">
                      <Button
                        // onClick={() => doubleClickRating()}
                        className="btn button danger_button settings-button fs-5 sure_button"
                        size="sm"
                        onClick={() =>
                          setState({
                            ...state,
                            sure: !state.sure,
                          })
                        }
                      >
                        {props.t("no")}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-2">
                  <Button
                    name="en"
                    size="sm"
                    disabled={
                      state.wrongFirstname ||
                      state.wrongLastname ||
                      state.wrongPhoneNumber ||
                      state.firstname.length == 0 ||
                      state.lastname.length == 0 ||
                      state.phoneNumber.length == 0
                    }
                    className="btn button success_button settings-button fs-5"
                    onClick={() =>
                      setState({
                        ...state,
                        sure: !state.sure,
                      })
                    }
                  >
                    {props.t("save")}
                  </Button>
                </div>
              )
            ) : null}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
