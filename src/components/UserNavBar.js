import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Navigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
import { HandleFetch } from "./HandleFetch";
import { useTokenStore } from "../store";

export const UserNavBar = ({ setNavState, navState }) => {
  // const { t, i18n } = useTranslation();

  const tokenStore = useTokenStore();

  const token = useTokenStore((state) => state.token);

  const roles = useTokenStore((state) => state.roles);

  const [redirect, setRedirect] = useState({
    redirect: false,
    name: "",
  });

  const logout = async () => {
    const url = "http://127.0.0.1:8000/api/logout";
    const jsonData = {};
    const method = "POST";
    await HandleFetch(url, jsonData, method, token)
      .then((data) => {
        if (data) {
          tokenStore.removeToken();
          setRedirect({ redirect: true, name: "login" });
        }
      })
      .catch((e) => {
        if (e) {
          console.log(e);
        }
      });
  };

  const NavigateToMain = () => {
    setRedirect({ redirect: false, name: "" });
    return <Navigate to={"/main"} replace={true} />;
  };
  const NavigateToSettings = () => {
    setRedirect({ redirect: false, name: "" });
    return <Navigate to={"/user/settings"} replace={true} />;
  };
  const NavigateToMyList = () => {
    setRedirect({ redirect: false, name: "" });
    return <Navigate to={"/myList"} replace={true} />;
  };
  const NavigateToHelp = () => {
    setRedirect({ redirect: false, name: "" });
    return <Navigate to={"/help"} replace={true} />;
  };
  const NavigateToLogin = () => {
    setRedirect({ redirect: false, name: "" });
    return <Navigate to={"/login"} replace={true} />;
  };
  const NavigateToAdmin = () => {
    setRedirect({ redirect: false, name: "" });
    return <Navigate to={"/admin"} replace={true} />;
  };
  return (
    <>
      <div className="row navbar navbar-dark bg-dark">
        <div className="col">
          <Button
            variant="dark"
            size="lg"
            color="dark"
            className=" btn button  mt-2"
            onClick={() => setRedirect({ redirect: true, name: "main" })}
          >
            Strona główna
          </Button>
          <Button
            variant="dark"
            size="lg"
            color="dark"
            className=" btn button  mt-2"
            onClick={() => setRedirect({ redirect: true, name: "myList" })}
          >
            Moja lista
          </Button>
          {roles.some((name) => name === "Administrator") ? (
            <Button
              variant="success"
              size="lg"
              color="dark"
              className=" btn button  mt-2"
              onClick={() => setRedirect({ redirect: true, name: "admin" })}
            >
              Administracja
            </Button>
          ) : null}
        </div>
        <div className="col d-flex justify-content-end  align-items-center">
          <div className="ps-3 me-3">
            <Button
              name="pl"
              // variant={i18n.language === "pl" ? "dark" : "light"}
              size="sm"
              className="btn button m-1"
              onClick={() =>
                setNavState({
                  ...navState,
                  changeLang: "pl",
                })
              }
            >
              PL
            </Button>
            <Button
              name="en"
              // variant={i18n.language === "en" ? "dark" : "light"}
              size="sm"
              className="btn button m-1"
              onClick={() =>
                setNavState({
                  ...navState,
                  changeLang: "en",
                })
              }
            >
              EN
            </Button>
          </div>
          <div>
            <div className="row ">
              <div className="col-2 d-flex align-items-center">
                <i className="bi bi-person-square" />
              </div>
              <div className="col-10 d-flex align-items-center">
                <select
                  className="form-select bg-dark text-light"
                  aria-label="Default select example"
                >
                  <option value={"DEFAULT"} hidden={true}>
                    Ustawienia
                  </option>
                  <option
                    value="1"
                    onClick={() =>
                      setRedirect({ redirect: true, name: "settings" })
                    }
                  >
                    Personalizuj
                  </option>
                  <option
                    value="1"
                    onClick={() =>
                      setRedirect({ redirect: true, name: "help" })
                    }
                  >
                    Pomoc
                  </option>
                  <option value="3" onClick={() => logout()}>
                    Wyloguj
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {redirect.redirect && redirect.name === "settings" ? NavigateToSettings() : null}
      {redirect.redirect && redirect.name === "main" ? NavigateToMain() : null}
      {redirect.redirect && redirect.name === "myList" ? NavigateToMyList(): null}
      {redirect.redirect && redirect.name === "help" ? NavigateToHelp() : null}
      {redirect.redirect && redirect.name === "login" ? NavigateToLogin() : null}
      {redirect.redirect && redirect.name === "admin" ? NavigateToAdmin() : null}
    </>
  );
};
