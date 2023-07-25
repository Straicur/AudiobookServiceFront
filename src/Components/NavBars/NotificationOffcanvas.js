import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./NotificationOffcanvas.css";
import { v4 as uuidv4 } from "uuid";
import { CreateDate } from "../../Components/CrateDate";
import Badge from "react-bootstrap/Badge";
import { useNavigate } from "react-router-dom";
import { HandleFetch } from "../HandleFetch";

export default function NotificationOffcanvas(props) {
  const [show, setShow] = useState(true);

  const navigate = useNavigate();

  const handleClose = () => {
    props.setState({
      ...props.state,
      notificationsOffCanvas: !props.state.notificationsOffCanvas,
    });
    setShow(false);
  };

  const createNotificationType = (element) => {
    switch (element) {
      case 1: {
        return props.t("notificationTypeNormal");
      }
      case 2: {
        return props.t("notificationTypeAdmin");
      }
      case 3: {
        return props.t("notificationTypeProposed");
      }
      case 4: {
        return props.t("notificationTypeNewCategory");
      }
      case 5: {
        return props.t("notificationTypeNewAudiobook");
      }
      case 6: {
        return props.t("notificationTypeUserDeleteDecline");
      }
    }
  };
  // to Dla admina ma przekierować do odpowiednich
  // User ma mieć w większości do main odwołania
  //sprawdź powiadomienia bo coś chyba źle dodaje
  const navigateUser = (notification) => {
    switch (notification.notificationType) {
      case 1: {
      }
      case 2: {
        break;
      }
      case 3: {
        navigate(`/main`);
        break;
      }
      case 4: {
        navigate(`/admin/category/${notification.categoryKey}`);
        break;
      }
      case 5: {
        navigate(`/admin/audiobook/${notification.actionId}`);
        break;
      }
      case 6: {
        navigate(`/admin/users`);
        break;
      }
    }
  };
  const activateNotification = (notification) => {
    if (notification.active == undefined) {
      HandleFetch(
        "/notification/activate",
        "PUT",
        {
          notificationId: notification.id,
        },
        props.token,
        props.i18n.language
      )
        .then((data) => {
          //todo tu zmieniam ten status
          // Wykmiń bo tu będzie problem z tym że kilka może się odświerzyć !!!
          // Lepiej będzie pobrać całą listę od nowa (ale to po jakimś odstępie czsowym może )
          // I dorobić w Adminie że jak znajdzie to podmienia
        })
        .catch((e) => {});
    }
  };

  const loadMore = () => {
    props.setState({
      ...props.state,
      page: props.state.page + 1,
      refresh: true,
    });
  };
  const renderNotifications = () => {
    let returnArray = [];

    if (props.notifications != undefined) {
      returnArray.push(
        props.notifications.map((notification) => {
          return (
            <div
              key={uuidv4()}
              className="border border-light border-1 rounded-4 text-white p-3 my-3"
              onMouseEnter={() => activateNotification(notification)}
            >
              <div className="row mb-1">
                <div className="col">
                  {notification.active != undefined ? (
                    <Badge bg="secondary">{props.t("displayed")}</Badge>
                  ) : (
                    <Badge bg="success">{props.t("new")}</Badge>
                  )}
                </div>
                <div className="col">
                  {props.t("dateAdd")} {": "}
                  {CreateDate(notification.dateAdd)}
                </div>
              </div>
              <div className="row mb-1">
                <div className="col">
                  {props.t("type")}
                  {": "}
                  {createNotificationType(notification.notificationType)}
                </div>
                {notification.notificationType == 1 ||
                notification.notificationType == 2 ? null : (
                  <div className="col">
                    <Button
                      name="logout"
                      variant="light"
                      size="sm"
                      className="btn button rounded detail-notification-btn"
                      onClick={() => navigateUser(notification)}
                    >
                      {props.t("details")}
                    </Button>
                  </div>
                )}
              </div>

              {notification.text != undefined ? (
                <div className="row">
                  <div className="col">
                    {props.t("text")}
                    {": "}
                    {notification.text}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })
      );
    }

    return returnArray;
  };
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      className="bg-dark text-light off_canvas_with"
      backdrop="static"
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <h2>{props.t("notifications")}</h2>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="pt-0 notification-heigth overflow-auto">
        <hr></hr>
        <div>{renderNotifications()}</div>
        {props.state.page + 1 < props.state.maxPage ? (
          <div className="text-white row align-items-center justify-content-center ">
            <div
              className="col-4 align-self-center text-center rounded-4 load-more-btn"
              onClick={() => loadMore()}
            >
              <span className="pe-2">{props.t("loadMore")} </span>
              <i className="bi-arrow-down-square"></i>
            </div>
          </div>
        ) : null}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
