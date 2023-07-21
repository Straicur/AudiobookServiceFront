import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useLastSearchStore } from "../../store";

export default function NotificationOffcanvas(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    props.setState({
      ...props.state,
      notificationModal: !props.state.notificationModal,
    });
    setShow(false);
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
          <h2 className="">{props.t("notifications")}</h2>

        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="pt-0">
        <hr></hr>
        {console.log(props.notifications)}
        <div>Cos</div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
