import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function EditUserDataModal(props) {
  const [state, setState] = useState({
    phoneNumber: "",
    firstName: "",
    lastName: "",
    sure: "",
  });

  const handleClose = () => {
    props.setState({
      ...props.state,
      buttonUserData: !props.state.buttonUserData,
    });
  };

  useEffect(() => {
    if (props.state.error != null) {
      throw props.state.error;
    }
  }, [props.state.error]);

  return (
    <Modal
      size="lg"
      show={props.state.buttonUserData}
      onHide={handleClose}
      centered
    >
      <Modal.Body
        style={{
          backgroundColor: "#000000",
        }}
      >
        <div className="text-white">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
          </Form>
          <div className="row align-items-center row justify-content-end">
            <div className="col-2">
              <Button
                name="en"
                size="sm"
                className="btn button success_button settings-button fs-5"
                onClick={() =>
                  props.setState({
                    ...props.state,
                    buttonEmail: !props.state.buttonPassword,
                  })
                }
              >
                {props.t("save")}
              </Button>
            </div>
            <div className="col-2">
              <Button
                name="en"
                size="sm"
                className="btn button danger_button settings-button fs-5"
                onClick={() => handleClose()}
              >
                {props.t("cancel")}
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
