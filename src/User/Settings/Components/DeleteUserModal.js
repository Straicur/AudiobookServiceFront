import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function DeleteUserModal(props) {
  const handleClose = () => {
    props.setState({
      ...props.state,
      buttonDeletejsonModal: !props.state.buttonDelete,
    });
  };

  return (
    <Modal size="lg" show={props.state.buttonDelete} onHide={handleClose}>
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
