import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { HandleFetch } from "../../../../Components/HandleFetch";

export default function AudiobookCover(props) {

    const handleOnFileChange = (e) => {
        if (e.target.files) {
          let file = e.target.files[0];
    
          if (
            file.type == "image/png" ||
            file.type == "image/jpeg" ||
            file.type == "image/jpg"
          ) {
            setStateModal({ ...stateModal, file: file });
          }
        }
      };
    
      const editCover = () => {
        if (stateModal.file != null) {
          const reader = new FileReader();
          reader.onload = function (e) {
            if (e.target.result instanceof ArrayBuffer) {
              let pattern = "/jpeg|png|jpg/i";
              let result = stateModal.file.type.match(pattern);
    
              if (result != null) {
                let buf = new Uint8Array(e.target.result);
                let b64 = Buffer.from(buf).toString("base64");
                HandleFetch(
                  "http://127.0.0.1:8000/api/admin/audiobook/change/cover",
                  "PATCH",
                  {
                    type: result[0],
                    base64: b64,
                    audiobookId: audiobookDetail.id,
                  },
                  props.token
                )
                  .then(() => {
                    setAudiobookCoverRefetch(true);
                    setStateModal({ ...stateModal, file: null });
                  })
                  .catch((e) => {
                    props.setState({
                      ...props.state,
                      error: e,
                    });
                    handleClose();
                  });
              }
            }
          };
          if (stateModal.file != null) {
            reader.readAsArrayBuffer(stateModal.file);
          }
        }
      };

    return(
        
        <div className="row ">
         <div className="row ">
              <img
                src={
                  audiobookCover == null
                    ? "/noImg.jpg"
                    : window.URL.createObjectURL(new Blob([audiobookCover]))
                }
                className="card-img-top"
                alt="..."
              />
            </div>
            <div className="row d-flex justify-content-center">
              <Form.Group controlId="formFileSm" className="my-1">
                <Form.Control
                  onChange={handleOnFileChange}
                  type="file"
                  size="sm"
                />
              </Form.Group>
              <Button
                name="en"
                variant="secondary"
                size="sm"
                className="btn button px-4 my-2 modal_img_button"
                disabled={stateModal.file == null}
                onClick={editCover}
              >
                {props.t("editCover")}
              </Button>
            </div>
      </div>
    )
}