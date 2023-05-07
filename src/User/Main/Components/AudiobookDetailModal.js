import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function AudiobookDetailModal(props) {
  const handleClose = () => {
    props.setAudiobooksState({
      ...props.audiobooksState,
      detailModal: !props.audiobooksState.detailModal,
      detailModalAudiobook:null
    });
  };


  return (
    <Modal size="lg" show={props.audiobooksState.detailModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.t("")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="">{}</Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          {props.t("close")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
