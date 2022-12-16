import React, { useState, useEffect } from "react";
import { useTokenStore } from "../../store";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import md5 from "md5";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
import { useTranslation } from "react-i18next";

export default function UserLogin() {
  const [state, setState] = useState({
    email: "",
    password: "",
    isButtonDisabled: true,
    helperText: 0,
    redirect: false,
    redirectTo: "",
    modal: false,
  });

  const { t, i18n } = useTranslation();

  const token = useTokenStore((state) => state.token);

  const fetchData = useTokenStore();

  const navigate = useNavigate();

  const fetchToken = (e) => {
    e.preventDefault();

    fetchData.setToken({
      email: state.email,
      password: md5(state.password),
    });
  };

  const handleEmailChange = (event) => {
    setState({
      ...state,
      email: event.target.value,
    });
  };

  const redirectToRegister = (event) => {
    setState({ ...state, redirect: true, redirectTo: "/register" });
  };

  const handlePasswordChange = (event) => {
    setState({
      ...state,
      password: event.target.value,
    });
  };

  useEffect(() => {
    if (token !== "") {
      setState({
        ...state,
        redirect: true,
        redirectTo: "/main",
      });
    }
  }, [token]);

  useEffect(() => {
    if (state.email.trim() && state.password.trim()) {
      setState({ ...state, isButtonDisabled: false });
    } else {
      setState({ ...state, isButtonDisabled: true });
    }
  }, [state.email, state.password]);

  useEffect(() => {
    if (state.redirect) {
      navigate(state.redirectTo);
    }
  }, [state.redirect]);

  return (
    <>
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
                    <form onSubmit={fetchToken} autoComplete="off">
                      <div className="form-outline form-white mb-4">
                        <input
                          type="email"
                          name="email"
                          placeholder={t("insertEmail")}
                          value={state.email}
                          className="form-control form-control-lg"
                          onChange={handleEmailChange}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          name="Password"
                          placeholder={t("insertPassword")}
                          value={state.password}
                          className="form-control form-control-lg"
                          onChange={handlePasswordChange}
                        />
                      </div>

                      <Button
                        variant="dark"
                        size="lg"
                        type="submit"
                        className=" mt-2 form-control"
                        disabled={state.isButtonDisabled}
                      >
                        {t("login")}
                      </Button>
                      <hr className="line mt-4 mb-3" />
                      <p className="small fw-bold mb-3 pb-lg-2 ">
                        <a
                          className="link-info"
                          onClick={() =>
                            setState({
                              ...state,
                              modal: !state.modal,
                            })
                          }
                        >
                       {t("forgotPassword")}
                        </a>
                      </p>
                      <p className="small pb-lg-2 fw-bold mb-0">
                      {t("dontHaveAccount")}{" "}
                        <a className="link-info" onClick={redirectToRegister}>
                        {t("registerAccount")}
                        </a>
                      </p>
                    </form>
                  </div>
                  {state.modal ? (
                    <ForgotPasswordModal
                      setUserState={setState}
                      userState={state}
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
