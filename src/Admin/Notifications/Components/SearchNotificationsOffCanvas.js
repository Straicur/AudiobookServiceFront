import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

export default function SearchNotificationsOffCanvas(props) {
  const [show, setShow] = useState(true);
  //todo tu chyba za dużo razy się odświerza lista po zamknięciu i otwarciu !!!
  const handleClose = () => {
    props.setState({
      ...props.state,
      searchModal: !props.state.searchModal,
    });
    setShow(false);
  };

  const changeOrder = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setSearchState({
        ...props.searchState,
        order: parseInt(element.target.value),
      });
    }
  };

  const changeText = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setSearchState({
        ...props.searchState,
        text: element.target.value,
      });
    }
  };

  const changeType = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setSearchState({
        ...props.searchState,
        type: parseInt(element.target.value),
      });
    }
  };
  const changeDeleted = (element) => {
    if (element.target.checked) {
      props.setSearchState({
        ...props.searchState,
        deleted: element.target.checked,
      });
    } else {
      props.setSearchState({
        ...props.searchState,
        deleted: null,
      });
    }
  };
  const changeNotDeleted = (element) => {
    if (element.target.checked) {
      props.setSearchState({
        ...props.searchState,
        deleted: !element.target.checked,
      });
    } else {
      props.setSearchState({
        ...props.searchState,
        deleted: null,
      });
    }
  };
  const searchAgain = () => {
    props.setPageState({
      ...props.pageState,
      page: 0,
    });

    props.setState({
      ...props.state,
      searchModal: !props.state.searchModal,
      refresh: !props.state.refresh,
    });
    setShow(false);
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      className="bg-dark text-light off_canvas_with"
      backdrop="static"
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <div className="row">
            <div className="col">
              <h2>{props.t("filters")}</h2>
            </div>
            <div className="col">
              <Button
                variant="success"
                size="sm"
                color="success"
                className=" btn button mt-2"
                onClick={() => props.resetSearchStates()}
              >
                {props.t("reset")}
              </Button>
            </div>
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <InputGroup className="mb-1 input_modal py-1">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("sort")}
          </InputGroup.Text>
          <Form.Select
            onChange={(e) => {
              changeOrder(e);
            }}
            value={props.searchState.sort}
          >
            <option value={0}>{props.t("selectSort")}</option>
            <option value={1}>{props.t("latest")}</option>
            <option value={2}>{props.t("oldest")}</option>
          </Form.Select>
        </InputGroup>
        <InputGroup className="mb-1 input_modal py-1 ">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("text")}
          </InputGroup.Text>
          <Form.Control
            value={props.searchState.text}
            onChange={(e) => {
              changeText(e);
            }}
          />
        </InputGroup>

        <InputGroup className="mb-1 input_modal py-1">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("type")}
          </InputGroup.Text>
          <Form.Select
            onChange={(e) => {
              changeType(e);
            }}
            value={props.searchState.type}
          >
            <option value={0}>{props.t("selectType")}</option>
            <option value={1}>{props.t("notificationTypeNormal")}</option>
            <option value={2}>{props.t("notificationTypeAdmin")}</option>
            <option value={3}>{props.t("notificationTypeProposed")}</option>
            <option value={4}>{props.t("notificationTypeNewCategory")}</option>
            <option value={5}>{props.t("notificationTypeNewAudiobook")}</option>
            <option value={6}>
              {props.t("notificationTypeUserDeleteDecline")}
            </option>
          </Form.Select>
        </InputGroup>
        <InputGroup className="mb-1 input_modal py-1 ">
          <Form.Check
            type="switch"
            id="custom-switch"
            label={props.t("deleted")}
            checked={
              props.searchState.deleted != null && props.searchState.deleted
            }
            onChange={(e) => changeDeleted(e)}
          />
        </InputGroup>
        <InputGroup className="mb-1 input_modal py-1 ">
          <Form.Check
            type="switch"
            id="custom-switch"
            label={props.t("notDeleted")}
            checked={
              props.searchState.deleted != null && !props.searchState.deleted
            }
            onChange={(e) => changeNotDeleted(e)}
          />
        </InputGroup>
        <div className="row mx-1">
          <Button
            variant="success"
            size="lg"
            color="success"
            className=" btn button mt-2"
            onClick={() => searchAgain()}
          >
            {props.t("search")}
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
