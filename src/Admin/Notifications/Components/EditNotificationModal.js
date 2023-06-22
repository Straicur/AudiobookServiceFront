import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { HandleFetch } from "../../../Components/HandleFetch";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import PickActionIdList from "./PickActionIdList";

export default function EditNotificationModal(props) {
  const [state, setState] = useState({
    actionId: "",
    dateAdd: 0,
    delete: false,
    id: "",
    notificationType: 0,
    text: "",
    userType: 0,
  });

  const [actionState, setActionState] = useState({
    list: false,
    actionIdChanged: false,
  });

  const [deleteState, setDelteteState] = useState({
    sure: false,
  });

  const handleClose = () => {
    props.setState({
      ...props.state,
      editNotificationkModal: !props.state.editNotificationkModal,
      refresh: !props.state.refresh,
    });
  };

  const changeNotificationType = (element) => {
    if (element.target.value != 0) {
      setState({
        ...state,
        notificationType: parseInt(element.target.value),
      });
    }
  };

  const changeUserType = (element) => {
    if (element.target.value != 0) {
      setState({
        ...state,
        userType: parseInt(element.target.value),
      });
    }
  };

  const changeText = (element) => {
    setState({
      ...state,
      text: element.target.value,
    });
  };

  const deleteNotification = (element) => {
    element.target.classList.add("disabled");
    HandleFetch(
      "http://127.0.0.1:8000/api/admin/user/notification/delete",
      "PATCH",
      {
        notificationId: state.id,
        delete: !state.delete,
      },
      props.token,
      props.i18n.language
    )
      .then(() => {
        element.target.classList.remove("disabled");

        setDelteteState({
          ...deleteState,
          sure: !deleteState.sure,
        });

        setState({
          ...state,
          delete: !state.delete,
        });
      })
      .catch((e) => {
        props.setNotificationsState({
          ...props.notificationsState,
          error: e,
        });
      });
  };

  const selectActionId = () => {
    setActionState({
      ...actionState,
      list: true,
    });
  };
  const goBack = () => {
    setActionState({
      ...actionState,
      list: false,
    });
  };

  const saveChanges = () => {
    HandleFetch(
      "http://127.0.0.1:8000/api/admin/user/notification",
      "PATCH",
      {
        notificationId: state.id,
        notificationType: state.notificationType,
        notificationUserType: state.userType,
        actionId: state.actionId,
        additionalData: {
          text: state.text,
        },
      },
      props.token,
      props.i18n.language
    )
      .then(() => {
        props.setState({
          ...props.state,
          editNotificationkModal: !props.state.editNotificationkModal,
          refresh: !props.state.refresh,
        });
      })
      .catch((e) => {
        props.setNotificationsState({
          ...props.notificationsState,
          error: e,
        });
      });
  };

  useEffect(() => {
    setState(props.state.editNotificationElement);
  }, [props]);

  return (
    <Modal
      size="lg"
      show={props.state.editNotificationkModal}
      onHide={handleClose}
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title>{props.t("notificationDetail")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {actionState.list ? (
          <PickActionIdList
            state={state}
            setState={setState}
            actionState={actionState}
            setActionState={setActionState}
            notificationsState={props.notificationsState}
            setNotificationsState={props.setNotificationsState}
            audiobooksState={props.audiobooksState}
            setAudiobooksState={props.setAudiobooksState}
            categoriesState={props.categoriesState}
            setCategoriesState={props.setCategoriesState}
            usersState={props.usersState}
            setUsersState={props.setUsersState}
            t={props.t}
            i18n={props.i18n}
            token={props.token}
          />
        ) : (
          <div className="container">
            <div className="row">
              <InputGroup className="mb-1 input_modal py-1">
                <InputGroup.Text className="input-notification-text-new text-light">
                  {props.t("userType")}
                </InputGroup.Text>
                <Form.Select
                  onChange={(e) => {
                    changeUserType(e);
                  }}
                  value={state.userType}
                >
                  <option value={0}>{props.t("selectNotificationType")}</option>
                  <option value={1}>{props.t("administration")}</option>
                  <option value={2}>{props.t("system")}</option>
                </Form.Select>
              </InputGroup>
              <InputGroup className="mb-1 input_modal py-1">
                <InputGroup.Text className="input-notification-text-new text-light">
                  {props.t("notificationType")}
                </InputGroup.Text>
                <Form.Select
                  onChange={(e) => {
                    changeNotificationType(e);
                  }}
                  value={state.notificationType}
                >
                  <option value={0}>{props.t("selectType")}</option>
                  <option value={1}>{props.t("notificationTypeNormal")}</option>
                  <option value={2}>{props.t("notificationTypeAdmin")}</option>
                  <option value={3}>
                    {props.t("notificationTypeProposed")}
                  </option>
                  <option value={4}>
                    {props.t("notificationTypeNewCategory")}
                  </option>
                  <option value={5}>
                    {props.t("notificationTypeNewAudiobook")}
                  </option>
                </Form.Select>
              </InputGroup>
              <InputGroup className="mt-2 input_modal">
                <InputGroup.Text>
                  {props.t("description")} ({props.t("optional")})
                </InputGroup.Text>
                <Form.Control
                  as="textarea"
                  aria-label="With textarea"
                  value={state.text}
                  onChange={(e) => {
                    changeText(e);
                  }}
                />
              </InputGroup>

              <InputGroup className="mb-2 mt-3 input_modal">
                <InputGroup.Text>{props.t("actionId")}</InputGroup.Text>
                <Form.Control disabled value={state.actionId} />
                <Button
                  name="en"
                  variant="outline-secondary"
                  size="sm"
                  className="btn button mx-2"
                  onClick={(e) => selectActionId(e)}
                >
                  {props.t("select")}
                </Button>
              </InputGroup>

              <InputGroup className="my-2 input_modal">
                <InputGroup.Text>{props.t("deleted")}</InputGroup.Text>
                <Form.Control
                  disabled
                  value={state.delete ? props.t("yes") : props.t("no")}
                />
                {deleteState.sure ? (
                  <Button
                    name="en"
                    size="sm"
                    className="btn button"
                    variant="outline-danger"
                    onClick={(e) => deleteNotification(e)}
                  >
                    {props.t("yes")}
                  </Button>
                ) : null}
                {deleteState.sure ? (
                  <Button
                    name="en"
                    size="sm"
                    className="btn button"
                    variant="outline-success"
                    onClick={() =>
                      setDelteteState({
                        ...deleteState,
                        sure: !deleteState.sure,
                      })
                    }
                  >
                    {props.t("no")}
                  </Button>
                ) : null}
                {!deleteState.sure ? (
                  <Button
                    name="en"
                    variant={
                      state.delete ? "outline-success" : "outline-danger"
                    }
                    size="sm"
                    className="btn button mx-2"
                    onClick={() =>
                      setDelteteState({
                        ...deleteState,
                        sure: !deleteState.sure,
                      })
                    }
                  >
                    {state.delete ? props.t("activate") : props.t("delete")}
                  </Button>
                ) : null}
              </InputGroup>
            </div>
            <div className="row justify-content-center mx-5 mt-2">
              <div className="col-7">
                <Button
                  name="en"
                  variant="success"
                  size="sm"
                  className="btn button button_notification"
                  onClick={(e) => saveChanges(e)}
                >
                  {props.t("save")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {actionState.list != 0 ? (
          <Button variant="dark" onClick={goBack}>
            {props.t("back")}
          </Button>
        ) : null}
        <Button variant="dark" onClick={handleClose}>
          {props.t("close")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
