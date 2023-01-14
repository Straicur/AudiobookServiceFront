import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import md5 from "md5";
import { ForgotPasswordModal } from "../ForgotPasswordModal";
import { useTokenStore } from "../../../store";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import {
  handleEmailChange,
  handlePasswordChange,
  validateEmail,
} from "./Events";

export default function LoginForm(props) {
  const [formState, setFormState] = useState({
    modal: false,
  });

  const { t, i18n } = useTranslation();

  const fetchData = useTokenStore();

  const navigate = useNavigate();

  const fetchToken = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;

    if (form.checkValidity() === true && validateEmail(form[0].value)) {
      props.setState({
        ...props.state,
        validated: true,
      });

      fetchData.setToken(
        {
          email: props.state.email,
          password: md5(props.state.password),
        },
        props.state,
        props.setState
      );
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
    <section className="vh-100 ">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow rounded-auth">
              <div className="card-body p-5 text-center">
                <div className="mb-md-1 mt-md-2 pb-2">
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
                  <p className="mb-5">{t("welcome")}</p>
                  <p>{t("audiobookService")}</p>
                  <Form
                    noValidate
                    validated={props.state.validated}
                    onSubmit={fetchToken}
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
                            props.state.email.length > 0 &&
                            validateEmail(props.state.email)
                          }
                          isInvalid={
                            props.state.email.length > 0 &&
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
                        controlId="validationCustom01"
                        className="form-outline form-white mb-4"
                      >
                        <Form.Control
                          required
                          type="password"
                          name="Password"
                          placeholder={t("insertPassword")}
                          value={props.state.password}
                          isValid={props.state.password.length > 1}
                          isInvalid={
                            props.state.password.length < 3 &&
                            props.state.password.length > 0
                          }
                          className="form-control form-control-lg"
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

                    <Button
                      variant="dark"
                      size="lg"
                      type="submit"
                      className=" mt-2 form-control"
                      disabled={props.state.isButtonDisabled}
                    >
                      {t("login")}
                    </Button>

                    <hr className="line mt-4 mb-3" />
                    <p className="small fw-bold mb-3 pb-lg-2 ">
                      <a
                        className="link-info"
                        onClick={() =>
                          setFormState({
                            ...formState,
                            modal: !formState.modal,
                          })
                        }
                      >
                        {t("forgotPassword")}
                      </a>
                    </p>
                    <p className="small pb-lg-2 fw-bold mb-0">
                      {t("dontHaveAccount")}{" "}
                      <a
                        className="link-info"
                        onClick={() => navigate("/register")}
                      >
                        {t("registerAccount")}
                      </a>
                    </p>
                  </Form>
                </div>

                {formState.modal ? (
                  <ForgotPasswordModal
                    formState={formState}
                    setFormState={setFormState}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
