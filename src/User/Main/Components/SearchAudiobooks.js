import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function SearchAudiobooks(props) {
  return (
    <div className="row justify-content-start">
      <div className="col-2">
        <InputGroup className="mb-3 ">
          <InputGroup.Text id="basic-addon1">
            <i class="bi bi-search"></i>
          </InputGroup.Text>
          <Form.Control placeholder={props.t("name")} />
        </InputGroup>
      </div>
    </div>
  );
}
