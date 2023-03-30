import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function SearchAudiobooksOffCanvas(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    props.setState({
      ...props.state,
      searchModal: !props.state.searchModal,
    });
  };

  return (
    <Offcanvas show={show} onHide={handleClose} className="bg-dark text-light" backdrop="static">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{props.t("filters")}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        
      </Offcanvas.Body>
    </Offcanvas>
  );
}
