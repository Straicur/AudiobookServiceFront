import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function NotificationDetailModal(props) {
  const handleClose = () => {
    props.setState({
      ...props.state,
      notificationModal: !props.state.notificationModal,
    });
  };

  return (
    <Modal
      size="lg"
      show={props.state.notificationModal}
      onHide={handleClose}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.t("datails")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className=""></Modal.Body>
    </Modal>
  );
}
