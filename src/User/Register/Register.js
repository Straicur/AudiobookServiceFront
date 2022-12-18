import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HandleFetch } from "../../components/HandleFetch";
import md5 from "md5";
import { RegisterNotificationModal } from "./RegisterNotificationModal";

export default function Register() {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    firstname: "",
    lastname: "",
    isButtonDisabled: true,
    helperText: 0,
    changeLang: i18n.language,
    modalShow: false,
    modalText: "",
  });

  const handleRegister = () => {
    if (
      state.password == state.confirmPassword &&
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

      HandleFetch(url, method, jsonData)
        .then((data) => {
          if (data) {
            setState({
              ...state,
              helperText: 200,
              modalShow: true,
              modalText: t("mailSended"),
            });
          }
        })
        .catch((e) => {
          if (e) {
            setState({
              ...state,
              helperText: parseInt(e.message),
              modalShow: true,
              modalText: t("accountInSystem"),
            });
          }
        });
    }
  };

  const handleKeyPress = (event) => {
    if (event.keyCode == 13 || event.which == 13) {
      state.isButtonDisabled || handleRegister();
    }
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function validatePassword(pass) {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(pass);
  }

  const handleEmailChange = (event) => {
    setState({
      ...state,
      email: event.target.value,
    });
  };

  const handlePasswordChange = (event) => {
    setState({
      ...state,
      password: event.target.value,
    });
  };

  const handleConfirmPasswordChange = (event) => {
    setState({
      ...state,
      confirmPassword: event.target.value,
    });
  };

  const handlePhoneNumber = (event) => {
    setState({
      ...state,
      phoneNumber: event.target.value,
    });
  };

  const handleFirstname = (event) => {
    setState({
      ...state,
      firstname: event.target.value,
    });
  };

  const handleLastname = (event) => {
    setState({
      ...state,
      lastname: event.target.value,
    });
  };

  useEffect(() => {
    if (
      state.email.trim() != "" &&
      state.password.trim() != "" &&
      state.confirmPassword.trim() != "" &&
      state.firstname.trim() != "" &&
      state.lastname.trim() != "" &&
      state.phoneNumber.trim() != "" &&
      state.password.trim() == state.confirmPassword.trim()
    ) {
      setState({ ...state, isButtonDisabled: false });
    } else {
      setState({ ...state, isButtonDisabled: true });
    }
  }, [
    state.email,
    state.password,
    state.confirmPassword,
    state.lastname,
    state.phoneNumber,
    state.password,
  ]);

  return (
    <>
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

                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        name="email"
                        placeholder={t("insertEmail")}
                        value={state.email}
                        className="form-control form-control-lg"
                        onChange={handleEmailChange}
                        onKeyPress={handleKeyPress}
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        name="Password"
                        placeholder={t("insertPassword")}
                        value={state.password}
                        className="form-control form-control-lg "
                        onChange={handlePasswordChange}
                        onKeyPress={handleKeyPress}
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        name="passwordConfirm"
                        placeholder={t("insertPasswordConfirm")}
                        value={state.confirmPassword}
                        className="form-control form-control-lg "
                        onChange={handleConfirmPasswordChange}
                        onKeyPress={handleKeyPress}
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="phoneNumber"
                        name="phoneNumber"
                        placeholder={t("insertPhone")}
                        value={state.phoneNumber}
                        className="form-control form-control-lg "
                        onChange={handlePhoneNumber}
                        onKeyPress={handleKeyPress}
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="firstname"
                        name="firstname"
                        placeholder={t("insertFirstname")}
                        value={state.firstname}
                        className="form-control form-control-lg "
                        onChange={handleFirstname}
                        onKeyPress={handleKeyPress}
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="lastname"
                        name="lastname"
                        placeholder={t("insertLastname")}
                        value={state.lastname}
                        className="form-control form-control-lg "
                        onChange={handleLastname}
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
                      {t("register")}
                    </Button>

                    <p className="mt-4 small pb-lg-2 fw-bold mb-0">
                      {t("haveAccount")}{" "}
                      <a onClick={()=>navigate("/login")} className="link-info">
                        {t("loginToAccount")}
                      </a>
                    </p>
                  </div>

                  {state.modalShow ? (
                    <RegisterNotificationModal
                      setModalState={setState}
                      modalstate={state}
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
