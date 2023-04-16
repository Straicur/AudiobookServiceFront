import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

export default function EditUserModal(props) {
  const handleClose = () => {
    props.setState({
      ...props.state,
      editUserModal: !props.state.editUserModal,
    });
  };
  //todo do zrobienia zostaje mi edycja:
  // - dodanie i usunięcie roli to mas być w liście i obok ma być przycisk zamiast multiselecta 
  // - aktywacja użytkownika 
  // - banicja/odbanowanie użytkownika 
  // - zmiana hasła 
  // - zmiana telefonu

  // Pobieranie listy roli przed włączeniem modala
  // Po stronie backendu zostaje mi jeszcze dodanie ednp który zwraca listę roli w systemi po ich nazwie z odpowiednim intem
  return (
    <Modal size="lg" show={props.state.editUserModal} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{props.t("editUser")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row text-light">
          <InputGroup className="mb-1 input_modal">
            <InputGroup.Text className="input-group-text-new text-light">
              {/* {props.t("title")} */} Phone
            </InputGroup.Text>
            <Form.Control
            // defaultValue={
            //   props.audiobookDetail != null ? props.audiobookDetail.title : ""
            // }
            // onChange={(event) => {
            //   handleTitleChange(event);
            // }}
            />
          </InputGroup>
        </div>
        <div className="row text-light">
          <InputGroup className="mb-1 input_modal">
            <InputGroup.Text className="input-group-text-new text-light">
              {/* {props.t("title")} */} Password
            </InputGroup.Text>
            <Form.Control
            // defaultValue={
            //   props.audiobookDetail != null ? props.audiobookDetail.title : ""
            // }
            // onChange={(event) => {
            //   handleTitleChange(event);
            // }}
            />
          </InputGroup>
        </div>
        <div className="row text-light">
          <InputGroup className="mb-1 input_modal py-1 ">
            <InputGroup.Text className="input-group-text-new text-light">
              {props.t("categories")}
            </InputGroup.Text>
            <DropdownMultiselect
              placeholder={props.t("selectCategories")}
              placeholderMultipleChecked={props.t("slectedMultiCategories")}
              selectDeselectLabel={props.t("slectedAll")}
              options={[]}
              name="countries"
              //   handleOnChange={(e) => {
              //     changeCategories(e);
              //   }}
              //   selected={stateModal.categories}
              className={"dropdown_multiselect"}
            />
          </InputGroup>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          {props.t("close")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
