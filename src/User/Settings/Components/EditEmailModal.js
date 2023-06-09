import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function EditEmailModal(props) {
  const handleClose = () => {
    props.setState({
      ...props.state,
      buttonEmail: !props.state.buttonEmail,
    });
  };

  return (
    <Modal size="lg" show={props.state.buttonEmail} onHide={handleClose}>
        <Modal.Body
        style={{
          backgroundColor: "#000000",
        }}
      >
        <div className="text-white">fg</div>
      </Modal.Body>
    </Modal>
  );
}
