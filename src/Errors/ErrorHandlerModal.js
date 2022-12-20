import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { HandleFetch } from "../../components/HandleFetch";

export const ErrorHandlerModal = ({
  setErrorState,
  errorState,
  error,
  errorFunction = null,
}) => {
  const { t } = useTranslation();

  const [state, setState] = useState({
    // Tu jakieś stany które chce zwrócić w modalu(info)
  });

  const handleClose = () =>
    setErrorState({ ...errorState, modal: !errorState.modal });

  function reloadFunction() {
    window.location.reload(false);
  }

switch(error.name){
    case "InvalidJsonDataError":
        // I tu ustawiam state dla tego modala (to co chce zwrócić czy coś)
        // Tak żeby tego nie wrzucać cały czas do funkcji 
        break;
}
  //todo tu jest jeszcze do przemyślenia czy napewno jeszcze czegoś nie potrzebuje ?
  // Mogę to tak zrobić że przyjmuje errora i z niego wyciągam dane i rzeczy 
  // Np w switchu coś tam robie 
  // dlatego powinien jeszce
  return (
    <>
      <Modal show={errorState.modal} onHide={handleClose}>
        <Modal.Header className="">
          <Modal.Title> {t("errorOccurred")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <Button
            variant="dark"
            onClick={errorFunction != null ? errorFunction() : reloadFunction()}
          >
            {t("accept")}
          </Button>
        </Modal.Body>
        <Modal.Footer className=""></Modal.Footer>
      </Modal>
    </>
  );
};
