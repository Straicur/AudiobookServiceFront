import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useTranslation } from "react-i18next";
import { HandleFetch } from "../HandleFetch";
import { useTokenStore } from "../../store";
import { useNavigate } from "react-router-dom";
import "./AdminNavBar.css";

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
      <div className="col-8">
        <Button
          variant="dark"
          size="lg"
          color="dark"
          className=" btn button mt-2 mx-2"
          onClick={() => navigate("/admin")}
        >
          {t("mainPage")}
        </Button>
        <Button
          variant="dark"
          size="lg"
          color="dark"
          className=" btn button mt-2 mx-2"
          onClick={() => navigate("/admin/categories")}
        >
          {t("categories")}
        </Button>
        <Button
          variant="dark"
          size="lg"
          color="dark"
          className=" btn button mt-2 mx-2"
          onClick={() => navigate("/admin/audiobooks")}
        >
          {t("audiobooks")}
        </Button>
        <Button
          variant="dark"
          size="lg"
          color="dark"
          className=" btn button mt-2 mx-2"
          onClick={() => navigate("/admin/users")}
        >
          {t("users")}
        </Button>
        <Button
          variant="dark"
          size="lg"
          color="dark"
          className=" btn button mt-2 mx-2"
          onClick={() => navigate("/admin/notifications")}
        >
          {t("notifications")}
        </Button>
        <Button
          variant="dark"
          size="lg"
          color="dark"
          className=" btn button mt-2 mx-2"
          onClick={() => navigate("/main")}
        >
          {t("userPanel")}
        </Button>
      </div>
      <div className="col-4 d-flex justify-content-end  align-items-center">
        <ButtonGroup className="ps-3 me-3">
          <Button
            name="pl"
            size="sm"
            className={
              i18n.language == "pl"
                ? "btn  m-1 admin_button_dark"
                : "btn  m-1 admin_button_light"
            }
            onClick={() => i18n.changeLanguage("pl")}
          >
            PL
          </Button>
          <Button
            name="en"
            size="sm"
            className={
              i18n.language == "en"
              ? "btn  m-1 admin_button_dark"
              : "btn  m-1 admin_button_light"
            }
            onClick={() => i18n.changeLanguage("en")}
          >
            EN
          </Button>
        </ButtonGroup>
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
