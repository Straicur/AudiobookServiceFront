import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import { HandleFetch } from "../../Components/HandleFetch";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function RenderCommentsList(props) {
  const [commentState, setCommentState] = useState({
    parentId: null,
    commentId: null,
    comment: "",
    add: true,
    edit: false,
  });

  const lastOpenComment = useRef(null);
  //todo dodaj do rozwijania komentarzy jakieś lepsze przejście

  //--------------------------------------------------------------------------------------------------------------------------------
  //Changing comments functions
  function setComment(comment, bool) {
    let newComments = props.comments.map((element) => {
      let like = element.audiobookCommentLike;
      let unlike = element.audiobookCommentUnlike;

      if (bool) {
        if (comment.liked == bool) {
          like = like - 1;
        } else if (comment.liked != null && comment.liked != bool) {
          like = like + 1;
          unlike = unlike - 1;
        } else {
          like = like + 1;
        }
      } else {
        if (comment.liked == bool) {
          unlike = unlike - 1;
        } else if (comment.liked != null && comment.liked != bool) {
          unlike = unlike + 1;
          like = like - 1;
        } else {
          unlike = unlike + 1;
        }
      }

      if (element.id == comment.id) {
        return {
          audiobookCommentLike: like,
          audiobookCommentUnlike: unlike,
          children: element.children,
          comment: element.comment,
          deleted: element.deleted,
          edited: element.edited,
          id: element.id,
          liked: element.liked == bool ? null : bool,
          myComment: element.myComment,
          userModel: element.userModel,
          parentId: element.parentId,
        };
      }
      return element;
    });
    props.setAudiobookUserComments(newComments);
  }

  function setChildComment(parentId, comment, bool) {
    let parent = props.comments.find((element) => element.id == parentId);

    let children = parent.children.map((element) => {
      let like = element.audiobookCommentLike;
      let unlike = element.audiobookCommentUnlike;

      if (bool) {
        if (comment.liked == bool) {
          like = like - 1;
        } else if (comment.liked != null && comment.liked != bool) {
          like = like + 1;
          unlike = unlike - 1;
        } else {
          like = like + 1;
        }
      } else {
        if (comment.liked == bool) {
          unlike = unlike - 1;
        } else if (comment.liked != null && comment.liked != bool) {
          unlike = unlike + 1;
          like = like - 1;
        } else {
          unlike = unlike + 1;
        }
      }

      if (element.id == comment.id) {
        return {
          audiobookCommentLike: like,
          audiobookCommentUnlike: unlike,
          children: element.children,
          comment: element.comment,
          deleted: element.deleted,
          edited: element.edited,
          id: element.id,
          liked: element.liked == bool ? null : bool,
          myComment: element.myComment,
          userModel: element.userModel,
          parentId: element.parentId,
        };
      }
      return element;
    });

    let newComments = props.comments.map((element) => {
      if (element.id == parent.id) {
        return {
          audiobookCommentLike: element.audiobookCommentLike,
          audiobookCommentUnlike: element.audiobookCommentUnlike,
          children: children,
          comment: element.comment,
          deleted: element.deleted,
          edited: element.edited,
          id: element.id,
          liked: element.liked,
          myComment: element.myComment,
          userModel: element.userModel,
          parentId: element.parentId,
        };
      }
      return element;
    });
    props.setAudiobookUserComments(newComments);
  }

  function likeComment(comment, element, bool) {
    let url;
    let method;
    let jsonData;

    if (comment.children.length == 0) {
      lastOpenComment.current = comment.parentId;
    }

    if (comment.liked == bool) {
      url = "http://127.0.0.1:8000/api/user/audiobook/comment/like/delete";
      method = "DELETE";
      jsonData = {
        commentId: comment.id,
      };
    } else {
      url = "http://127.0.0.1:8000/api/user/audiobook/comment/like/add";
      method = "PATCH";
      jsonData = {
        commentId: comment.id,
        like: bool,
      };
    }

    element.target.classList.add("disabled");

    HandleFetch(url, method, jsonData, props.token,
      props.i18n.language)
      .then(() => {
        if (comment.parentId != null) {
          setChildComment(comment.parentId, comment, bool);
        } else {
          setComment(comment, bool);
        }

        element.target.classList.remove("disabled");
      })
      .catch((e) => {
        element.target.classList.remove("disabled");
      });
  }

  function editComment(element) {
    element.target.classList.add("disabled");
    let jsonData = {
      audiobookId: props.state.detailModalAudiobook.id,
      categoryKey: props.state.detailModalCategory.categoryKey,
      audiobookCommentId: commentState.commentId,
      comment: commentState.comment,
      deleted: false,
    };

    if (commentState.parentId != null) {
      lastOpenComment.current = commentState.parentId;

      jsonData.additionalData = {
        parentId: commentState.parentId,
      };
    }

    HandleFetch(
      "http://127.0.0.1:8000/api/user/audiobook/comment/edit",
      "PATCH",
      jsonData,
      props.token,
      props.i18n.language
    )
      .then(() => {
        element.target.classList.remove("disabled");
        props.refetch(true);
        decline();
      })
      .catch((e) => {
        element.target.classList.remove("disabled");
      });
  }

  function addComment(element) {
    element.target.classList.add("disabled");
    let jsonData = {
      audiobookId: props.state.detailModalAudiobook.id,
      categoryKey: props.state.detailModalCategory.categoryKey,
      comment: commentState.comment,
    };

    if (commentState.parentId != null) {
      lastOpenComment.current = commentState.parentId;

      jsonData.additionalData = {
        parentId: commentState.parentId,
      };
    }

    HandleFetch(
      "http://127.0.0.1:8000/api/user/audiobook/comment/add",
      "PUT",
      jsonData,
      props.token,
      props.i18n.language
    )
      .then(() => {
        element.target.classList.remove("disabled");
        props.refetch(true);
        decline();
      })
      .catch((e) => {
        element.target.classList.remove("disabled");
      });
  }
  function deleteComment(comment, element) {
    element.target.classList.add("disabled");

    HandleFetch(
      "http://127.0.0.1:8000/api/user/audiobook/comment/edit",
      "PATCH",
      {
        audiobookId: props.state.detailModalAudiobook.id,
        categoryKey: props.state.detailModalCategory.categoryKey,
        audiobookCommentId: comment.id,
        comment: comment.comment,
        deleted: true,
      },
      props.token,
      props.i18n.language
    )
      .then(() => {
        element.target.classList.remove("disabled");
        props.refetch(true);
        decline();
      })
      .catch((e) => {
        element.target.classList.remove("disabled");
      });
  }

  //--------------------------------------------------------------------------------------------------------------------------------
  //Small state functions
  function startEditComment(comment) {
    if (comment.parentId != null) {
      lastOpenComment.current = comment.parentId;
    }

    setCommentState({
      ...commentState,
      commentId: comment.id,
      comment: comment.comment,
      edit: true,
      add: false,
    });
  }

  function addChildComment(comment) {
    lastOpenComment.current = comment.id;

    setCommentState({
      ...commentState,
      parentId: comment.id,
      commentId: comment.id,
      comment: "",
      edit: false,
      add: true,
    });
  }

  function decline() {
    setCommentState({
      ...commentState,
      parentId: null,
      commentId: null,
      comment: "",
      add: true,
      edit: false,
    });
  }

  function textareaWrite(event) {
    setCommentState({
      ...commentState,
      comment: event.target.value,
    });
  }
  function showText(comment, element) {
    element.currentTarget.parentElement.innerHTML = comment;
  }

  //--------------------------------------------------------------------------------------------------------------------------------
  //Opening/Closing parent list

  const oparateParentList = (element) => {
    element.stopPropagation();
    if (element.currentTarget.attributes["data-clicable"].value == "true") {
      openParentList(element);
    } else {
      closeParentList(element);
    }
  };

  function openParentList(element) {
    element.currentTarget.parentElement.parentElement.classList.remove("ps-3");
    element.currentTarget.parentElement.parentElement.classList.remove(
      "comment-pill"
    );
    element.currentTarget.parentElement.parentElement.classList.add(
      "comments-pill"
    );
    element.currentTarget.parentElement.parentElement.classList.add("px-2");

    let children = element.currentTarget.parentElement.parentElement.children;

    element.currentTarget.attributes["data-clicable"].value = "false";

    for (const element of children) {
      for (const el of element.children) {
        el.classList.remove("d-none");
      }
      if (
        element.children[0].nodeName == "DIV" &&
        element.children[0].attributes["data-clicable"] != undefined
      ) {
        let icon = element.children[0].children[0].children[0].children[0];
        icon.classList.remove("bi-arrow-right-square");
        icon.classList.add("bi-arrow-down-square");
      }
    }
  }

  function closeParentList(element) {
    element.currentTarget.parentElement.parentElement.classList.remove(
      "comments-pill"
    );
    element.currentTarget.parentElement.parentElement.classList.remove("px-2");
    element.currentTarget.parentElement.parentElement.classList.add("ps-3");
    element.currentTarget.parentElement.parentElement.classList.add(
      "comment-pill"
    );

    let children = element.currentTarget.parentElement.parentElement.children;

    element.currentTarget.attributes["data-clicable"].value = "true";

    for (const element of children) {
      if (element.nodeName == "UL") {
        for (const el of element.children) {
          el.classList.add("d-none");
        }
      }
      if (
        element.children[0].nodeName == "DIV" &&
        element.children[0].attributes["data-clicable"] != undefined
      ) {
        let icon = element.children[0].children[0].children[0].children[0];
        icon.classList.remove("bi-arrow-down-square");
        icon.classList.add("bi-arrow-right-square");
      }
    }
  }

  //--------------------------------------------------------------------------------------------------------------------------------
  //Render
  function listParent(element, child) {
    return (
      <li
        key={uuidv4()}
        className={
          commentState.commentId == element.id
            ? element.id == lastOpenComment.current
              ? "border border-6 border-warning border comment comments-pill px-2 py-1"
              : "border border-6 border-warning border comment comment-pill ps-3 pb-1"
            : element.id == lastOpenComment.current
            ? "border border-6 border-secondary border comment comments-pill px-2 py-1"
            : "border border-6 border-secondary border comment comment-pill ps-3 pb-1"
        }
      >
        <div className="row p-1 bd-highlight">
          <div
            className="col-8"
            onClick={child.length > 0 ? oparateParentList : undefined}
            data-clicable={true}
          >
            <div className="row">
              <div className="col-1 cs">
                {child.length > 0 ? (
                  element.id == lastOpenComment.current ? (
                    <i className="p-2 bi bi-arrow-down-square "></i>
                  ) : (
                    <i className="p-2 bi bi-arrow-right-square "></i>
                  )
                ) : null}
              </div>
              <div className="col-1">
                <span className="badge bg-dark comment-pill">
                  {element.children.length}
                </span>
              </div>
              <div className="col-8 fw-bold medium-text">
                {element.userModel.email}
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="row justify-content-center ">
              <div className="row">
                <div className="col-1">
                  <span className="badge bg-dark comment-pill">
                    {element.audiobookCommentLike}
                  </span>
                </div>
                <div className="col-3">
                  <Button
                    name="en"
                    variant={
                      element.liked == null || !element.liked
                        ? "dark"
                        : "success"
                    }
                    size="sm"
                    className={
                      element.liked == null || !element.liked
                        ? "btn button rounded-3 primary_button"
                        : "btn button rounded-3 success_button"
                    }
                    onClick={(e) => {
                      likeComment(element, e, true);
                    }}
                  >
                    <i className="bi bi-hand-thumbs-up"></i>
                  </Button>
                </div>
                <div className="col-3">
                  <Button
                    name="en"
                    variant={
                      element.liked == null || element.liked ? "dark" : "danger"
                    }
                    size="sm"
                    className={
                      element.liked == null || element.liked
                        ? "btn button rounded-3 primary_button"
                        : "btn button rounded-3 danger_button"
                    }
                    onClick={(e) => {
                      likeComment(element, e, false);
                    }}
                  >
                    <i className="bi bi-hand-thumbs-down"></i>
                  </Button>
                </div>
                <div className="col-1">
                  <span className="badge bg-dark comment-pill">
                    {element.audiobookCommentUnlike}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mx-1 small-text my-1">
          {element.comment.length > 20 ? (
            <div className="row text-break">
              <div className="col-8">{element.comment.slice(0, 40)}</div>
              <p
                className="col-4 show-more"
                onClick={(e) => showText(element.comment, e)}
              >
                {props.t("showMore")}
              </p>
            </div>
          ) : (
            <div className="row">{element.comment}</div>
          )}
        </div>
        {element.myComment ? (
          <div className="col-5">
            <div className="row mx-1 justify-content-start">
              <div className="col-4">
                <Button
                  name="en"
                  variant="secondary"
                  size="sm"
                  className="btn button rounded-3 warning_button comment-button-small"
                  disabled={commentState.edit}
                  onClick={(e) => {
                    startEditComment(element, e);
                  }}
                >
                  {props.t("edit")}
                </Button>
              </div>
              <div className="col-4">
                <Button
                  name="en"
                  variant="danger"
                  size="sm"
                  className="btn button rounded-3 danger_button comment-button-small text-center"
                  onClick={(e) => {
                    deleteComment(element, e);
                  }}
                >
                  {props.t("delete")}
                </Button>
              </div>
              <div className="col-4">
                <Button
                  name="en"
                  variant="success"
                  size="sm"
                  disabled={commentState.parentId != null}
                  className="btn button rounded-3 success_button comment-button-small text-center"
                  onClick={() => addChildComment(element)}
                >
                  {props.t("add")}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-5">
            <Button
              name="en"
              variant="success"
              size="sm"
              disabled={commentState.parentId != null}
              className="btn button rounded-3 success_button comment-button-small text-center"
              onClick={() => addChildComment(element)}
            >
              {props.t("add")}
            </Button>
          </div>
        )}
        {element.children.length > 0 ? (
          <ul className="list-group" data-name={element.id}>
            {child}
            <div
              className={
                lastOpenComment.current == element.id
                  ? "row mt-2 justify-content-center"
                  : "row mt-2 d-none justify-content-center"
              }
            >
              <div className="col-8 align-self-center">
                <Button
                  name="en"
                  variant="success"
                  size="sm"
                  disabled={commentState.parentId != null}
                  className="btn button rounded-3 add-parent-comment-button mb-1 success_button"
                  onClick={() => addChildComment(element)}
                >
                  {props.t("add")}
                </Button>
              </div>
            </div>
          </ul>
        ) : null}
      </li>
    );
  }

  function createListElement(element) {
    return (
      <li
        key={uuidv4()}
        className={
          lastOpenComment.current == element.parentId
            ? commentState.commentId == element.id
              ? "px-3 py-1 my-1 comment-pill border border-warning"
              : "px-3 py-1 my-1 border comment-pill"
            : "d-none px-3 py-1 my-1 border comment-pill"
        }
        id={element.id}
      >
        <div className="row p-1 bd-highlight">
          <div className="col-8 fw-bold medium-text">
            {element.userModel.email}
          </div>
          <div className="col-4">
            <div className="row justify-content-center ">
              <div className="row">
                <div className="col-1">
                  <span className="badge bg-dark comment-pill">
                    {element.audiobookCommentLike}
                  </span>
                </div>
                <div className="col-3">
                  <Button
                    name="en"
                    variant={
                      element.liked == null || !element.liked
                        ? "dark"
                        : "success"
                    }
                    size="sm"
                    className={
                      element.liked == null || !element.liked
                        ? "btn button rounded-3 primary_button"
                        : "btn button rounded-3 success_button"
                    }
                    onClick={(e) => {
                      likeComment(element, e, true);
                    }}
                  >
                    <i className="bi bi-hand-thumbs-up"></i>
                  </Button>
                </div>
                <div className="col-3">
                  <Button
                    name="en"
                    variant={
                      element.liked == null || element.liked ? "dark" : "danger"
                    }
                    size="sm"
                    className={
                      element.liked == null || element.liked
                        ? "btn button rounded-3 primary_button"
                        : "btn button rounded-3 danger_button"
                    }
                    onClick={(e) => {
                      likeComment(element, e, false);
                    }}
                  >
                    <i className="bi bi-hand-thumbs-down"></i>
                  </Button>
                </div>
                <div className="col-1">
                  <span className="badge bg-dark comment-pill">
                    {element.audiobookCommentUnlike}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mx-2 small-text my-1">
          {element.comment.length > 20 ? (
            <div className="row text-break">
              <div className="col-8">{element.comment.slice(0, 40)}</div>
              <p
                className="col-4 show-more"
                onClick={(e) => showText(element.comment, e)}
              >
                {props.t("showMore")}
              </p>
            </div>
          ) : (
            <div className="row">{element.comment}</div>
          )}
        </div>
        {element.myComment ? (
          <div className="col-7">
            <div className="row mx-1 justify-content-start">
              <div className="col-3">
                <Button
                  name="en"
                  variant="secondary"
                  size="sm"
                  className="btn button rounded-3 warning_button comment-button-small text-center"
                  disabled={commentState.edit}
                  onClick={(e) => {
                    startEditComment(element, e);
                  }}
                >
                  {props.t("edit")}
                </Button>
              </div>
              <div className="col-3">
                <Button
                  name="en"
                  variant="danger"
                  size="sm"
                  className="btn button rounded-3 danger_button comment-button-small text-center"
                  onClick={(e) => {
                    deleteComment(element, e);
                  }}
                >
                  {props.t("delete")}
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </li>
    );
  }

  function createTree(array, renderArray) {
    for (const element of array) {
      let children = [];

      if (element["children"].length != 0) {
        children.push(
          <hr
            key={uuidv4()}
            className={element.id == lastOpenComment.current ? null : "d-none"}
          ></hr>
        );
        for (const child of element["children"]) {
          children.push(createListElement(child));
        }
      }
      renderArray.push(listParent(element, children));
    }
  }

  const renderTree = () => {
    let renderArray = [];

    if (props.comments != undefined) {
      createTree(props.comments, renderArray);
    }

    return renderArray;
  };
  return (
    <div className="row">
      <ul className="comments-heigth overflow-auto ">{renderTree()}</ul>
      <div className="row mt-2 justify-content-center align-items-center">
        <div className="col-8">
          <InputGroup>
            <InputGroup.Text
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                borderColor: "#3C3C3C",
                color: "white",
              }}
            >
              {props.t("comment")}
            </InputGroup.Text>
            <Form.Control
              onChange={(e) => textareaWrite(e)}
              value={commentState.comment}
              as="textarea"
              aria-label="With textarea"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                borderColor: "#3C3C3C",
                color: "white",
                fontSize: "0.9rem",
              }}
            />
          </InputGroup>
        </div>
        <div className="col-2">
          <Button
            name="en"
            variant="secondary"
            size="sm"
            className="btn button rounded-3 comment-button warning_button"
            disabled={
              (!commentState.edit && commentState.comment.length == 0) ||
              (commentState.add && commentState.comment.length == 0)
            }
            onClick={decline}
          >
            {props.t("cancel")}
          </Button>
        </div>
        <div className="col-2">
          <Button
            name="en"
            variant="secondary"
            size="sm"
            className="btn button rounded-3 comment-button primary_button"
            disabled={commentState.comment.length == 0}
            onClick={
              commentState.add
                ? (e) => {
                    addComment(e);
                  }
                : commentState.edit
                ? (e) => {
                    editComment(e);
                  }
                : undefined
            }
          >
            {commentState.add
              ? props.t("add")
              : commentState.edit
              ? props.t("edit")
              : null}
          </Button>
        </div>
      </div>
    </div>
  );
}
