import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HandleFetch } from "./HandleFetch";
import { useTokenStore } from "../store";
import md5 from "md5";

export const AdminNavBar = ({ setNavState, navState }) => {
  const { t, i18n } = useTranslation();

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
    return <Navigate to={"/admin"} replace={true} />;
  };

  return (
    <>
      <div className="row navbar">
        <div className="col">
          <Button
            variant="dark"
            size="lg"
            color="dark"
            className=" btn button  mt-2"
            onClick={() => setRedirect({ redirect: true, name: "admin" })}
          >
            Strona główna
          </Button>
          <Button
            variant="dark"
            size="lg"
            color="dark"
            className=" btn button  mt-2"
            onClick={() => setRedirect({ redirect: true, name: "categories" })}
          >
            Kategorie
          </Button>
          <Button
            variant="dark"
            size="lg"
            color="dark"
            className=" btn button  mt-2"
            onClick={() => setRedirect({ redirect: true, name: "audiobooks" })}
          >
            Audiobooki
          </Button>
          <Button
            variant="dark"
            size="lg"
            color="dark"
            className=" btn button  mt-2"
            onClick={() => setRedirect({ redirect: true, name: "users" })}
          >
            Użytkownicy
          </Button>
          <Button
            variant="dark"
            size="lg"
            color="dark"
            className=" btn button  mt-2"
            onClick={() =>
              setRedirect({ redirect: true, name: "notifications" })
            }
          >
            Powiadomienia
          </Button>
        </div>
        <div className="col d-flex justify-content-end  align-items-center">
          <div className="ps-4 ">
            <Button
              name="pl"
              variant={i18n.language === "pl" ? "dark" : "light"}
              size="sm"
              className="btn button"
              value="dsa"
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
              className="btn button"
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
          <Button
            name="logout"
            variant="dark"
            size="sm"
            className="btn button"
            onClick={logout}
          >
            Wyloguj
          </Button>
        </div>

        {redirect.redirect && redirect.name === "audiobooks" ? (
          <Navigate to={"/admin/audiobooks"} replace={true} />
        ) : null}
        {redirect.redirect && redirect.name === "categories" ? (
          <Navigate to={"/admin/categories"} replace={true} />
        ) : null}
        {redirect.redirect && redirect.name === "notifications" ? (
          <Navigate to={"/admin/notifications"} replace={true} />
        ) : null}
        {redirect.redirect && redirect.name === "users" ? (
          <Navigate to={"/admin/users"} replace={true} />
        ) : null}
        {redirect.redirect && redirect.name === "admin"
          ? NavigateToMain()
          : null}
        {redirect.redirect && redirect.name == "login" ? (
          <Navigate to={"/login"} replace={true} />
        ) : null}
      </div>
    </>
  );
};
