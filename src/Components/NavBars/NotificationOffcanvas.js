import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useLastSearchStore } from "../../store";
import "./NotificationOffcanvas.css";
import { v4 as uuidv4 } from "uuid";

export default function NotificationOffcanvas(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    props.setState({
      ...props.state,
      notificationModal: !props.state.notificationModal,
    });
    setShow(false);
  };

  const renderNotifications = () => {
    let returnArray = [];

    if (props.notifications != undefined) {
      returnArray.push(
        props.notifications.map((notification) => {
          return (
            <div key={uuidv4()}  className="border border-dark border-1 rounded text-white">
              {notification.notificationType}
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
        {console.log(props.state)}
        <div>{renderNotifications()}</div>
        {props.state.page +1 == props.state.maxPage ? <div className="text-white">csds</div>:null}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
