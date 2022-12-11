import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { handleFetch } from "../Components/handleFetch";
import md5 from "md5";
import RegisterNotificationModal from "./RegisterNotificationModal";

export default function Register() {
  const { t, i18n } = useTranslation();

  const [state, setState] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    firstname: "",
    lastname: "",
    isButtonDisabled: true,
    helperText: 0,
    redirect: false,
    redirectTo: "",
    changeLang: i18n.language,
    modalShow: false,
  });

  const [emailModal, setEmailModal] = useState(false);

  const handleRegister = () => {
    if (
      state.password === state.confirmPassword &&
      validateEmail(state.email) &&
      validatePassword(state.password)
    ) {
      const url = "http://127.0.0.1:8000/api/register";

      const jsonData = {
        email: state.email,
        phoneNumber: state.phoneNumber,
        firstname: state.firstname,
        lastname: state.lastname,
        password: md5(state.password),
      };
      const method = "PUT";

      handleFetch(url, jsonData, method)
        .then((data) => {
          if (data) {
            setState({
              ...state,
              helperText: 200,
              modalShow: true,
            });
          }
        })
        .catch((e) => {
          if (e) {
            console.log(e.message);
            setState({
              ...state,
              helperText: parseInt(e.message),
            });
          }
        });
    }
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleRegister();
    }
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function validatePassword(pass) {
    const re = /^(=.*[A-Za-z])(=.*\d)(=.*[@$!%*#&])[A-Za-z\d@$!%*#&]{8,}$/;
    return re.test(pass);
  }

  const handleEmailChange = (event) => {
    setState({
      ...state,
      email: event.target.value,
    });
  };

  const redirectToLogin = (event) => {
    setState({ redirect: true, redirectTo: "/login" });
  };

  const handleConfirmPasswordChange = (event) => {
    setState({
      ...state,
      confirmPassword: event.target.value,
    });
  };
  const handlePasswordChange = (event) => {
    setState({
      ...state,
      password: event.target.value,
    });
  };

  useEffect(() => {
    if (
      state.email.trim() &&
      state.password.trim() &&
      state.confirmPassword.trim() &&
      state.password.trim() === state.confirmPassword.trim()
    ) {
      setState({ ...state, isButtonDisabled: false });
    } else {
      setState({ ...state, isButtonDisabled: true });
    }
  }, [state.email, state.password, state.confirmPassword]);

  useEffect(() => {
    if (state.changeLang != null) {
      i18n.changeLanguage(state.changeLang);
    }
  }, [state.changeLang]);

  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card auth-bg text-light rounded-auth">
                <div className="card-body p-5 text-center">
                  <div className="mt-md-1 pb-2">
                    {/* <div>
                          <Button
                              name="pl"
                              variant={i18n.language === "pl""light":"dark"}
                              size="sm"
                              className="btn button"
                              value="dsa"
                              onClick={()=>setState({
                                  ...state,
                                  changeLang:"pl"
                              })}>
                              PL
                          </Button>
                          <Button
                              name="en"
                              variant={i18n.language  === "en""light":"dark"}
                              size="sm"
                              className="btn button"
                              onClick={()=>setState({
                                  ...state,
                                  changeLang:"en"
                              })}>
                              EN
                          </Button>
                      </div>
                      <hr className="line"/> */}
                    <p className="mb-5">{t("UserRegisterWelcome")}</p>

                    <div className="form-outline form-white mb-4">
                      <input
                        id="typeEmailX"
                        type="email"
                        name="email"
                        placeholder={t("email")}
                        value={state.email}
                        className="form-control form-control-lg"
                        onChange={handleEmailChange}
                        onKeyPress={handleKeyPress}
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        id="typePasswordX"
                        type="password"
                        name="Password"
                        placeholder={t("Password")}
                        value={state.password}
                        className="form-control form-control-lg "
                        onChange={handlePasswordChange}
                        onKeyPress={handleKeyPress}
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        id="typePasswordX"
                        type="password"
                        name="Password"
                        placeholder={t("ConfirmPassowrd")}
                        value={state.confirmPassword}
                        className="form-control form-control-lg "
                        onChange={handleConfirmPasswordChange}
                        onKeyPress={handleKeyPress}
                      />
                    </div>

                    <hr></hr>
                    <Button
                      variant="dark"
                      size="lg"
                      className="btn auth-btn px-5 form-control"
                      onClick={() => handleRegister()}
                      disabled={state.isButtonDisabled}
                    >
                      {t("registerButton")}
                    </Button>

                    <p className="mt-4 small pb-lg-2 fw-bold mb-0">
                      {t("UserRegisterLoginText")}{" "}
                      <a onClick={redirectToLogin} className="link-info">
                        {t("UserRegisterLoginTextSec")}
                      </a>
                    </p>
                  </div>

                  {state.modalShow ? (
                    <RegisterNotificationModal
                      setModalState={setState}
                      state={state}
                    />
                  ) : null}
                  
                  {state.redirect ? (
                    <Redirect
                      to={
                        state.redirectTo !== undefined ? state.redirectTo : ""
                      }
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
