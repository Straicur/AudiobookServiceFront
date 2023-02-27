import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HandleFetch } from "../../../Components/HandleFetch";
import md5 from "md5";
import { RegisterNotificationModal } from "./RegisterNotificationModal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  handleEmailChange,
  handlePasswordChange,
  handleConfirmPasswordChange,
  handlePhoneNumber,
  handleFirstname,
  handleLastname,
} from "./Events";

export default function RegisterForm(props) {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    modal: false,
  });

  const handleRegister = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      props.state.password == props.state.confirmPassword &&
      validateEmail(props.state.email) &&
      validatePassword(props.state.password)
    ) {
      const url = "http://127.0.0.1:8000/api/register";
      const jsonData = {
        email: props.state.email,
        phoneNumber: props.state.phoneNumber,
        firstname: props.state.firstname,
        lastname: props.state.lastname,
        password: md5(props.state.password),
      };
      const method = "PUT";

      HandleFetch(url, method, jsonData)
        .then((data) => {
          if (data) {
            setFormState({
              ...formState,
              modal: true,
            });
          }
        })
        .catch((e) => {
          props.setState({
            ...props.state,
            error: e,
          });
        });
    } else {
      props.setState({
        ...props.state,
        isButtonDisabled: true,
        validated: false,
      });
    }
  };

  useEffect(() => {
    if (props.state.error != null) {
      throw props.state.error;
    }
  }, [props.state.error]);

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card rounded-auth">
              <div className="card-body p-5 text-center">
                <div className="mt-md-1 pb-2">
                  <div>
                    <Button
                      name="pl"
                      variant={i18n.language == "pl" ? "light" : "dark"}
                      size="sm"
                      className="btn button"
                      value="dsa"
                      onClick={() => i18n.changeLanguage("pl")}
                    >
                      PL
                    </Button>
                    <Button
                      name="en"
                      variant={i18n.language == "en" ? "light" : "dark"}
                      size="sm"
                      className="btn button"
                      onClick={() => i18n.changeLanguage("en")}
                    >
                      EN
                    </Button>
                  </div>
                  <hr className="line" />
                  <p className="mb-5">{t("pleaseEmailAndPassword")}</p>
                  <Form
                    noValidate
                    validated={props.state.validated}
                    onSubmit={handleRegister}
                    autoComplete="off"
                  >
                    <Row className="mb-3">
                      <Form.Group
                        controlId="validationCustom01"
                        className="form-outline form-white mb-4"
                      >
                        <Form.Control
                          required
                          type="email"
                          name="email"
                          placeholder={t("insertEmail")}
                          value={props.state.email}
                          className="form-control form-control-lg"
                          isValid={
                            props.state.email.length > 1 &&
                            validateEmail(props.state.email)
                          }
                          isInvalid={
                            props.state.email.length > 1 &&
                            !validateEmail(props.state.email)
                          }
                          onChange={(event) =>
                            handleEmailChange(
                              event,
                              props.state,
                              props.setState
                            )
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {t("enterValidEmail")}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        controlId="validationCustom02"
                        className="form-outline form-white mb-4"
                      >
                        <Form.Control
                          required
                          type="password"
                          name="Password"
                          placeholder={t("insertPassword")}
                          value={props.state.password}
                          className="form-control form-control-lg "
                          isValid={
                            props.state.password.length > 1 &&
                            validatePassword(props.state.password) &&
                            props.state.password.trim() ==
                              props.state.confirmPassword.trim()
                          }
                          isInvalid={
                            props.state.password.length > 1 &&
                            !validatePassword(props.state.password) &&
                            props.state.password.trim() !=
                              props.state.confirmPassword.trim()
                          }
                          onChange={(event) =>
                            handlePasswordChange(
                              event,
                              props.state,
                              props.setState
                            )
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {t("enterValidPassword")}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        controlId="validationCustom03"
                        className="form-outline form-white mb-4"
                      >
                        <Form.Control
                          required
                          type="password"
                          name="passwordConfirm"
                          placeholder={t("insertPasswordConfirm")}
                          value={props.state.confirmPassword}
                          className="form-control form-control-lg "
                          isValid={
                            props.state.confirmPassword.length > 1 &&
                            validatePassword(props.state.confirmPassword) &&
                            props.state.password.trim() ==
                              props.state.confirmPassword.trim()
                          }
                          isInvalid={
                            props.state.confirmPassword.length > 1 &&
                            !validatePassword(props.state.confirmPassword) &&
                            props.state.password.trim() !=
                              props.state.confirmPassword.trim()
                          }
                          onChange={(event) =>
                            handleConfirmPasswordChange(
                              event,
                              props.state,
                              props.setState
                            )
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {t("enterValidConfirmPassword")}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        controlId="validationCustom04"
                        className="form-outline form-white mb-4"
                      >
                        <Form.Control
                          required
                          type="phoneNumber"
                          name="phoneNumber"
                          placeholder={t("insertPhone")}
                          value={props.state.phoneNumber}
                          className="form-control form-control-lg "
                          isValid={
                            props.state.phoneNumber.length > 1 &&
                            validatePhoneNumber(props.state.phoneNumber)
                          }
                          isInvalid={
                            props.state.phoneNumber.length > 1 &&
                            !validatePhoneNumber(props.state.phoneNumber)
                          }
                          onChange={(event) =>
                            handlePhoneNumber(
                              event,
                              props.state,
                              props.setState
                            )
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {t("enterValidPhoneNumber")}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        controlId="validationCustom05"
                        className="form-outline form-white mb-4"
                      >
                        <Form.Control
                          required
                          type="firstname"
                          name="firstname"
                          placeholder={t("insertFirstname")}
                          value={props.state.firstname}
                          className="form-control form-control-lg "
                          isValid={props.state.firstname.length > 3}
                          isInvalid={
                            props.state.firstname.length > 1 &&
                            props.state.firstname.length < 3
                          }
                          onChange={(event) =>
                            handleFirstname(event, props.state, props.setState)
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {t("enterValidFirstName")}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        controlId="validationCustom06"
                        className="form-outline form-white mb-4"
                      >
                        <Form.Control
                          type="lastname"
                          name="lastname"
                          placeholder={t("insertLastname")}
                          value={props.state.lastname}
                          className="form-control form-control-lg "
                          isValid={props.state.lastname.length > 3}
                          isInvalid={
                            props.state.lastname.length > 1 &&
                            props.state.lastname.length < 3
                          }
                          onChange={(event) =>
                            handleLastname(event, props.state, props.setState)
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {t("enterValidLastName")}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <hr></hr>
                    <Button
                      variant="dark"
                      size="lg"
                      className="btn auth-btn px-5 form-control"
                      type="submit"
                      // onClick={() => handleRegister()}
                      disabled={props.state.isButtonDisabled}
                    >
                      {t("register")}
                    </Button>

                    <p className="mt-4 small pb-lg-2 fw-bold mb-0">
                      {t("haveAccount")}{" "}
                      <a
                        onClick={() => navigate("/login")}
                        className="link-info"
                      >
                        {t("loginToAccount")}
                      </a>
                    </p>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {formState.modal ? <RegisterNotificationModal /> : null}
    </section>
  );
}
