import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useAudiobookData } from "../../../../Components/Providers/AudiobookProviders/AudiobookDataProvider";
import { useAudiobookCover } from "../../../../Components/Providers/AudiobookProviders/AudiobookCoverDataProvider";
import { useAudiobookPart } from "../../../../Components/Providers/AudiobookProviders/AudiobookPartProvider";
import { useAudiobookComments } from "../../../../Components/Providers/AudiobookProviders/AudiobookCommentsProvider";

export default function CategoryAudiobookDetailModal(props) {
  const audiobookDetail = useAudiobookData();
  const audiobookCover = window.URL.createObjectURL(
    new Blob([useAudiobookCover()])
  );
  const audiobookPart = window.URL.createObjectURL(
    new Blob([useAudiobookPart()])
  );
  const audiobookComments = useAudiobookComments();

  const handleClose = () => {
    props.setState({
      ...props.state,
      detailAudiobookModal: !props.state.detailAudiobookModal,
    });
  };

  const createComment = (comment) => {
    //Todo tu mam do zrobienia te drzewo komentarzy
    return (
      <div className="row border border-secondary category_data mb-1">
        <div className="row">
          <div className="col">{props.t("owner")}:</div>
          <div className="col">{comment.userModel.email}</div>
        </div>
        <div className="row">
          <div className="col">{props.t("comment")}:</div>
          <div className="col">{comment.comment}</div>
        </div>
      </div>
    );
  };

  const getCommentList = () => {
    let comments = [];
    if (audiobookComments != null) {
      if (audiobookComments.audiobookCommentGetModels != undefined) {
        console.log(audiobookComments.audiobookCommentGetModels);
        audiobookComments.audiobookCommentGetModels.forEach((comment) => {
          comments.push(createComment(comment));
        });
      }
    }

    return (
      <div className="row text-light d-flex justify-content-center mx-1">
        {comments}
      </div>
    );
  };

  const createCategory = (category) => {
    return (
      <div className="row border border-secondary category_data mb-1">
        <div className="row">
          <div className="col">{props.t("name")}:</div>
          <div className="col">{category.name}</div>
          <div className="col">{props.t("active")}</div>
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
    if (audiobookDetail != null) {
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
        <Button name="en" size="sm" className="btn button primary_button">
          {/* {audiobookDetail.like ? t("Unlike") : t("Like")} */}
          {props.t("downloadZip")}
        </Button>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        <div className="row ">
          <div className="col">
            <div className="row ">
              <img
                src={audiobookCover == null ? "/noImg.jpg" : audiobookCover}
                className="card-img-top"
                alt="..."
              />
            </div>
            <div className="row d-flex justify-content-center">
              <Button
                name="en"
                variant="secondary"
                size="sm"
                className="btn button px-4 my-2 modal_img_button"
              >
                {/* {audiobookDetail.like ? t("Unlike") : t("Like")} */}
                {props.t("editCover")}
              </Button>
            </div>
            <div className="row d-flex justify-content-center text-light text-center">
              <h4>{props.t("categories")}</h4>
            </div>
            {getCategoryList()}
            <div className="row d-flex justify-content-center text-light text-center">
              <h4>{props.t("comments")}</h4>
            </div>
            {getCommentList()}
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
                      audiobookDetail != null ? +"" + audiobookDetail.title : ""
                    }
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
                      audiobookDetail != null ? +"" + audiobookDetail.title : ""
                    }
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
                      audiobookDetail != null ? +"" + audiobookDetail.album : ""
                    }
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
                      audiobookDetail != null ? +"" + audiobookDetail.year : ""
                    }
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
                      audiobookDetail != null ? +"" + audiobookDetail.parts : ""
                    }
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
                      audiobookDetail != null
                        ? +"" + audiobookDetail.duration
                        : ""
                    }
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
                      audiobookDetail != null
                        ? +"" + audiobookDetail.description
                        : ""
                    }
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
                      audiobookDetail != null
                        ? +"" + audiobookDetail.encoded
                        : ""
                    }
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
                      audiobookDetail != null ? +"" + audiobookDetail.parts : ""
                    }
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
                      audiobookDetail != null
                        ? +"" + audiobookDetail.version
                        : ""
                    }
                  />
                </InputGroup>
              </div>
              <div className="row text-light">
                {/* {t("desc")}: {audiobookDetail.comments} */}
              </div>
              <div className="row text-light">
                {/* {t("desc")}: {audiobookDetail.categories} */}
              </div>
              <div className="row text-light">
                <div className="col-7 input_modal pe-0">
                  <InputGroup className="mb-1">
                    <Dropdown>
                      <Dropdown.Toggle className=" text-start" variant="success" id="dropdown-basic">
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
                            : audiobookDetail.age == 3
                            ? "16-18"
                            : audiobookDetail.age == 5
                            ? "18+"
                            : null
                          : null}
                      </InputGroup.Text>
                    </Dropdown>
                  </InputGroup>
                </div>
                <div className="col-5 ">
                  <InputGroup className="mb-3">
                    <InputGroup.Text>{props.t("active")}</InputGroup.Text>
                    <Button variant="outline-secondary" id="button-addon2">
                      {audiobookDetail != null ? (
                        audiobookDetail.active ? (
                          <i className="bi bi-bookmark-check-fill"></i>
                        ) : (
                          <i className="bi bi-bookmark-dash"></i>
                        )
                      ) : null}
                    </Button>
                  </InputGroup>
                </div>
              </div>
              <div className="row">
                <Button
                  name="en"
                  size="sm"
                  className="btn button px-4 mt-3 mb-1 modal_button success_button"
                >
                  {/* {audiobookDetail.like ? t("Unlike") : t("Like")} */}
                  {props.t("edit")}
                </Button>
              </div>
              <div className="row">
                <Button
                  name="en"
                  size="sm"
                  className="btn button px-4 my-1 modal_button danger_button"
                >
                  {/* {audiobookDetail.like ? t("Unlike") : t("Like")} */}
                  {props.t("deleteFromCurrentCategory")}
                </Button>
              </div>
              <div className="row">
                <Button
                  name="en"
                  size="sm"
                  className="btn button px-4 my-1 modal_button danger_button"
                >
                  {/* {audiobookDetail.like ? t("Unlike") : t("Like")} */}
                  {props.t("deleteEntarly")}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <hr className="text-light"></hr>
        <div className="row d-flex justify-content-center">
          {audiobookPart != null ? (
            <AudioPlayer
              autoPlay={false}
              src={audiobookPart}
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
