import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import RenderUserRoles from "./RenderUserRoles";
import EditUserFrom from "./EditUserFrom";

export default function EditUserModal(props) {
  const handleClose = () => {
    props.setState({
      ...props.state,
      editUserModal: !props.state.editUserModal,
      refresh: !props.state.refresh,
    });
  };

  return (
    <Modal
      size="lg"
      show={props.state.editUserModal}
      onHide={handleClose}
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title>
          {props.t("editUser")}: {props.state.editUserElement.email}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row my-1">
          <RenderUserRoles
            state={props.state}
            setState={props.setState}
            t={props.t}
            roles={props.roles}
            token={props.token}
          />
        </div>
        <div className="row">
          <EditUserFrom
            state={props.state}
            setState={props.setState}
            t={props.t}
            token={props.token}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          {props.t("close")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
