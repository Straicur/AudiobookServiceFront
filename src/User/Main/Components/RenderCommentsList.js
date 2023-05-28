import React, { useEffect, useState, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import { HandleFetch } from "../../../Components/HandleFetch";
import Accordion from "react-bootstrap/Accordion";
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
  // 2 Ostyluj| Kolory mają być dostosowanie nie podstawowe, te rozwijanie komentarza zrób jak na fb a nie jak tera bo jest źle,
  // tak samo z tym polem do dodawania niech będzie przeźroczyste, poszukaj czegoś o animacji przejścia do innej klasy bo za szybko się zmienia,
  // Napis pusto w komentarzach zamień na coś innego i go też ostyluj i do tego jakoś bliżej te dodawanie komentarzy , przycisk zamknięcia też niech ma inny kolor ciut
  // 3 podziel na mniejsze kawałki
  // 4 aktywacja tych audiobooków powinna czekać aż się wykona jeden bo tak to tylko jeden mi się zmienia !!!! Do poprawy w kategoriach i audibookach
  // 5 Wyszukiwarka raczej powinna zwracać listę bez podziału na kategorie i do tego raczej przyda się nowy endopoint i konycjonowanie rendera listy
  // Mogę podmienić po prostu provider i rzeczy


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

    HandleFetch(url, method, jsonData, props.token)
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

  function editComment(element) {
    element.target.classList.add("disabled");
    let jsonData = {
      audiobookId: props.audiobooksState.detailModalAudiobook.id,
      categoryKey: props.audiobooksState.detailModalCategory.categoryKey,
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
      props.token
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

  function addComment(element) {
    element.target.classList.add("disabled");
    let jsonData = {
      audiobookId: props.audiobooksState.detailModalAudiobook.id,
      categoryKey: props.audiobooksState.detailModalCategory.categoryKey,
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
      props.token
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

  function deleteComment(comment, element) {
    element.target.classList.add("disabled");

    HandleFetch(
      "http://127.0.0.1:8000/api/user/audiobook/comment/edit",
      "PATCH",
      {
        audiobookId: props.audiobooksState.detailModalAudiobook.id,
        categoryKey: props.audiobooksState.detailModalCategory.categoryKey,
        audiobookCommentId: comment.id,
        comment: comment.comment,
        deleted: true,
      },
      props.token
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

  const renderTree = () => {
    let renderArray = [];

    if (props.comments != undefined) {
      createTree(props.comments, renderArray);
    }

    if (props.comments != null && props.comments.length == 0) {
      renderArray.push(
        <div key={uuidv4()} className="text-center">
          <h3>{props.t("empty")}</h3>
        </div>
      );
    }

    return renderArray;
  };

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
      "rounded-3"
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
      "rounded-3"
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

  function listParent(element, child) {
    return (
      <li
        key={uuidv4()}
        className={
          commentState.commentId == element.id
            ? element.id == lastOpenComment.current
              ? "border border-6 border-warning border  rounded-3 px-2 comment py-1"
              : "border border-6 border-warning border comment-pill ps-3 pb-1 comment"
            : element.id == lastOpenComment.current
            ? "border border-6 border-secondary border rounded-3 px-2 comment py-1"
            : "border border-6 border-secondary border comment-pill ps-3 pb-1 comment"
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
                ) : (
                  <div className="p-2 bd-highlight"></div>
                )}
              </div>
              <div className="col-1">
                <span className="badge bg-dark comment-pill">
                  {element.children.length}
                </span>
              </div>
              <div className="col-8">{element.userModel.email}</div>
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
                    className="btn button rounded-3"
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
                    className="btn button rounded-3"
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

        <div className="row mx-1">
          <div className="col-7 accordion-customs">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>{props.t("comment")}...</Accordion.Header>
                <Accordion.Body>{element.comment}</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          {element.myComment ? (
            <div className="col-5">
              <div className="row mx-1">
                <div className="col-4">
                  <Button
                    name="en"
                    variant="warning"
                    size="sm"
                    className="btn button rounded-3"
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
                    className="btn button rounded-3"
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
                    className="btn button rounded-3"
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
                className="btn button rounded-3"
                onClick={() => addChildComment(element)}
              >
                {props.t("add")}
              </Button>
            </div>
          )}
        </div>
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
                  className="btn button rounded-3 add-parent-comment-button mb-1"
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
          <div className="col-8">{element.userModel.email}</div>
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
                    className="btn button rounded-3"
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
                    className="btn button rounded-3"
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

        <div className="row mx-1">
          <div className="col-8 accordion-customs">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>{props.t("comment")}...</Accordion.Header>
                <Accordion.Body>{element.comment}</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          {element.myComment ? (
            <div className="col-4">
              <div className="row mx-1">
                <div className="col-6">
                  <Button
                    name="en"
                    variant="warning"
                    size="sm"
                    className="btn button rounded-3"
                    disabled={commentState.edit}
                    onClick={(e) => {
                      startEditComment(element, e);
                    }}
                  >
                    {props.t("edit")}
                  </Button>
                </div>
                <div className="col-6">
                  <Button
                    name="en"
                    variant="danger"
                    size="sm"
                    className="btn button rounded-3"
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
        </div>
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

  return (
    <div className="row">
      <ul className="comments-heigth overflow-auto">{renderTree()}</ul>
      <div className="row mt-2  justify-content-center align-items-center ms-1">
        <div className="col-8">
          <InputGroup>
            <InputGroup.Text>{props.t("comment")}</InputGroup.Text>
            <Form.Control
              onChange={(e) => textareaWrite(e)}
              value={commentState.comment}
              as="textarea"
              aria-label="With textarea"
            />
          </InputGroup>
        </div>
        <div className="col-2">
          <Button
            name="en"
            variant="warning"
            size="sm"
            className="btn button rounded-3 comment-button"
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
            className="btn button rounded-3 comment-button"
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
