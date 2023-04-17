import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { HandleFetch } from "../../../Components/HandleFetch";

export default function EditUserFrom(props) {
  const [passwordState, setPasswordState] = useState({
    password: "",
    sure: false,
  });
  const [phoneNumberState, setPhoneNumberState] = useState({
    phoneNumber: "",
    sure: false,
  });
  //todo tu zostaje mi dadać jakąś prostą walidację dla hasła jak i telefonu
  const banUser = (element) => {
    element.target.classList.add("disabled");
    HandleFetch(
      "http://127.0.0.1:8000/api/admin/user/ban",
      "PATCH",
      {
        userId: props.state.editUserElement.id,
        banned: !props.state.editUserElement.banned,
      },
      props.token
    )
      .then(() => {
        element.target.classList.remove("disabled");

        const newSelcetedUser = {
          active: props.state.editUserElement.active,
          banned: !props.state.editUserElement.banned,
          dateCreated: props.state.editUserElement.dateCreated,
          email: props.state.editUserElement.email,
          firstname: props.state.editUserElement.firstname,
          id: props.state.editUserElement.id,
          lastname: props.state.editUserElement.lastname,
          roles: props.state.editUserElement.roles,
        };

        props.setState({ ...props.state, editUserElement: newSelcetedUser });
      })
      .catch((e) => {
        props.setState({
          ...props.state,
          error: e,
        });
      });
  };
  
  const activateUser = (element) => {
    element.target.classList.add("disabled");
    HandleFetch(
      "http://127.0.0.1:8000/api/admin/user/activate",
      "PATCH",
      {
        userId: props.state.editUserElement.id,
      },
      props.token
    )
      .then(() => {
        element.target.classList.remove("disabled");

        const newSelcetedUser = {
          active: !props.state.editUserElement.active,
          banned: props.state.editUserElement.banned,
          dateCreated: props.state.editUserElement.dateCreated,
          email: props.state.editUserElement.email,
          firstname: props.state.editUserElement.firstname,
          id: props.state.editUserElement.id,
          lastname: props.state.editUserElement.lastname,
          roles: props.state.editUserElement.roles,
        };

        props.setState({ ...props.state, editUserElement: newSelcetedUser });
      })
      .catch((e) => {
        props.setState({
          ...props.state,
          error: e,
        });
      });
  };

  const handlePasswordChange = (event) => {
    setPasswordState({
      ...passwordState,
      password: event.target.value,
    });
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumberState({
      ...phoneNumberState,
      phoneNumber: event.target.value,
    });
  };

  const changeUserPassword = (element) => {
    element.target.classList.add("disabled");
    HandleFetch(
      "http://127.0.0.1:8000/api/admin/user/change/password",
      "PATCH",
      {
        userId: props.state.editUserElement.id,
        newPassword: passwordState.password,
      },
      props.token
    )
      .then(() => {
        element.target.classList.remove("disabled");
        setPasswordState({
          ...passwordState,
          sure: !passwordState.sure,
        });
      })
      .catch((e) => {
        props.setState({
          ...props.state,
          error: e,
        });
      });
  };

  const changeUserPhone = (element) => {
    element.target.classList.add("disabled");
    HandleFetch(
      "http://127.0.0.1:8000/api/admin/user/change/phone",
      "PATCH",
      {
        userId: props.state.editUserElement.id,
        newPhone: phoneNumberState.phoneNumber,
      },
      props.token
    )
      .then(() => {
        element.target.classList.remove("disabled");
        setPhoneNumberState({
          ...phoneNumberState,
          sure: !phoneNumberState.sure,
        });
      })
      .catch((e) => {
        props.setState({
          ...props.state,
          error: e,
        });
      });
  };

  return (
    <div className="row">
      <div className="row">
        <div className="col-8">
          {props.state.editUserElement.active ? (
            <i className="bi bi-bookmark-check-fill"></i>
          ) : (
            <i className="bi bi-bookmark-dash"></i>
          )}
        </div>
        <div className="col-4">
          <Button
            variant="warning"
            size="sm"
            disabled={props.state.editUserElement.active}
            className=" btn button mt-2 text-light"
            onClick={(e) => {
              activateUser(e);
            }}
          >
            {props.t("activate")}
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          {props.state.editUserElement.banned ? (
            <i className="bi bi-shield-fill-exclamation"></i>
          ) : (
            <i className="bi bi-shield-fill-check"></i>
          )}
        </div>
        <div className="col-4">
          <Button
            variant="warning"
            size="sm"
            className=" btn button mt-2 text-light"
            onClick={(e) => {
              banUser(e);
            }}
          >
            {props.state.editUserElement.banned
              ? props.t("unban")
              : props.t("ban")}
          </Button>
        </div>
      </div>
      <InputGroup className="mb-1 input_modal">
        <InputGroup.Text className="input-group-text-new">
          {props.t("changePassword")}
        </InputGroup.Text>
        <Form.Control
          type="password"
          onChange={(event) => {
            handlePasswordChange(event);
          }}
        />
      </InputGroup>
      {passwordState.sure ? (
        <div className="row">
          <div className="col">
            <Button
              name="en"
              size="sm"
              className="btn button px-4 my-1 question_button success_button"
              onClick={(e) => changeUserPassword(e)}
            >
              {props.t("yes")}
            </Button>
          </div>
          <div className="col">
            <Button
              name="en"
              size="sm"
              className="btn button px-4 my-1 question_button danger_button me-2"
              onClick={() =>
                setPasswordState({
                  ...passwordState,
                  sure: !passwordState.sure,
                })
              }
            >
              {props.t("no")}
            </Button>
          </div>
        </div>
      ) : (
        <div className="row my-1">
          <Button
            variant="success"
            size="sm"
            className=" btn button text-light"
            onClick={(e) => {
              setPasswordState({
                ...passwordState,
                sure: !passwordState.sure,
              });
            }}
          >
            {props.t("save")}
          </Button>
        </div>
      )}

      <InputGroup className="mb-1 input_modal">
        <InputGroup.Text className="input-group-text-new">
          {props.t("changePhoneNumber")}
        </InputGroup.Text>
        <Form.Control
          onChange={(event) => {
            handlePhoneNumberChange(event);
          }}
        />
      </InputGroup>
      {phoneNumberState.sure ? (
        <div className="row">
          <div className="col">
            <Button
              name="en"
              size="sm"
              className="btn button px-4 my-1 question_button success_button"
              onClick={(e) => changeUserPhone(e)}
            >
              {props.t("yes")}
            </Button>
          </div>
          <div className="col">
            <Button
              name="en"
              size="sm"
              className="btn button px-4 my-1 question_button danger_button me-2"
              onClick={() =>
                setPhoneNumberState({
                  ...phoneNumberState,
                  sure: !phoneNumberState.sure,
                })
              }
            >
              {props.t("no")}
            </Button>
          </div>
        </div>
      ) : (
        <div className="row my-1">
          <Button
            variant="success"
            size="sm"
            className=" btn button text-light"
            onClick={() => {
              setPhoneNumberState({
                ...phoneNumberState,
                sure: !phoneNumberState.sure,
              });
            }}
          >
            {props.t("save")}
          </Button>
        </div>
      )}
    </div>
  );
}
