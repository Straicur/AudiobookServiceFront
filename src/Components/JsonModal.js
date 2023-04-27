import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./JsonModal.css"

export default function JsonModal(props) {
  const handleClose = () => {
    props.setState({
      ...props.state,
      jsonModal: !props.state.jsonModal,
    });
  };

  const format = () => {
    return (
      <div>
        <pre className="preStyle">{JSON.stringify(props.state.json, null, 2)}</pre>
      </div>
    );
  };
  return (
    <Modal size="lg" show={props.state.jsonModal} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{props.t("jsonData")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="background_json">{format()}</Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          {props.t("close")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
