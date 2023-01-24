import React from "react";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { HandleFetch } from "./HandleFetch";
import { useTokenStore } from "../store";
import { useNavigate } from "react-router-dom";

export const AdminNavBar = () => {
  const { t, i18n } = useTranslation();

  const tokenStore = useTokenStore();

  const token = useTokenStore((state) => state.token);

  const navigate = useNavigate();

  const logout = async () => {
    const url = "http://127.0.0.1:8000/api/logout";
    const jsonData = {};
    const method = "POST";

    await HandleFetch(url, method, jsonData, token).finally(() => {
      tokenStore.removeToken();
      navigate("/login");
    });
  };

  return (
    <div className="row navbar">
      <div className="col">
        <Button
          variant="dark"
          size="lg"
          color="dark"
          className=" btn button  mt-2"
          onClick={() => navigate("/admin")}
        >
          {t("mainPage")}
        </Button>
        <Button
          variant="dark"
          size="lg"
          color="dark"
          className=" btn button  mt-2"
          onClick={() => navigate("/admin/categories")}
        >
          {t("categories")}
        </Button>
        <Button
          variant="dark"
          size="lg"
          color="dark"
          className=" btn button  mt-2"
          onClick={() => navigate("/admin/audiobooks")}
        >
          {t("audiobooks")}
        </Button>
        <Button
          variant="dark"
          size="lg"
          color="dark"
          className=" btn button  mt-2"
          onClick={() => navigate("/admin/users")}
        >
          {t("users")}
        </Button>
        <Button
          variant="dark"
          size="lg"
          color="dark"
          className=" btn button  mt-2"
          onClick={() => navigate("/admin/notifications")}
        >
          {t("notifications")}
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
            onClick={() => i18n.changeLanguage("pl")}
          >
            PL
          </Button>
          <Button
            name="en"
            variant={i18n.language === "en" ? "dark" : "light"}
            size="sm"
            className="btn button"
            onClick={() => i18n.changeLanguage("en")}
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
          {t("logout")}
        </Button>
      </div>
    </div>
  );
};
