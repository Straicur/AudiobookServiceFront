import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HandleFetch } from "../../../components/HandleFetch";
import md5 from "md5";
import { RegisterNotificationModal } from "./RegisterNotificationModal";
import {
  validateEmail,
  validatePassword,
  handleEmailChange,
  handlePasswordChange,
  handleConfirmPasswordChange,
  handlePhoneNumber,
  handleFirstname,
  handleLastname,
} from "./Events";

export default function Form(state,setState) {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    firstname: "",
    lastname: "",
    isButtonDisabled: true,
    helperText: 0,
  });

  const handleRegister = () => {
    if (
      formState.password == formState.confirmPassword &&
      validateEmail(formState.email) &&
      validatePassword(formState.password)
    ) {
      const url = "http://127.0.0.1:8000/api/register";
      const jsonData = {
        email: formState.email,
        phoneNumber: formState.phoneNumber,
        firstname: formState.firstname,
        lastname: formState.lastname,
        password: md5(formState.password),
      };
      const method = "PUT";

      HandleFetch(url, method, jsonData)
        .then((data) => {
          if (data) {
            setFormState({
              ...formState,
              helperText: 200,
              modalShow: true,
              modalText: t("mailSended"),
            });
          }
        })
        .catch((e) => {
          if (e) {
            setFormState({
              ...formState,
              helperText: parseInt(e.message),
              modalShow: true,
              modalText: t("accountInSystem"),
            });
          }
        });
    }
  };

  useEffect(() => {
    if (
      formState.email.trim() != "" &&
      formState.password.trim() != "" &&
      formState.confirmPassword.trim() != "" &&
      formState.firstname.trim() != "" &&
      formState.lastname.trim() != "" &&
      formState.phoneNumber.trim() != "" &&
      formState.password.trim() == formState.confirmPassword.trim()
    ) {
      setFormState({ ...formState, isButtonDisabled: false });
    } else {
      setFormState({ ...formState, isButtonDisabled: true });
    }
  }, [
    formState.email,
    formState.password,
    formState.confirmPassword,
    formState.lastname,
    formState.phoneNumber,
    formState.password,
  ]);

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

                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      name="email"
                      placeholder={t("insertEmail")}
                      value={formState.email}
                      className="form-control form-control-lg"
                      onChange={(event)=>handleEmailChange(event,formState,setFormState)}

                    />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      name="Password"
                      placeholder={t("insertPassword")}
                      value={formState.password}
                      className="form-control form-control-lg "
                      onChange={(event)=>handlePasswordChange(event,formState,setFormState)}
                    />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      name="passwordConfirm"
                      placeholder={t("insertPasswordConfirm")}
                      value={formState.confirmPassword}
                      className="form-control form-control-lg "
                      onChange={(event)=>handleConfirmPasswordChange(event,formState,setFormState)}
                    />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="phoneNumber"
                      name="phoneNumber"
                      placeholder={t("insertPhone")}
                      value={formState.phoneNumber}
                      className="form-control form-control-lg "
                      onChange={(event)=>handlePhoneNumber(event,formState,setFormState)}
                    />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="firstname"
                      name="firstname"
                      placeholder={t("insertFirstname")}
                      value={formState.firstname}
                      className="form-control form-control-lg "
                      onChange={(event)=>handleFirstname(event,formState,setFormState)}

                    />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="lastname"
                      name="lastname"
                      placeholder={t("insertLastname")}
                      value={formState.lastname}
                      className="form-control form-control-lg "
                      onChange={(event)=>handleLastname(event,formState,setFormState)}

                    />
                  </div>

                  <hr></hr>
                  <Button
                    variant="dark"
                    size="lg"
                    className="btn auth-btn px-5 form-control"
                    onClick={() => handleRegister()}
                    disabled={formState.isButtonDisabled}
                  >
                    {t("register")}
                  </Button>

                  <p className="mt-4 small pb-lg-2 fw-bold mb-0">
                    {t("haveAccount")}{" "}
                    <a onClick={() => navigate("/login")} className="link-info">
                      {t("loginToAccount")}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {state.modalShow ? (
        <RegisterNotificationModal
          setModalState={setState}
          modalstate={state}
        />
      ) : null}
    </section>
  );
}
