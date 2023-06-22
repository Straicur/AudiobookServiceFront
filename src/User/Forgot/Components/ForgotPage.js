import React, { useEffect } from "react";
import { HandleFetch } from "../../../Components/HandleFetch";
import md5 from "md5";
import Button from "react-bootstrap/Button";

export default function ForgotPage( props) {
  function validatePassword(pass) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(pass);
  }

  const handleNewPassword = async () => {
    if (
      validatePassword(props.state.password) &&
      validatePassword(props.state.confirmPassword) &&
      props.state.password == props.state.confirmPassword
    ) {
      const url = "http://127.0.0.1:8000/api/user/reset/password/confirm";
      const jsonData = { userId: props.id, password: md5(props.state.password) };
      const method = "PATCH";

      HandleFetch(url, method, jsonData, props.i18n.language)
        .then((data) => {
          if (data) {
            props.navigate("/login");
          }
        })
        .catch((e) => {
          if (e) {
            props.setState({
              ...props.state,
              error: e,
            });
          }
        });
    } else {
      props.setState({
        ...props.state,
        wrongPassword: true,
      });
    }
  };

  const handlePasswordChange = (event) => {
    props.setState({
      ...props.state,
      password: event.target.value,
    });
  };
  const handleConfirmPasswordChange = (event) => {
    props.setState({
      ...props.state,
      confirmPassword: event.target.value,
    });
  };
  useEffect(() => {
    if (
      props.state.password.trim() != "" &&
      props.state.confirmPassword.trim() != "" &&
      props.state.password == props.state.confirmPassword
    ) {
      props.setState({ ...props.state, isButtonDisabled: false });
    } else {
      props.setState({ ...props.state, isButtonDisabled: true });
    }
  }, [props.state.password, props.state.confirmPassword]);

  useEffect(() => {
    if (props.state.changeLang != null) {
        props.i18n.changeLanguage(props.state.changeLang);
    }
  }, [props.state.changeLang]);

  useEffect(() => {
    if (props.state.error != null) {
      throw props.state.error;
    }
  }, [props.state.error]);

  return (
    <div className="container d-flex align-items-center justify-content-center mt-3 ">
      <div className="card position-relative shadow p-3 mb-5">
        <div>
          <h1 className="py-1">{props.t("insertNewPassword")}</h1>
          <input
            type="password"
            name="password"
            placeholder={props.t("insertPassword")}
            value={props.state.password}
            className="form-control mt-4"
            onChange={handlePasswordChange}
          />
          <input
            type="password"
            name="passwordConfirm"
            placeholder={props.t("insertPasswordConfirm")}
            value={props.state.confirmPassword}
            className="form-control mt-4"
            onChange={handleConfirmPasswordChange}
          />
          <hr className="mt-4"></hr>
          <Button
            variant="dark"
            onClick={handleNewPassword}
            disabled={props.state.isButtonDisabled}
            className="mt-2 mb-3 form-control"
          >
            {props.t("changePassword")}
          </Button>
        </div>
      </div>
    </div>
  );
}
