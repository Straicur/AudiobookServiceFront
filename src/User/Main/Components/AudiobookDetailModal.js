import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAudiobookRating } from "../../../Components/Providers/AudiobookProviders/AudiobookRatingProvider";
import { useAudiobookDetail } from "../../../Components/Providers/AudiobookProviders/AudiobookUserDetailProvider";
import { useAudiobookPart } from "../../../Components/Providers/AudiobookProviders/AudiobookPartProvider";

export default function AudiobookDetailModal(props) {
  const handleClose = () => {
    props.setAudiobooksState({
      ...props.audiobooksState,
      detailModal: !props.audiobooksState.detailModal,
      detailModalAudiobook: null,
      detailModalCover: null,
    });
  };
  const [audiobookDetail, setAudiobookDetail, setAudiobookDetailRefetch] =
    useAudiobookDetail();
  const [audiobookRating, setAudiobookRating, setRefetchRatingState] =
    useAudiobookRating();
  const [audiobookPart, setAudiobookPart, setRefetchPartState] =
    useAudiobookPart();
    
  return (
    <Modal
      size="lg"
      show={props.audiobooksState.detailModal}
      onHide={handleClose}
    >
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
