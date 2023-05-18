import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import { HandleFetch } from "../../../Components/HandleFetch";
import Accordion from "react-bootstrap/Accordion";

export default function RenderCommentsList(props) {

  function deleteCommnet(element) {
    HandleFetch(
      "http://127.0.0.1:8000/api/admin/audiobook/comment/delete",
      "DELETE",
      {
        audiobookCommentId: element.id,
      },
      props.token
    )
      .then(() => {
        props.setAudiobookCommnetsRefetchState(true);
      })
      .catch((e) => {
        props.setAudiobooksState({
          ...props.audiobooksState,
          error: e,
        });
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
    let children = element.currentTarget.parentElement.children;

    element.currentTarget.attributes["data-clicable"].value = "false";

    for (const element of children) {
      if (element.nodeName == "UL") {
        for (const el of element.children) {
          el.classList.remove("d-none");
        }
      }
      if (
        element.nodeName == "DIV" &&
        element.attributes["data-clicable"] != undefined
      ) {
        element.children[0].children[0].classList.remove(
          "bi-arrow-right-square"
        );
        element.children[0].children[0].classList.add("bi-arrow-down-square");
      }
    }
  }

  function closeParentList(element) {
    let children = element.currentTarget.parentElement.children;

    element.currentTarget.attributes["data-clicable"].value = "true";

    for (const element of children) {
      if (element.nodeName == "UL") {
        for (const el of element.children) {
          el.classList.add("d-none");
        }
      }
      if (
        element.nodeName == "DIV" &&
        element.attributes["data-clicable"] != undefined
      ) {
        element.children[0].children[0].classList.remove(
          "bi-arrow-down-square"
        );
        element.children[0].children[0].classList.add("bi-arrow-right-square");
      }
    }
  }

  function listParent(element, child) {
    return (
      <li
        key={uuidv4()}
        className={
          "border border-4 border-secondary list-group-item list-group-item-dark"
        }
      >
        <div
          className="row p-1 bd-highlight"
          onClick={child.length > 0 ? oparateParentList : undefined}
          data-clicable={true}
        >
          <div className="col-1 cs">
            {child.length > 0 ? (
              <i className="p-2 bi bi-arrow-right-square "></i>
            ) : (
              <div className="p-2 bd-highlight"></div>
            )}
          </div>
          <div className="col-1">
            <span className="badge bg-dark rounded-pill">{element.children.length}</span>
          </div>
          <div className="col-8">{element.userModel.email}</div>
          <div className="col-2">
            <Button
              name="en"
              variant="dark"
              size="sm"
              className="btn button rounded-3"
              //   onClick={() => {
              //     deleteCommnet(element);
              //   }}
            >
              {props.t("like")}
            </Button>
          </div>
        </div>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>{props.t("comment")}...</Accordion.Header>
            <Accordion.Body>{element.comment}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
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
              variant="dark"
              size="sm"
              className="btn button rounded-3"
              //   onClick={() => {
              //     deleteCommnet(element);
              //   }}
            >
              {props.t("like")}
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
        children.push(<hr key={uuidv4()} className="d-none "></hr>)
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
