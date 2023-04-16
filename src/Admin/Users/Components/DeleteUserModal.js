import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function DeleteUserModal(props) {
  const handleClose = () => {
    props.setState({
      ...props.state,
      deleteUsersModal: !props.state.deleteUsersModal,
    });
  };

  return (
    <Modal size="lg" show={props.state.deleteUsersModal} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{props.t("jsonData")}</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          {props.t("close")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
