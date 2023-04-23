import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function AddNotificationModal(props) {
  const handleClose = () => {
    props.setState({
      ...props.state,
      addNotificationModal: !props.state.addNotificationModal,
    });
  };
  //Dodawanie jest bardziej skomplikowane i tu muszę dodać jakieś opcje wyboru pobocznie id akcji !!!
  return (
    <Modal size="sm" show={props.state.addNotificationModal} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{props.t("addNotification")}</Modal.Title>
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
