import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function EditPasswordModal(props) {
  const handleClose = () => {
    props.setState({
      ...props.state,
      buttonPassword: !props.state.buttonPassword,
    });
  };

  return (
    <Modal size="lg" show={props.state.buttonPassword} onHide={handleClose}>
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
