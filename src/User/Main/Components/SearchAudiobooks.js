import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

export default function SearchAudiobooks(props) {
  useEffect(() => {
    if (props.audiobooksState.error != null) {
      throw props.audiobooksState.error;
    }
  }, [props.audiobooksState.error]);

  const searchAudiobooks = () => {
    props.setAudiobooksState({
      ...props.audiobooksState,
      search: !props.search,
    });
  };

  const changeSearchText = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setAudiobooksState({
        ...props.audiobooksState,
        searchText: element.target.value,
      });
    }
  };

  return (
    <div className="row ms-1 mt-3 justify-content-start">
      <div className="col-2">
        <InputGroup className="mb-3 ">
          <InputGroup.Text id="basic-addon1">
            <i className="bi bi-search"></i>
          </InputGroup.Text>
          <Form.Control
            placeholder={props.t("title")}
            onChange={(e) => changeSearchText(e)}
            value={props.audiobooksState.searchText}
          />
          <Button className={"success_button"} onClick={searchAudiobooks}>
            {props.t("search")}
          </Button>
        </InputGroup>
      </div>
    </div>
  );
}
