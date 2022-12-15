import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HandleFetch } from "./HandleFetch";
import { useTokenStore } from "../store";

export const UserNavBar = ({ setNavState, navState }) => {
  const { t, i18n } = useTranslation();

  const tokenStore = useTokenStore();

  const token = useTokenStore((state) => state.token);

  const roles = useTokenStore((state) => state.roles);

  const navigate = useNavigate();

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

  useEffect(() => {
    if (redirect.redirect) {
      navigate(redirect.name);
    }
  }, [redirect.redirect]);

  return (
    <>
      <div className="row navbar navbar-dark bg-dark">
        <div className="col">
          <Button
            variant="dark"
            size="lg"
            color="dark"
            className=" btn button  mt-2"
            onClick={() => setRedirect({ redirect: true, name: "/main" })}
          >
            Strona główna
          </Button>
          <Button
            variant="dark"
            size="lg"
            color="dark"
            className=" btn button  mt-2"
            onClick={() => setRedirect({ redirect: true, name: "/myList" })}
          >
            Moja lista
          </Button>
          {roles.some((name) => name === "Administrator") ? (
            <Button
              variant="success"
              size="lg"
              color="dark"
              className=" btn button  mt-2"
              onClick={() => setRedirect({ redirect: true, name: "/admin" })}
            >
              Administracja
            </Button>
          ) : null}
        </div>
        <div className="col d-flex justify-content-end  align-items-center">
          <div className="ps-3 me-3">
            <Button
              name="pl"
              variant={i18n.language === "pl" ? "dark" : "light"}
              size="sm"
              className="btn button m-1"
              onClick={() => i18n.changeLanguage("pl")}
            >
              PL
            </Button>
            <Button
              name="en"
              variant={i18n.language === "en" ? "dark" : "light"}
              size="sm"
              className="btn button m-1"
              onClick={() => i18n.changeLanguage("en")}
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
                      setRedirect({ redirect: true, name: "/user/settings" })
                    }
                  >
                    Personalizuj
                  </option>
                  <option
                    value="1"
                    onClick={() =>
                      setRedirect({ redirect: true, name: "/help" })
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
    </>
  );
};
