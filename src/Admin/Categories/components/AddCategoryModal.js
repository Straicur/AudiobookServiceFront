import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { HandleFetch } from "../../../components/HandleFetch";

//todo tu teraz przerabiam to na podstawie tego czy dostaje w propsie parenta, jeśli nie to wyświetla "Dodaj główną kat", jak nie to dodaj dziecko czy jakoś tak
// i w sumie to tyle bo jeszcze w fetchu dodaje to jeśli jest, jak nie to nie dodaje do jsonBody i tyle,
// Json kategorii ustawiam tak jak wcześniej i w sumie tyle, Przekazuje mu to z pamięci podręcznej 
// Zostaje jeszcze cały modal edycji  I jeszcze aktywacja dodatkowo w edycji 
//

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
    HandleFetch(
      "http://127.0.0.1:8000/api/admin/category/add",
      "PUT",
      {
        name: modalState.name,
        additionalData: [],
      },
      props.token
    )
      .then((data) => {
        handleClose();
      })
      .catch((e) => {
        if (e) {
          props.setCategoiesState({
            ...props.categoiesState,
            error: e,
          });
          handleClose();
        }
      });
  };

  return (
    <Modal
      show={props.state.addCategoryModal}
      backdrop="static"
      keyboard={false}
      dialogClassName="custom-dialog"
    >
      <Modal.Header>
        <Modal.Title>
          <h3>
            <b>{props.t("AddSetButton")}</b>
          </h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{props.t("Name")}</h5>
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
          {props.t("save")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
