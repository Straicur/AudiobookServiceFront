import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function EditUserDataModal(props) {
  const handleClose = () => {
    props.setState({
      ...props.state,
      buttonUserData: !props.state.buttonUserData,
    });
  };

  return (
    <Modal size="lg" show={props.state.buttonUserData} onHide={handleClose}>
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
