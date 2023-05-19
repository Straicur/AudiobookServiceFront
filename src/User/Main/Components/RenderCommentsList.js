import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import { HandleFetch } from "../../../Components/HandleFetch";
import Accordion from "react-bootstrap/Accordion";

export default function RenderCommentsList(props) {
  function likeCommnet(comment, element, bool) {
    let url;
    let method;
    let jsonData;
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
            };
          }
          return element;
        });
        props.setAudiobookUserComments(newComments);
        element.target.classList.remove("disabled");
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
        <div key={uuidv4()} className="row text-center">
          <div className="col-md-6 offset-md-3 ">
            <h3>{props.t("empty")}</h3>
          </div>
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
    let children = element.currentTarget.parentElement.parentElement.children;

    element.currentTarget.attributes["data-clicable"].value = "false";

    for (const element of children) {
      if (element.nodeName == "UL") {
        for (const el of element.children) {
          el.classList.remove("d-none");
        }
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
    console.log(element);
    return (
      <li
        key={uuidv4()}
        className={
          "border border-4 border-secondary list-group-item list-group-item-dark"
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
                  <i className="p-2 bi bi-arrow-right-square "></i>
                ) : (
                  <div className="p-2 bd-highlight"></div>
                )}
              </div>
              <div className="col-1">
                <span className="badge bg-dark rounded-pill">
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
                  <span className="badge bg-dark rounded-pill">
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
                      likeCommnet(element, e, true);
                    }}
                  >
                    <i class="bi bi-hand-thumbs-up"></i>
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
                      likeCommnet(element, e, false);
                    }}
                  >
                    <i class="bi bi-hand-thumbs-down"></i>
                  </Button>
                </div>
                <div className="col-1">
                  <span className="badge bg-dark rounded-pill">
                    {element.audiobookCommentUnlike}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row accordion-customs mx-1">
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>{props.t("comment")}...</Accordion.Header>
              <Accordion.Body>{element.comment}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <ul className="list-group" data-name={element.id}>
          {child}
        </ul>
      </li>
    );
  }

  function createListElement(element) {
    return (
      <li
        key={uuidv4()}
        className="d-none p-2 border list-group-item"
        id={element.id}
      >
        <div className="row p-1 bd-highlight">
          <div className="col-8">{element.userModel.email}</div>
          <div className="col-2">
            <Button
              name="en"
              variant={
                element.liked == null || !element.liked ? "dark" : "success"
              }
              size="sm"
              className="btn button rounded-3"
              onClick={(e) => {
                likeCommnet(element, e, true);
              }}
            >
              <i class="bi bi-hand-thumbs-up"></i>
            </Button>
          </div>
          <div className="col-2">
            <Button
              name="en"
              variant={
                element.liked == null || element.liked ? "dark" : "danger"
              }
              size="sm"
              className="btn button rounded-3"
              onClick={(e) => {
                likeCommnet(element, e, false);
              }}
            >
              <i class="bi bi-hand-thumbs-down"></i>
            </Button>
          </div>
        </div>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>{props.t("comment")}...</Accordion.Header>
            <Accordion.Body>{element.comment}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </li>
    );
  }

  function createTree(array, renderArray) {
    for (const element of array) {
      let children = [];

      if (element["children"].length != 0) {
        children.push(<hr key={uuidv4()} className="d-none "></hr>);
        for (const child of element["children"]) {
          children.push(createListElement(child));
        }
      }

      renderArray.push(listParent(element, children));
    }
  }

  return (
    <div>
      <ul className="list-group">{renderTree()}</ul>
    </div>
  );
}
