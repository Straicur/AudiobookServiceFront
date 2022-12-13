import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HandleFetch } from "./HandleFetch";
import { useTokenStore } from "../store";
import md5 from "md5";

export const UserNavBar = ({ setNavState, navState }) => {
  const { t, i18n } = useTranslation();

  const token = useTokenStore((state) => state.token);
  
  const [redirect, setRedirect] = useState({
    redirect: false,
    name: "",
  });

  const logout = async () => {
    const url = "http://127.0.0.1:8000/api/logout";
    const jsonData = {};
    const method = "POST";
    await HandleFetch(url, jsonData, method,token)
      .then((data) => {
        if (data) {
          setRedirect({ redirect: true, name: "login" });
        }
      })
      .catch((e) => {
        if (e) {
          console.log(e);
        }
      });
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
            {t("Home")}
          </Button>
          <Button
            variant="dark"
            size="lg"
            color="dark"
            className=" btn button  mt-2"
            onClick={() => setRedirect({ redirect: true, name: "myList" })}
          >
            {t("MyList")}
          </Button>
        </div>
        <div className="col d-flex justify-content-end  align-items-center">
          <div className="ps-3 me-3">
            <Button
              name="pl"
              variant={i18n.language === "pl" ? "dark" : "light"}
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
              variant={i18n.language === "en" ? "dark" : "light"}
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
                    {t("UserOptions")}
                  </option>
                  <option
                    value="1"
                    onClick={() =>
                      setRedirect({ redirect: true, name: "settings" })
                    }
                  >
                    {t("Settings")}
                  </option>
                  <option
                    value="1"
                    onClick={() =>
                      setRedirect({ redirect: true, name: "help" })
                    }
                  >
                    {t("Help")}
                  </option>
                  <option
                    value="2"
                    onClick={() =>
                      setRedirect({ redirect: true, name: "myList" })
                    }
                  >
                    {t("MyList")}
                  </option>
                  <option value="3" onClick={() => logout()}>
                    {t("Logout")}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {redirect.redirect && redirect.name === "settings" ? (
        <Navigate to={"/user/settings"} />
      ) : null}
      {redirect.redirect && redirect.name === "main" ? (
        <Navigate to={"/main"} />
      ) : null}
      {redirect.redirect && redirect.name === "myList" ? (
        <Navigate to={"/myList"} />
      ) : null}
      {redirect.redirect && redirect.name === "help" ? (
        <Navigate to={"/help"} />
      ) : null}
      {redirect.redirect && redirect.name === "login" ? (
        <Navigate to={"/login"} />
      ) : null}
    </>
  );
}
