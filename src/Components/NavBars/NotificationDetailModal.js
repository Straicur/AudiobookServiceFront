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
      <Modal.Body
        style={{
          backgroundColor: "#000000",
        }}
      >
        <div className="row text-white">{props.t("datails")}</div>
        <Button variant="dark" onClick={handleClose}>
          {props.t("close")}
        </Button>
      </Modal.Body>
    </Modal>
  );
}
