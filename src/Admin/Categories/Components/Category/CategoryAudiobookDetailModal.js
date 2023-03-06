import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import AudioPlayer from "react-h5-audio-player";
import { HandleFetch } from "../../../../Components/HandleFetch";
import "react-h5-audio-player/lib/styles.css";
import { useAudiobookData } from "../../../../Components/Providers/AudiobookProviders/AudiobookDataProvider";
import { useAudiobookCover } from "../../../../Components/Providers/AudiobookProviders/AudiobookCoverDataProvider";
import { useAudiobookPart } from "../../../../Components/Providers/AudiobookProviders/AudiobookPartProvider";
import { useAudiobookComments } from "../../../../Components/Providers/AudiobookProviders/AudiobookCommentsProvider";
import { Buffer } from "buffer";
import { v4 as uuidv4 } from "uuid";

export default function CategoryAudiobookDetailModal(props) {
  const [stateModal, setStateModal] = useState({
    file: null,
    edit: false,
    deleteFromCategory: false,
    deleteEntarly: false,
  });

  const [audiobookDetail, setAudiobookDetail, setAudiobookDetailRefetch] =
    useAudiobookData();
  const [audiobookCover, setAudiobookCover, setAudiobookCoverRefetch] =
    useAudiobookCover();
  const [audiobookPart, setAudiobookPart] = useAudiobookPart();
  const [audiobookComments, setAudiobookComments, setAudiobookCommentsRefetch] =
    useAudiobookComments();

  const handleOnFileChange = (e) => {
    if (e.target.files) {
      let file = e.target.files[0];

      if (
        file.type == "image/png" ||
        file.type == "image/jpeg" ||
        file.type == "image/jpg"
      ) {
        setStateModal({ ...stateModal, file: file });
      }
    }
  };

  const editCover = () => {
    if (stateModal.file != null) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target.result instanceof ArrayBuffer) {
          let pattern = "/jpeg|png|jpg/i";
          let result = stateModal.file.type.match(pattern);

          if (result != null) {
            let buf = new Uint8Array(e.target.result);
            let b64 = Buffer.from(buf).toString("base64");
            HandleFetch(
              "http://127.0.0.1:8000/api/admin/audiobook/change/cover",
              "PATCH",
              {
                type: result[0],
                base64: b64,
                audiobookId: audiobookDetail.id,
              },
              props.token
            )
              .then(() => {
                setAudiobookCoverRefetch(true);
                setStateModal({ ...stateModal, file: null });
              })
              .catch((e) => {
                props.setState({
                  ...props.state,
                  error: e,
                });
                handleClose();
              });
          }
        }
      };
      if (stateModal.file != null) {
        reader.readAsArrayBuffer(stateModal.file);
      }
    }
  };

  const handleClose = () => {
    props.setState({
      ...props.state,
      detailAudiobookModal: !props.state.detailAudiobookModal,
      refresh: !props.state.refresh,
    });
  };

  const getZip = () => {
    HandleFetch(
      "http://127.0.0.1:8000/api/admin/audiobook/zip",
      "POST",
      {
        audiobookId: audiobookDetail.id,
      },
      props.token
    )
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));

        const link = document.createElement("a");

        link.href = url;

        link.setAttribute("download", "YourAudiobook.zip");

        document.body.appendChild(link);

        link.click();

        link.parentNode.removeChild(link);
      })
      .catch((e) => {
        props.setState({
          ...props.state,
          error: e,
        });
        handleClose();
      });
  };

  const deleteAudiobookEntarly = () => {
    HandleFetch(
      "http://127.0.0.1:8000/api/admin/audiobook/delete",
      "DELETE",
      {
        audiobookId: audiobookDetail.id,
      },
      props.token
    )
      .then(() => {
        handleClose();
      })
      .catch((e) => {
        props.setState({
          ...props.state,
          error: e,
        });
        handleClose();
      });
  };

  const deleteAudiobookFromCategory = () => {
    HandleFetch(
      "http://127.0.0.1:8000/api/admin/category/remove/audiobook",
      "DELETE",
      {
        categoryId: props.state.category.id,
        audiobookId: audiobookDetail.id,
      },
      props.token
    )
      .then(() => {
        handleClose();
      })
      .catch((e) => {
        props.setState({
          ...props.state,
          error: e,
        });
        handleClose();
      });
  };

  const editAudiobookData = () => {
    HandleFetch(
      "http://127.0.0.1:8000/api/admin/audiobook/edit",
      "PATCH",
      {
        audiobookId: audiobookDetail.id,
        title: audiobookDetail.title,
        author: audiobookDetail.author,
        version: audiobookDetail.version,
        album: audiobookDetail.album,
        year: createDate(audiobookDetail.year),
        duration: audiobookDetail.duration,
        size: audiobookDetail.size,
        parts: audiobookDetail.parts,
        description: audiobookDetail.description,
        age: audiobookDetail.age,
        encoded: audiobookDetail.encoded,
      },
      props.token
    )
      .then(() => {
        setAudiobookDetailRefetch(true);
        setStateModal({ ...stateModal, edit: !stateModal.edit });
      })
      .catch((e) => {
        props.setState({
          ...props.state,
          error: e,
        });
        handleClose();
      });
  };

  const handleVersionChange = (event) => {
    setAudiobookDetail({
      ...audiobookDetail,
      verison: event.target.value,
    });
  };
  const handlePartsChange = (event) => {
    setAudiobookDetail({
      ...audiobookDetail,
      parts: parseInt(event.target.value),
    });
  };
  const handleEncodedChange = (event) => {
    setAudiobookDetail({
      ...audiobookDetail,
      encoded: event.target.value,
    });
  };
  const handleDescriptionChange = (event) => {
    setAudiobookDetail({
      ...audiobookDetail,
      description: event.target.value,
    });
  };
  const handleDurationChange = (event) => {
    setAudiobookDetail({
      ...audiobookDetail,
      duration: event.target.value,
    });
  };

  const handleYearChange = (event) => {
    let myDate = event.target.value.split(".");
    let newDate = new Date(myDate[2], myDate[1] - 1, myDate[0]);
    setAudiobookDetail({
      ...audiobookDetail,
      year: parseInt(newDate.getTime()),
    });
  };
  const handleAlbumChange = (event) => {
    setAudiobookDetail({
      ...audiobookDetail,
      album: event.target.value,
    });
  };
  const handleAuthorChange = (event) => {
    setAudiobookDetail({
      ...audiobookDetail,
      author: event.target.value,
    });
  };
  const handleTitleChange = (event) => {
    setAudiobookDetail({
      ...audiobookDetail,
      title: event.target.value,
    });
  };
  const handleSizeChange = (event) => {
    setAudiobookDetail({
      ...audiobookDetail,
      size: event.target.value,
    });
  };
  const handleAgeChange = (event) => {
    setAudiobookDetail({
      ...audiobookDetail,
      age: parseInt(event),
    });
  };

  const createDate = (timeStamp) => {
    const dateFormat = new Date(timeStamp);

    const day = dateFormat.getDate();
    const month = dateFormat.getMonth() + 1;
    const year = dateFormat.getFullYear();

    return day + "." + month + "." + year;
  };

  const createCategory = (category) => {
    return (
      <div
        key={uuidv4()}
        className="row border border-secondary category_data mb-1"
      >
        <div className="row">
          <div className="col">{props.t("name")}:</div>
          <div className="col">{category.name}</div>
          <div className="col">{props.t("active")}:</div>
          <div className="col">
            {category.active ? (
              <i className="bi bi-bookmark-check-fill"></i>
            ) : (
              <i className="bi bi-bookmark-dash"></i>
            )}
          </div>
        </div>
        <div className="row"></div>
        <div className="row">
          <div className="col">{props.t("categoryKey")}:</div>
          <div className="col">{category.categoryKey}</div>
        </div>
      </div>
    );
  };

  const getCategoryList = () => {
    let categories = [];
    if (audiobookDetail != null && audiobookDetail.categories != undefined) {
      audiobookDetail.categories.forEach((category) => {
        categories.push(createCategory(category));
      });
    }

    return (
      <div className="row text-light d-flex justify-content-center mx-1">
        {categories}
      </div>
    );
  };

  return (
    <Modal
      show={props.state.detailAudiobookModal}
      onHide={handleClose}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="bg-dark">
        <Button
          name="en"
          size="sm"
          className="btn button primary_button"
          onClick={getZip}
        >
          {props.t("downloadZip")}
        </Button>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        <div className="row ">
          <div className="col">
            <div className="row ">
              <img
                src={
                  audiobookCover == null
                    ? "/noImg.jpg"
                    : window.URL.createObjectURL(new Blob([audiobookCover]))
                }
                className="card-img-top"
                alt="..."
              />
            </div>
            <div className="row d-flex justify-content-center">
              <Form.Group controlId="formFileSm" className="my-1">
                <Form.Control
                  onChange={handleOnFileChange}
                  type="file"
                  size="sm"
                />
              </Form.Group>
              <Button
                name="en"
                variant="secondary"
                size="sm"
                className="btn button px-4 my-2 modal_img_button"
                disabled={stateModal.file == null}
                onClick={editCover}
              >
                {props.t("editCover")}
              </Button>
            </div>
            <div className="row d-flex justify-content-center text-light text-center">
              <h4>{props.t("categories")}</h4>
            </div>
            {getCategoryList()}
   
          </div>
          <div className="col">
            <div className="row ">
              <div className="row text-light">
                <InputGroup className="mb-1 input_modal">
                  <InputGroup.Text className="input-group-text-new text-light">
                    {props.t("title")}
                  </InputGroup.Text>
                  <Form.Control
                    defaultValue={
                      audiobookDetail != null ? audiobookDetail.title : ""
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
                    defaultValue={
                      audiobookDetail != null ? audiobookDetail.author : ""
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
                    defaultValue={
                      audiobookDetail != null ? audiobookDetail.album : ""
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
                    defaultValue={
                      audiobookDetail != null
                        ? createDate(audiobookDetail.year)
                        : ""
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
                    defaultValue={
                      audiobookDetail != null ? audiobookDetail.parts : ""
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
                    defaultValue={
                      audiobookDetail != null ? audiobookDetail.duration : ""
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
                    defaultValue={
                      audiobookDetail != null ? audiobookDetail.description : ""
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
                    defaultValue={
                      audiobookDetail != null ? audiobookDetail.encoded : ""
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
                    defaultValue={
                      audiobookDetail != null ? audiobookDetail.size : ""
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
                    defaultValue={
                      audiobookDetail != null ? +audiobookDetail.version : ""
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
                      {audiobookDetail != null ? (
                        <Dropdown.Item
                          eventKey={1}
                          active={audiobookDetail.age == 1}
                        >
                          3-7
                        </Dropdown.Item>
                      ) : null}
                      {audiobookDetail != null ? (
                        <Dropdown.Item
                          eventKey={2}
                          active={audiobookDetail.age == 2}
                        >
                          7-12
                        </Dropdown.Item>
                      ) : null}

                      {audiobookDetail != null ? (
                        <Dropdown.Item
                          eventKey={3}
                          active={audiobookDetail.age == 3}
                        >
                          12-16
                        </Dropdown.Item>
                      ) : null}

                      {audiobookDetail != null ? (
                        <Dropdown.Item
                          eventKey={4}
                          active={audiobookDetail.age == 4}
                        >
                          16-18
                        </Dropdown.Item>
                      ) : null}

                      {audiobookDetail != null ? (
                        <Dropdown.Item
                          eventKey={5}
                          active={audiobookDetail.age == 5}
                        >
                          18+
                        </Dropdown.Item>
                      ) : null}
                    </Dropdown.Menu>
                    <InputGroup.Text id="inputGroup-sizing-default">
                      {audiobookDetail != null
                        ? audiobookDetail.age == 1
                          ? "3-7"
                          : audiobookDetail.age == 2
                          ? "7-12"
                          : audiobookDetail.age == 3
                          ? "12-16"
                          : audiobookDetail.age == 4
                          ? "16-18"
                          : audiobookDetail.age == 5
                          ? "18+"
                          : null
                        : null}
                    </InputGroup.Text>
                  </Dropdown>
                </InputGroup>
              </div>
              {stateModal.edit ? (
                <div className="row">
                  <div className="col">
                    <Button
                      name="en"
                      size="sm"
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
                        setStateModal({
                          ...stateModal,
                          edit: !stateModal.edit,
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
                    className="btn button px-4 mt-3 mb-1 modal_button success_button"
                    onClick={() =>
                      setStateModal({
                        ...stateModal,
                        edit: !stateModal.edit,
                      })
                    }
                  >
                    {props.t("edit")}
                  </Button>
                </div>
              )}

              {stateModal.deleteFromCategory ? (
                <div className="row">
                  <div className="col">
                    <Button
                      name="en"
                      size="sm"
                      className="btn button px-4 my-1 question_button success_button"
                      onClick={deleteAudiobookFromCategory}
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
                        setStateModal({
                          ...stateModal,
                          deleteFromCategory: !stateModal.deleteFromCategory,
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
                    className="btn button px-4 my-1 modal_button danger_button"
                    onClick={() =>
                      setStateModal({
                        ...stateModal,
                        deleteFromCategory: !stateModal.deleteFromCategory,
                      })
                    }
                  >
                    {props.t("deleteFromCurrentCategory")}
                  </Button>
                </div>
              )}

              {stateModal.deleteEntarly ? (
                <div className="row">
                  <div className="col">
                    <Button
                      name="en"
                      size="sm"
                      className="btn button px-4 my-1 question_button success_button"
                      onClick={deleteAudiobookEntarly}
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
                        setStateModal({
                          ...stateModal,
                          deleteEntarly: !stateModal.deleteEntarly,
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
                    className="btn button px-4 my-1 modal_button danger_button"
                    onClick={() =>
                      setStateModal({
                        ...stateModal,
                        deleteEntarly: !stateModal.deleteEntarly,
                      })
                    }
                  >
                    {props.t("deleteEntarly")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <hr className="text-light"></hr>
        <div className="row d-flex justify-content-center">
          {audiobookPart != null ? (
            <AudioPlayer
              autoPlay={false}
              src={window.URL.createObjectURL(new Blob([audiobookPart]))}
              // onListen={e=>timeCur(e)}
              autoPlayAfterSrcChange={false}
              showSkipControls={true}
              // onClickPrevious={()=>prevPart()}
              // onClickNext={()=>nextPart()}
            />
          ) : null}
        </div>
      </Modal.Body>
    </Modal>
  );
}
