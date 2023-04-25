import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { HandleFetch } from "../../../Components/HandleFetch";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import PickActionIdList from "./PickActionIdList";

export default function DetailNotificationModal(props) {
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
    list: true,
    actionIdChanged: false,
  });

  const [deleteState, setDelteteState] = useState({
    sure: false,
  });

  const handleClose = () => {
    props.setState({
      ...props.state,
      detailNotificationkModal: !props.state.detailNotificationkModal,
    });
  };

  const changeNotificationType = (element) => {
    setState({
      ...state,
      notificationType: parseInt(element.target.value),
    });
  };

  const changeUserType = (element) => {
    setState({
      ...state,
      userType: parseInt(element.target.value),
    });
  };

  const changeText = (element) => {
    setState({
      ...state,
      text: element.target.value,
    });
  };
  console.log(state);
  const deleteNotification = (element) => {
    element.target.classList.add("disabled");
    HandleFetch(
      "http://127.0.0.1:8000/api/admin/user/notification/delete",
      "PATCH",
      {
        notificationId: state.id,
        delete: state.delete,
      },
      props.token
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

  const selectActionId = (element) => {
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
  const saveChanges = (element) => {
    // HandleFetch(
    //   "http://127.0.0.1:8000/api/admin/user/notification",
    //   "PATCH",
    //   {
    // notificationType: pageState.page,
    //   notificationUserType: pageState.limit,
    //   actionId: formatData(),
    //   additionalData: {
    //     text:
    //   },
    //   },
    //   props.token
    // )
    //   .then(() => {
    //     props.setState({
    //         ...props.state,
    //         detailNotificationkModal: !props.state.detailNotificationkModal,
    //         refresh: !props.state.refresh,
    //       });
    //   })
    //   .catch((e) => {
    //     props.setAudiobookState({
    //       ...props.audiobookState,
    //       error: e,
    //     });
    //   });
  };

  useEffect(() => {
    setState(props.state.detailNotificationElement);
  }, [props]);

  return (
    <Modal
      size="lg"
      show={props.state.detailNotificationkModal}
      onHide={handleClose}
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
            token={props.token}
          />
        ) : (
          <div className="container">
            <div className="row">
              <InputGroup>
                <InputGroup.Text>{props.t("description")}</InputGroup.Text>
                <Form.Control
                  as="textarea"
                  aria-label="With textarea"
                  value={state.text}
                  onChange={(e) => {
                    changeText(e);
                  }}
                />
              </InputGroup>
              <InputGroup className="mb-1 input_modal py-1">
                <InputGroup.Text className="input-group-text-new text-light">
                  {props.t("notificationType")}
                </InputGroup.Text>
                <Form.Select
                  onChange={(e) => {
                    changeNotificationType(e);
                  }}
                  value={state.notificationType}
                >
                  <option value={0}>{props.t("selectNotificationType")}</option>
                  <option value={1}>{props.t("administration")}</option>
                  <option value={2}>{props.t("system")}</option>
                </Form.Select>
              </InputGroup>
              <InputGroup className="mb-1 input_modal py-1">
                <InputGroup.Text className="input-group-text-new text-light">
                  {props.t("userType")}
                </InputGroup.Text>
                <Form.Select
                  onChange={(e) => {
                    changeUserType(e);
                  }}
                  value={state.userType}
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
                  <option value={6}>
                    {props.t("notificationTypeUserDeleteDecline")}
                  </option>
                </Form.Select>
              </InputGroup>
              <div className="col">
                <div className="row">
                  <div className="col">{props.t("deleted")}:</div>
                  <div className="col">
                    {state.delete ? (
                      <i className="bi bi-bookmark-check-fill"></i>
                    ) : (
                      <i className="bi bi-bookmark-dash"></i>
                    )}
                  </div>
                  <div className="col">
                    {deleteState.sure ? (
                      <div className="row justify-content-center mt-2 mb-1">
                        <div className="col-3">
                          <Button
                            name="en"
                            size="sm"
                            className="btn button px-4 my-1 question_button success_button"
                            onClick={(e) => deleteNotification(e)}
                          >
                            {props.t("yes")}
                          </Button>
                        </div>
                        <div className="col-3">
                          <Button
                            name="en"
                            size="sm"
                            className="btn button px-4 my-1 question_button danger_button me-2"
                            onClick={() =>
                              setDelteteState({
                                ...deleteState,
                                sure: !deleteState.sure,
                              })
                            }
                          >
                            {props.t("no")}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        name="en"
                        variant={state.delete ? "success" : "danger"}
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
                    )}
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="row">
                  <div className="col-3">{props.t("actionId")}:</div>
                  <div className="col-3 text-success">
                    {" "}
                    {actionState.actionIdChanged ? props.t("changed") : null}
                  </div>
                  <div className="col">
                    <Button
                      name="en"
                      variant="dark"
                      size="sm"
                      className="btn button mx-2"
                      onClick={(e) => selectActionId(e)}
                    >
                      {props.t("select")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mx-5 mt-3">
              <Button
                name="en"
                variant="success"
                size="sm"
                className="btn button"
                onClick={(e) => saveChanges(e)}
              >
                {props.t("save")}
              </Button>
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
