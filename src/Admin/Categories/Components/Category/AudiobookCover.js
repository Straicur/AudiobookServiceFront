import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { HandleFetch } from "../../../../Components/HandleFetch";
import { Buffer } from "buffer";

export default function AudiobookCover(props) {
  const handleOnFileChange = (e) => {
    if (e.target.files) {
      let file = e.target.files[0];

      if (
        file.type == "image/png" ||
        file.type == "image/jpeg" ||
        file.type == "image/jpg"
      ) {
        props.setStateModal({ ...props.stateModal, file: file });
      }
    }
  };

  const editCover = () => {
    if (props.stateModal.file != null) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target.result instanceof ArrayBuffer) {
          let pattern = "jpeg|png|jpg/i";
          let result = props.stateModal.file.type.match(pattern);

          if (result != null) {
            let buf = new Uint8Array(e.target.result);
            let b64 = Buffer.from(buf).toString("base64");

            HandleFetch(
              "/admin/audiobook/change/cover",
              "PATCH",
              {
                type: result[0],
                base64: b64,
                audiobookId: props.audiobookDetail.id,
              },
              props.token,
              props.i18n.language
            )
              .then(() => {
                props.setAudiobookCoverRefetch(true);
                props.setStateModal({ ...props.stateModal, file: null });
              })
              .catch((e) => {
                props.setState({
                  ...props.state,
                  error: e,
                });
                props.handleClose();
              });
          }
        }
      };
      if (props.stateModal.file != null) {
        reader.readAsArrayBuffer(props.stateModal.file);
      }
    }
  };

  return (
    <div className="row ms-1">
      <div className="row ">
        <img
          src={
            props.audiobookCover == null
              ? "/noImg.jpg"
              : window.URL.createObjectURL(new Blob([props.audiobookCover]))
          }
          className="card-img-top"
          alt="..."
        />
      </div>
      <div className="row d-flex justify-content-center">
        <Form.Group controlId="formFileSm" className="my-1">
          <Form.Control onChange={handleOnFileChange} type="file" size="sm" />
        </Form.Group>
        <Button
          name="en"
          variant="secondary"
          size="sm"
          className="btn button px-4 my-2 modal_img_button"
          disabled={props.stateModal.file == null}
          onClick={editCover}
        >
          {props.t("editCover")}
        </Button>
      </div>
    </div>
  );
}
