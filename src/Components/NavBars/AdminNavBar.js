import React, { useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useTranslation } from "react-i18next";
import { HandleFetch } from "../HandleFetch";
import { useTokenStore } from "../../store";
import { useNavigate } from "react-router-dom";
import { useNotificationsListStore } from "../../store";
import NotificationOffcanvas from "./AdminNotificationOffcanvas";
import Badge from "react-bootstrap/Badge";
import "./AdminNavBar.css";

export const AdminNavBar = () => {
  const [state, setState] = useState({
    page: 0,
    limit: 6,
    maxPage: 0,
    notificationsOffCanvas: false,
    refresh: false,
    error: null,
  });

  const notificationsList = useRef([]);

  const update = useRef(false);

  const { t, i18n } = useTranslation();

  const tokenStore = useTokenStore();

  const token = useTokenStore((state) => state.token);

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
  const maxPage = useNotificationsListStore((state) => state.maxPage);
  const dateUpdate = useNotificationsListStore((state) => state.dateUpdate);
  
  const fetchNotifications = () => {
    for (let index = 0; index <= state.page; index++) {
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
            refresh: false,
          });
          data.systemNotifications.forEach((element) => {
            let found =
              notificationsList.current.filter((x) => x.id == element.id)
                .length > 0;
            if (!found) {
              notificationsList.current = [
                ...notificationsList.current,
                element,
              ];
            }
          });

          if (index == 0) {
            notificationsListStore.addNotifications(data.systemNotifications);
          }

          notificationsListStore.setNewNotification(data.maxPage);
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
    if (dateUpdate > Date.now()) {
      notificationsList.current = notifications;
      setState({
        ...state,
        maxPage: maxPage,
      });
    } else {
      fetchNotifications();
    }
  }, []);

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
        <div
          className="row mx-1 pt-3 ms-1 me-3 align-items-center justify-content-center admin-notification-row"
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
        <Button
          name="logout"
          variant="dark"
          size="sm"
          className="btn button"
          onClick={logout}
        >
          {t("logout")}
        </Button>
        {state.notificationsOffCanvas ? (
          <NotificationOffcanvas
            state={state}
            setState={setState}
            dateUpdate={dateUpdate}
            notificationsList={notificationsList}
            t={t}
            token={token}
            i18n={i18n}
          />
        ) : null}
      </div>
    </div>
  );
};
