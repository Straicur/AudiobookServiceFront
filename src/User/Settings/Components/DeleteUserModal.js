import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function DeleteUserModal(props) {
  const [state, setState] = useState({
    sure: "",
  });

  const handleClose = () => {
    props.setState({
      ...props.state,
      buttonDelete: !props.state.buttonDelete,
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
      show={props.state.buttonDelete}
      onHide={handleClose}
      centered
    >
      <Modal.Body
        style={{
          backgroundColor: "#000000",
        }}
      >
        <div className="text-white my-5">
          <div className="row align-items-center row justify-content-center">
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
