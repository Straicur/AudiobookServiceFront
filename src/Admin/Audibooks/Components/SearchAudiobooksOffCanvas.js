import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

export default function SearchAudiobooksOffCanvas(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    props.setState({
      ...props.state,
      searchModal: !props.state.searchModal,
    });
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      className="bg-dark text-light"
      backdrop="static"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{props.t("filters")}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <InputGroup className="mb-1 input_modal py-1">
          <Form.Select aria-label="Default select example">
            <option>{props.t("sort")}</option>
            <option value={1}>3-7</option>
            <option value={2}>7-12</option>
            <option value={3}>12-16</option>
            <option value={4}>16-18</option>
            <option value={5}>18+</option>
          </Form.Select>
        </InputGroup>
        <InputGroup className="mb-1 input_modal py-1 ">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("categories")}
          </InputGroup.Text>
          <DropdownMultiselect
            options={[
              { key: "es", label: "Spain" },
              { key: "2", label: "USA" },
            ]}
            name="countries"
            handleOnChange={(selected) => {
              console.log(selected);
            }}
          />
        </InputGroup>
        <InputGroup className="mb-1 input_modal py-1 ">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("title")}
          </InputGroup.Text>
          <Form.Control
            defaultValue={
              props.audiobookDetail != null ? props.audiobookDetail.title : ""
            }
            onChange={(event) => {
              //   handleTitleChange(event);
            }}
          />
        </InputGroup>

        <InputGroup className="mb-1 input_modal py-1 ">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("author")}
          </InputGroup.Text>
          <Form.Control
            defaultValue={
              props.audiobookDetail != null ? props.audiobookDetail.title : ""
            }
            onChange={(event) => {
              //   handleTitleChange(event);
            }}
          />
        </InputGroup>
        <InputGroup className="mb-1 input_modal py-1 ">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("album")}
          </InputGroup.Text>
          <Form.Control
            defaultValue={
              props.audiobookDetail != null ? props.audiobookDetail.title : ""
            }
            onChange={(event) => {
              //   handleTitleChange(event);
            }}
          />
        </InputGroup>

        <InputGroup className="mb-1 input_modal py-1 ">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("parts")}
          </InputGroup.Text>
          <Form.Control
            type="number"
            onChange={(event) => {
              //   handleTitleChange(event);
            }}
          />
        </InputGroup>

        <InputGroup className="mb-1 input_modal py-1 ">
          <Form.Select aria-label="Default select example">
            <option> {props.t("age")}</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </InputGroup>
        <InputGroup className="mb-1 input_modal py-1 ">
          {props.t("duration")}

          <Form.Range
            onChange={(selected) => {
              console.log(selected);
            }}
            min="0" max="5" step="0.5" 
          />
        </InputGroup>

        <InputGroup className="mb-1 input_modal py-1 ">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("year")}
          </InputGroup.Text>
          <Form.Control
            type="date"
            defaultValue={
              props.audiobookDetail != null ? props.audiobookDetail.title : ""
            }
            onChange={(event) => {
              //   handleTitleChange(event);
            }}
          />
        </InputGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
