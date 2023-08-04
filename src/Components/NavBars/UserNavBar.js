import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useTranslation } from "react-i18next";
import { HandleFetch } from "../HandleFetch";
import { useTokenStore } from "../../store";
import { useNavigate } from "react-router-dom";
import { useNotificationsListStore } from "../../store";
import NotificationOffcanvas from "./UserNotificationOffCanvas";
import Badge from "react-bootstrap/Badge";
import "./UserNavBar.css";

export const UserNavBar = () => {
  const [state, setState] = useState({
    page: 0,
    limit: 6,
    maxPage: 0,
    notifications: [],
    notificationsOffCanvas: false,
    refresh: false,
    error: null,
  });

  const { t, i18n } = useTranslation();

  const tokenStore = useTokenStore();

  const token = useTokenStore((state) => state.token);

  const roles = useTokenStore((state) => state.roles);

  const navigate = useNavigate();

  const logout = async () => {
    const url = "/logout";
    const jsonData = {};
    const method = "POST";

    HandleFetch(url, method, jsonData, token, i18n.language).finally(() => {
      tokenStore.removeToken();
      navigate("/login");
    });
  };
  const notificationsListStore = useNotificationsListStore();

  const notifications = useNotificationsListStore(
    (state) => state.notifications
  );
  const newNotifications = useNotificationsListStore(
    (state) => state.newNotifications
  );
  const dateUpdate = useNotificationsListStore((state) => state.dateUpdate);

  const fetchNotifications = () => {
    notificationsListStore.removeNotifications();
    //todo wyłap błąd wczytywania za dużej ilości powiadomień
    for (let index = 0; index < state.page + 1; index++) {
      HandleFetch(
        "/notifications",
        "POST",
        {
          page: index,
          limit: state.limit,
        },
        token,
        i18n.language
      )
        .then((data) => {
          setState({
            ...state,
            page: data.page,
            maxPage: data.maxPage,
            notifications: state.notifications.concat(data.systemNotifications),
            refresh: false,
          });

          for (const notification of data.systemNotifications) {
            notificationsListStore.addNotification(notification);
          }

          notificationsListStore.setNewNotification(data.newNotifications);
        })
        .catch((e) => {
          notificationsListStore.setNewNotification(0);
        });
    }
  };
  const openNotificationsList = () => {
    setState({
      ...state,
      notificationsOffCanvas: !state.notificationsOffCanvas,
    });
  };

  useEffect(() => {
    if (state.refresh) {
      fetchNotifications();
    }
  }, [state.refresh]);

  useEffect(() => {
    if (dateUpdate < Date.now()) {
      setState({
        ...state,
        notifications: notifications,
      });
    } else {
      fetchNotifications();
    }
  }, []);

  return (
    <>
      <div className="row navbar navbar-dark bg-dark">
        <div className="col">
          <Button
            variant="dark"
            size="lg"
            color="dark"
            className=" btn button  mt-2"
            onClick={() => navigate("/main")}
          >
            {t("mainPage")}
          </Button>
          <Button
            variant="dark"
            size="lg"
            color="dark"
            className=" btn button  mt-2"
            onClick={() => navigate("/myList")}
          >
            {t("myList")}
          </Button>
          {roles.some((name) => name == "Administrator") ? (
            <Button
              variant="success"
              size="lg"
              color="dark"
              className=" btn button  mt-2"
              onClick={() => navigate("/admin")}
            >
              {t("administration")}
            </Button>
          ) : null}
        </div>
        <div className="col d-flex justify-content-end  align-items-center">
          <ButtonGroup className="ps-3 me-3">
            <Button
              name="pl"
              size="sm"
              className={
                i18n.language == "pl"
                  ? "btn  m-1 button_light"
                  : "btn  m-1 button_dark"
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
                  ? "btn  m-1 button_light"
                  : "btn  m-1 button_dark"
              }
              onClick={() => i18n.changeLanguage("en")}
            >
              EN
            </Button>
          </ButtonGroup>
          <div
            className="row mx-1 pt-3 ms-1 me-3 text-white align-items-center justify-content-center notification-row"
            onClick={() => openNotificationsList()}
          >
            <div className="col nav-col justify-content-end  align-items-center pe-2">
              <h6> {t("notifications")}</h6>
            </div>
            <div className="col nav-col justify-content-end  align-items-center">
              <h6>
                <Badge bg="secondary">{newNotifications}</Badge>
              </h6>
            </div>
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
                    {t("settings")}
                  </option>
                  <option value="1" onClick={() => navigate("/user/settings")}>
                    {t("accountSettings")}
                  </option>
                  <option value="1" onClick={() => navigate("/help")}>
                    {t("help")}
                  </option>
                  <option value="3" onClick={() => logout()}>
                    {t("logout")}
                  </option>
                </select>
              </div>
              {state.notificationsOffCanvas ? (
                <NotificationOffcanvas
                  state={state}
                  setState={setState}
                  dateUpdate={dateUpdate}
                  notifications={notifications}
                  t={t}
                  token={token}
                  i18n={i18n}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
