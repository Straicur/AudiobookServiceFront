import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useTranslation } from "react-i18next";
import { HandleFetch } from "../HandleFetch";
import { useTokenStore } from "../../store";
import { useNavigate } from "react-router-dom";
import { useNotificationsListStore } from "../../store";
import NotificationOffcanvas from "./NotificationOffcanvas";
import Badge from "react-bootstrap/Badge";
import "./AdminNavBar.css";

export const AdminNavBar = () => {
  const { t, i18n } = useTranslation();

  const [state, setState] = useState({
    page: 0,
    limit: 10,
    maxPage: 0,
    notificationModal: false,
    refresh: false,
    error: null,
  });

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
  const dateUpdate = useNotificationsListStore((state) => state.dateUpdate);

  const fetchNotifications = () => {
    HandleFetch(
      "/notifications",
      "POST",
      {
        page: state.page,
        limit: state.limit,
      },
      token,
      i18n.language
    )
      .then((data) => {
        notificationsListStore.addNotifications(data.systemNotifications);
        notificationsListStore.setNewNotification(data.newNotifications);
      })
      .catch((e) => {
        notificationsListStore.addNotifications([]);
        notificationsListStore.setNewNotification(0);
      });
  };
  const openNitificationList = () => {
    //Wysuwanie listy Offcanvas i tam niech się mi wyświetla cała ta lista
    //I na końcu te dopisz
    setState({
      ...state,
      notificationModal: !state.notificationModal,
    });
  };

  useEffect(() => {
    setState({ ...state, json: notifications });

    // if (dateUpdate < Date.now()) {
      fetchNotifications();
    // }
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
        {/* Cały ten element ma być clicable i dodaj mu hover na jaśniejszy
            Pobieranie noramlnie Fetchem i zapisuje to do pamięci z odświerzaniem co 5 minut
            Najpierw sprawdzam czy coś tam jest i jeśli nie to pobieram 
            Jeśli tak to sprawdzam czas czy jest mniejszy i jak tak to pobieram
            Ogólnie ten czas update robie przy pracy z powiadomieniami żeby mi to za bardzo się nie wydłużało i żeby nie było za kótkie
            I Zmieniam przy okazji tą ilośc odczytanych w zależności od tamtych detali


            Pobieram ilość z pamięci i po kliknięciu pobieram pierwszą stronę, na końcu listy napis "Pokaż więcej"
            I po tym ładuję więcej i tyle, znikać ma po dojściu do max 
            Pomyśl też nad przeczytaniem tego powiadomienia bo to będzie mi pokazywać ilość wszystkich a powinno tylko 
            najnowsze raczej, czyli te które nie są przeczytanie. 

            Po kliknięciu w powiadomienia pokazuje się modal który wyświetli detale i nie wyłącza mi się ta lista wogóle jak coś.
        */}
        <div
          className="row mx-1 pt-3 ms-1 me-3 align-items-center justify-content-center notification-row"
          onClick={() => openNitificationList()}
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
        {state.notificationModal ? (
          <NotificationOffcanvas state={state} setState={setState} notifications={notifications} t={t} />
        ) : null}
      </div>
    </div>
  );
};
