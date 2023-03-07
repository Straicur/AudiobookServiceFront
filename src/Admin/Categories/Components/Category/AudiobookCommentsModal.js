import Modal from "react-bootstrap/Modal";
import "react-h5-audio-player/lib/styles.css";
import { v4 as uuidv4 } from "uuid";
import { useAudiobookComments } from "../../../../Components/Providers/AudiobookProviders/AudiobookCommentsProvider";
import { HandleFetch } from "../../../../Components/HandleFetch";

export default function AudiobookCommentsModal(props) {
  const [audiobookComments, setAudiobookComments] = useAudiobookComments();

  const getCommentList = () => {
    let comments = [];
    if (audiobookComments != null) {
      if (audiobookComments.audiobookCommentGetModels != undefined) {
        audiobookComments.audiobookCommentGetModels.forEach((comment) => {
          comments.push(createComment(comment));
        });
      }
    }

    if (
      audiobookComments == null ||
      audiobookComments.audiobookCommentGetModels == undefined
    ) {
      comments.push(
        <div key={uuidv4()} className="row text-center">
          <div className="col-md-6 offset-md-3 ">
            <h3>{props.t("empty")}</h3>
          </div>
        </div>
      );
    }

    return (
      <div className="row text-light d-flex justify-content-center mx-1">
        {comments}
      </div>
    );
  };

  const createComment = (comment) => {
    return (
      <div
        key={uuidv4()}
        className="row border border-secondary mb-1"
        onClick={
          comment.childComments > 0
            ? (e) => createChildComment(e, comment)
            : undefined
        }
        data-clicable={true}
      >
        <div className="row">
          {comment.childComments > 0 ? (
            <div className="col-1">
              <i className="p-2 bi bi-arrow-right-square "></i>
            </div>
          ) : (
            <div className="col-1"></div>
          )}

          <div className="col-4">{props.t("owner")}:</div>
          <div className="col-7">{comment.userModel.email}</div>
        </div>
        <div className="row">
          <div className="col">{props.t("comment")}:</div>
          <div className="col">{comment.comment}</div>
        </div>
      </div>
    );
  };

  const createChildComment = (element, comment) => {
    element.stopPropagation();
    let parent = element.currentTarget;
    // HandleFetch(
    //   "http://127.0.0.1:8000/api/audiobook/comment/get/detail",
    //   "POST",
    //   {
    //     audiobookCommentId: comment.id,
    //   },
    //   props.token
    // )
    //   .then((data) => {

    //     data.audiobookCommentGetDetailModels.forEach(childComment => {
    //       console.log(element.currentTarget)
    //       console.log(element)
    //       parent.appendChild(createComment(childComment))
    //     });
    //   })
    //   .catch((e) => {
    //     console.log(e)
    //     props.setState({
    //       ...props.state,
    //       error: e,
    //     });
    //     handleClose();
    //   });
  };

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

        {getCommentList()}
      </Modal.Body>
    </Modal>
  );
}
