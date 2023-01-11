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

export default function Form(props) {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    modal: false,
  });

  const handleRegister = () => {
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
    }
  };

  useEffect(() => {
    //todo Zostaje mi to na koniec do dopisania walidacja pól 
    // Wykorzystaj tu bootstrapowe errory (te czerwone prostokąty)

    if (props.state.error != null) {
      throw props.state.error
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

                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      name="email"
                      placeholder={t("insertEmail")}
                      value={props.state.email}
                      className="form-control form-control-lg"
                      onChange={(event) =>
                        handleEmailChange(event, props.state, props.setState)
                      }
                    />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      name="Password"
                      placeholder={t("insertPassword")}
                      value={props.state.password}
                      className="form-control form-control-lg "
                      onChange={(event) =>
                        handlePasswordChange(event, props.state, props.setState)
                      }
                    />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      name="passwordConfirm"
                      placeholder={t("insertPasswordConfirm")}
                      value={props.state.confirmPassword}
                      className="form-control form-control-lg "
                      onChange={(event) =>
                        handleConfirmPasswordChange(
                          event,
                          props.state,
                          props.setState
                        )
                      }
                    />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="phoneNumber"
                      name="phoneNumber"
                      placeholder={t("insertPhone")}
                      value={props.state.phoneNumber}
                      className="form-control form-control-lg "
                      onChange={(event) =>
                        handlePhoneNumber(event, props.state, props.setState)
                      }
                    />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="firstname"
                      name="firstname"
                      placeholder={t("insertFirstname")}
                      value={props.state.firstname}
                      className="form-control form-control-lg "
                      onChange={(event) =>
                        handleFirstname(event, props.state, props.setState)
                      }
                    />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="lastname"
                      name="lastname"
                      placeholder={t("insertLastname")}
                      value={props.state.lastname}
                      className="form-control form-control-lg "
                      onChange={(event) =>
                        handleLastname(event, props.state, props.setState)
                      }
                    />
                  </div>

                  <hr></hr>
                  <Button
                    variant="dark"
                    size="lg"
                    className="btn auth-btn px-5 form-control"
                    onClick={() => handleRegister()}
                    disabled={props.state.isButtonDisabled}
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
      {formState.modal ? <RegisterNotificationModal /> : null}
    </section>
  );
}
