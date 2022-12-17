import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HandleFetch } from "../../components/HandleFetch";
import md5 from "md5";

export default function Forgot() {
  const { t, i18n } = useTranslation();

  const { id } = useParams();

  const navigate = useNavigate();

  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
    errors: 0,
    changeLang: i18n.language,
    modal: false,
    isButtonDisabled: false,
  });

  function validatePassword(pass) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(pass);
  }

  const handleNewPassword = async () => {
    if (
      validatePassword(state.password) &&
      validatePassword(state.confirmPassword) &&
      state.password == state.confirmPassword
    ) {
      const url = "http://127.0.0.1:8000/api/user/reset/password/confirm";
      const jsonData = { userId: id, password: md5(state.password) };
      const method = "PATCH";

      await HandleFetch(url, method, jsonData)
        .then((data) => {
          if (data) {
            navigate("/login");
          }
        })
        .catch((e) => {
          if (e) {
            setState({
              ...state,
              errors: parseInt(e.message),
            });
          }
        });
    } else {
      setState({
        ...state,
        errors: 500,
      });
    }
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
  useEffect(() => {
    if (
      state.password.trim() != "" &&
      state.confirmPassword.trim() != "" &&
      state.password == state.confirmPassword
    ) {
      setState({ ...state, isButtonDisabled: false });
    } else {
      setState({ ...state, isButtonDisabled: true });
    }
  }, [state.password, state.confirmPassword]);

  useEffect(() => {
    if (state.changeLang != null) {
      i18n.changeLanguage(state.changeLang);
    }
  }, [state.changeLang]);

  return (
    <div className="container d-flex align-items-center justify-content-center mt-3 ">
      <div className="card position-relative shadow p-3 mb-5">
        <div>
          <h1 className="py-1">Podaj nowe hasło</h1>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={state.password}
            className="form-control mt-4"
            onChange={handlePasswordChange}
          />
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            value={state.confirmPassword}
            className="form-control mt-4"
            onChange={handleConfirmPasswordChange}
          />
          <hr className="mt-4"></hr>
          <Button
            variant="dark"
            onClick={handleNewPassword}
            disabled={state.isButtonDisabled}
            className="mt-2 mb-3 form-control"
          >
            Zmień hasło
          </Button>
        </div>
      </div>
    </div>
  );
}
