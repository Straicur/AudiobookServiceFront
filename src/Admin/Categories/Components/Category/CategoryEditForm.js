import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { HandleFetch } from "./../../../../Components/HandleFetch";
import { CreateJsonFormatDate } from "./../../../../Components/CreateJsonFormatDate";
import Alert from "react-bootstrap/Alert";

export default function CategoryEditForm(props) {
  const [wrongState, setWrongState] = useState(0);

  const editAudiobookData = () => {
    let myDate = props.audiobookDetail.duration.split(":");

    let hours = parseInt(myDate[0] * 60 * 60);
    let minutes = parseInt(myDate[1] * 60);
    let seconds = parseInt(myDate[2]);

    HandleFetch(
      "/admin/audiobook/edit",
      "PATCH",
      {
        audiobookId: props.audiobookDetail.id,
        title: props.audiobookDetail.title,
        author: props.audiobookDetail.author,
        version: props.audiobookDetail.version,
        album: props.audiobookDetail.album,
        year: CreateJsonFormatDate(props.audiobookDetail.year),
        duration: hours + minutes + seconds,
        size: props.audiobookDetail.size,
        parts: props.audiobookDetail.parts,
        description: props.audiobookDetail.description,
        age: props.audiobookDetail.age,
        encoded: props.audiobookDetail.encoded,
      },
      props.token,
      props.i18n.language
    )
      .then(() => {
        props.setAudiobookDetailRefetch(true);
        props.setStateModal({
          ...props.stateModal,
          edit: !props.stateModal.edit,
        });
      })
      .catch((e) => {
        props.setState({
          ...props.state,
          error: e,
        });
        props.handleClose();
      });
  };

  const handleVersionChange = (event) => {
    props.setAudiobookDetail({
      ...props.audiobookDetail,
      version: event.target.value,
    });
  };
  const handlePartsChange = (event) => {
    let value = event.target.value;
    if (value == "") {
      value = 0;
    }

    props.setAudiobookDetail({
      ...props.audiobookDetail,
      parts: parseInt(value),
    });
  };
  const handleEncodedChange = (event) => {
    props.setAudiobookDetail({
      ...props.audiobookDetail,
      encoded: event.target.value,
    });
  };
  const handleDescriptionChange = (event) => {
    props.setAudiobookDetail({
      ...props.audiobookDetail,
      description: event.target.value,
    });
  };
  const handleDurationChange = (event) => {
    props.setAudiobookDetail({
      ...props.audiobookDetail,
      duration: event.target.value,
    });
  };

  const handleYearChange = (event) => {
    props.setAudiobookDetail({
      ...props.audiobookDetail,
      year: event.target.value,
    });
  };
  const handleAlbumChange = (event) => {
    props.setAudiobookDetail({
      ...props.audiobookDetail,
      album: event.target.value,
    });
  };
  const handleAuthorChange = (event) => {
    props.setAudiobookDetail({
      ...props.audiobookDetail,
      author: event.target.value,
    });
  };
  const handleTitleChange = (event) => {
    props.setAudiobookDetail({
      ...props.audiobookDetail,
      title: event.target.value,
    });
  };
  const handleSizeChange = (event) => {
    props.setAudiobookDetail({
      ...props.audiobookDetail,
      size: event.target.value,
    });
  };
  const handleAgeChange = (event) => {
    props.setAudiobookDetail({
      ...props.audiobookDetail,
      age: parseInt(event),
    });
  };

  const validateFields = () => {
    setWrongState(0);

    if (props.audiobookDetail.title.length < 1) {
      setWrongState(1);
    }
    if (props.audiobookDetail.author.length < 1) {
      setWrongState(2);
    }
    if (props.audiobookDetail.album.length < 1) {
      setWrongState(3);
    }
    if (props.audiobookDetail.year.length < 1) {
      setWrongState(4);
    }
    if (props.audiobookDetail.duration.length < 1) {
      setWrongState(5);
    }
    if (props.audiobookDetail.parts <= 0) {
      setWrongState(6);
    }
    if (
      props.audiobookDetail.encoded == undefined ||
      props.audiobookDetail.encoded.length < 1
    ) {
      setWrongState(7);
    }
    if (props.audiobookDetail.size.length < 1) {
      setWrongState(8);
    }
    if (props.audiobookDetail.version.length < 1) {
      setWrongState(9);
    }
  };

  const returnFormError = () => {
    switch (wrongState) {
      case 1:
        return props.t("enterValidTitle");
      case 2:
        return props.t("enterValidAuthor");
      case 3:
        return props.t("enterValidAlbum");
      case 4:
        return props.t("enterValidYear");
      case 5:
        return props.t("enterValidPart");
      case 6:
        return props.t("enterValidDuration");
      case 7:
        return props.t("enterValidEncoded");
      case 8:
        return props.t("enterValidSize");
      case 9:
        return props.t("enterValidVersion");
    }
  };

  useEffect(() => {
    if (props.audiobookDetail != null) {
      validateFields();
    }
  }, [props.audiobookDetail]);

  return (
    <div className="row">
      <div className="row text-light">
        <InputGroup className="mb-1 input_modal">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("title")}
          </InputGroup.Text>
          <Form.Control
            value={
              props.audiobookDetail != null ? props.audiobookDetail.title : ""
            }
            onChange={(event) => {
              handleTitleChange(event);
            }}
          />
        </InputGroup>
      </div>
      <div className="row text-light">
        <InputGroup className="mb-1 input_modal">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("author")}
          </InputGroup.Text>
          <Form.Control
            value={
              props.audiobookDetail != null ? props.audiobookDetail.author : ""
            }
            onChange={(event) => {
              handleAuthorChange(event);
            }}
          />
        </InputGroup>
      </div>
      <div className="row text-light">
        <InputGroup className="mb-1 input_modal">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("album")}
          </InputGroup.Text>
          <Form.Control
            value={
              props.audiobookDetail != null ? props.audiobookDetail.album : ""
            }
            onChange={(event) => {
              handleAlbumChange(event);
            }}
          />
        </InputGroup>
      </div>
      <div className="row text-light">
        <InputGroup className="mb-1 input_modal">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("year")}
          </InputGroup.Text>
          <Form.Control
            type="date"
            value={
              props.audiobookDetail != null ? props.audiobookDetail.year : ""
            }
            onChange={(event) => {
              handleYearChange(event);
            }}
          />
        </InputGroup>
      </div>
      <div className="row text-light">
        <InputGroup className="mb-1 input_modal">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("parts")}
          </InputGroup.Text>
          <Form.Control
            type="number"
            value={
              props.audiobookDetail != null ? props.audiobookDetail.parts : ""
            }
            onChange={(event) => {
              handlePartsChange(event);
            }}
          />
        </InputGroup>
      </div>
      <div className="row text-light">
        <InputGroup className="mb-1 input_modal">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("duration")}
          </InputGroup.Text>
          <Form.Control
            value={
              props.audiobookDetail != null
                ? props.audiobookDetail.duration
                : ""
            }
            onChange={(event) => {
              handleDurationChange(event);
            }}
          />
        </InputGroup>
      </div>
      <div className="row text-light">
        <InputGroup className="mb-1 input_modal">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("description")}
          </InputGroup.Text>
          <Form.Control
            as="textarea"
            rows={4}
            value={
              props.audiobookDetail != null
                ? props.audiobookDetail.description
                : ""
            }
            onChange={(event) => {
              handleDescriptionChange(event);
            }}
          />
        </InputGroup>
      </div>
      <div className="row text-light">
        <InputGroup className="mb-1 input_modal">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("encoded")}
          </InputGroup.Text>
          <Form.Control
            value={
              props.audiobookDetail != null
                ? props.audiobookDetail.encoded != undefined
                  ? props.audiobookDetail.encoded
                  : ""
                : ""
            }
            onChange={(event) => {
              handleEncodedChange(event);
            }}
          />
        </InputGroup>
      </div>
      <div className="row text-light">
        <InputGroup className="mb-1 input_modal">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("size")}
          </InputGroup.Text>
          <Form.Control
            value={
              props.audiobookDetail != null ? props.audiobookDetail.size : ""
            }
            onChange={(event) => {
              handleSizeChange(event);
            }}
          />
        </InputGroup>
      </div>
      <div className="row text-light">
        <InputGroup className="mb-1 input_modal">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("version")}
          </InputGroup.Text>
          <Form.Control
            value={
              props.audiobookDetail != null ? props.audiobookDetail.version : ""
            }
            onChange={(event) => {
              handleVersionChange(event);
            }}
          />
        </InputGroup>
      </div>
      <div className="row text-light pe-0 input_modal">
        <InputGroup className="mb-1">
          <Dropdown onSelect={(event) => handleAgeChange(event)}>
            <Dropdown.Toggle
              className=" text-start"
              variant="success"
              id="dropdown-basic"
            >
              {props.t("age")}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {props.audiobookDetail != null ? (
                <Dropdown.Item
                  eventKey={1}
                  active={props.audiobookDetail.age == 1}
                >
                  3-7
                </Dropdown.Item>
              ) : null}
              {props.audiobookDetail != null ? (
                <Dropdown.Item
                  eventKey={2}
                  active={props.audiobookDetail.age == 2}
                >
                  7-12
                </Dropdown.Item>
              ) : null}

              {props.audiobookDetail != null ? (
                <Dropdown.Item
                  eventKey={3}
                  active={props.audiobookDetail.age == 3}
                >
                  12-16
                </Dropdown.Item>
              ) : null}

              {props.audiobookDetail != null ? (
                <Dropdown.Item
                  eventKey={4}
                  active={props.audiobookDetail.age == 4}
                >
                  16-18
                </Dropdown.Item>
              ) : null}

              {props.audiobookDetail != null ? (
                <Dropdown.Item
                  eventKey={5}
                  active={props.audiobookDetail.age == 5}
                >
                  18+
                </Dropdown.Item>
              ) : null}
            </Dropdown.Menu>
            <InputGroup.Text id="inputGroup-sizing-default">
              {props.audiobookDetail != null
                ? props.audiobookDetail.age == 1
                  ? "3-7"
                  : props.audiobookDetail.age == 2
                  ? "7-12"
                  : props.audiobookDetail.age == 3
                  ? "12-16"
                  : props.audiobookDetail.age == 4
                  ? "16-18"
                  : props.audiobookDetail.age == 5
                  ? "18+"
                  : null
                : null}
            </InputGroup.Text>
          </Dropdown>
        </InputGroup>
      </div>

      <div className="row text-light me-2 input_modal">
        <div> 
          <Alert
            show={wrongState != 0}
            className="dangerAllert mt-1 text-center"
            variant="danger"
          >
            {returnFormError()}
          </Alert>
        </div>
      </div>
      {props.stateModal.edit ? (
        <div className="row">
          <div className="col">
            <Button
              name="en"
              size="sm"
              disabled={wrongState != 0}
              className="btn button px-4 my-1 question_button success_button"
              onClick={editAudiobookData}
            >
              {props.t("yes")}
            </Button>
          </div>
          <div className="col">
            <Button
              name="en"
              size="sm"
              className="btn button px-4 my-1 question_button danger_button me-2"
              onClick={() =>
                props.setStateModal({
                  ...props.stateModal,
                  edit: !props.stateModal.edit,
                })
              }
            >
              {props.t("no")}
            </Button>
          </div>
        </div>
      ) : (
        <div className="row">
          <Button
            name="en"
            size="sm"
            disabled={wrongState != 0}
            className="btn button px-4 mt-3 mb-1 modal_button success_button"
            onClick={() =>
              props.setStateModal({
                ...props.stateModal,
                edit: !props.stateModal.edit,
              })
            }
          >
            {props.t("edit")}
          </Button>
        </div>
      )}
    </div>
  );
}
