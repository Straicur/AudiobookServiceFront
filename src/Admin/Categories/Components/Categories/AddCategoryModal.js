import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { HandleFetch } from "../../../../Components/HandleFetch";

export default function AddCategoryModal(props) {
  
  const [modalState, setModalState] = useState({
    name: "",
    isButtonDisabled: true,
  });

  const handleSetNameChange = (event) => {
    setModalState({ ...modalState, name: event.target.value });
  };

  const handleClose = () => {
    props.setState({
      ...props.state,
      addCategoryModal: !props.state.addCategoryModal,
      refresh: !props.state.refresh,
    });
  };

  useEffect(() => {
    if (modalState.name.trim()) {
      setModalState({ ...modalState, isButtonDisabled: false });
    } else {
      setModalState({ ...modalState, isButtonDisabled: true });
    }
  }, [modalState.name]);

  const addNewSet = () => {
    let additionalData = {};

    if (props.state.addCategoryParent != null) {
      additionalData = { parentId: props.state.addCategoryParent.id };
    }

    HandleFetch(
      "http://127.0.0.1:8000/api/admin/category/add",
      "PUT",
      {
        name: modalState.name,
        additionalData: additionalData,
      },
      props.token
    )
      .then(() => {
        handleClose();
      })
      .catch((e) => {
        props.setCategoiesState({
          ...props.categoiesState,
          error: e,
        });
        handleClose();
      });
  };

  return (
    <Modal
      show={props.state.addCategoryModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>
          <h3>
            <b>{props.t("addCategory")}</b>
          </h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{props.t("name")}</h5>
        <input
          id="name"
          type="text"
          name="name"
          value={modalState.name}
          className="form-control mt-2"
          onChange={handleSetNameChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          {props.t("close")}
        </Button>
        <Button
          disabled={modalState.isButtonDisabled}
          variant="dark"
          onClick={addNewSet}
        >
          {props.t("add")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}