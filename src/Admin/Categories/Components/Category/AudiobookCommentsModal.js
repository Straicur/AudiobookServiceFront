import Modal from "react-bootstrap/Modal";
import "react-h5-audio-player/lib/styles.css";
import { useAudiobookComments } from "../../../../Components/Providers/AudiobookProviders/AudiobookCommentsProvider";
import RenderCommentsList from "../Category/RenderCommentsList";

export default function AudiobookCommentsModal(props) {
  const [audiobookComments, setAudiobookComments, setRefetchState] = useAudiobookComments();

  const handleClose = () => {
    props.setState({
      ...props.state,
      detailCommentsAudiobookModal: !props.state.detailCommentsAudiobookModal,
      detailAudiobookElement: null,
    });
  };
  return (
    <Modal
      show={props.state.detailCommentsAudiobookModal}
      onHide={handleClose}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="bg-dark"></Modal.Header>
      <Modal.Body className="bg-dark">
        <div className="row d-flex justify-content-center text-light text-center">
          <h1>{props.t("comments")}</h1>
        </div>
        <hr className="text-light"></hr>
        <RenderCommentsList state={props.state} setState={props.setState} t={props.t} token={props.token} comments = {audiobookComments} setRefetchState={setRefetchState}/>
      </Modal.Body>
    </Modal>
  );
}
