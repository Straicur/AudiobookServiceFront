import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function SearchAudiobooks(props) {
  useEffect(() => {
    if (props.audiobooksState.error != null) {
      throw props.audiobooksState.error;
    }
  }, [props.audiobooksState.error]);
  return (
    <div className="row ms-1 mt-3 justify-content-start">
      <div className="col-2">
        <InputGroup className="mb-3 ">
          <InputGroup.Text id="basic-addon1">
            <i className="bi bi-search"></i>
          </InputGroup.Text>
          <Form.Control placeholder={props.t("name")} />
        </InputGroup>
      </div>
    </div>
  );
}
