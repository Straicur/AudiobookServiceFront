import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import { HandleFetch } from "../../../../Components/HandleFetch";

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
        props.setRefetchState(true);
      })
      .catch((e) => {
        props.setState({
          ...props.state,
          error: e,
        });
      });
  }

  const createTree = () => {
    let renderArray = [];
    let kids = [];

    if (props.comments != null) {
      recursiveTree(props.comments.comments, renderArray, kids, null);
    }

    if(props.comments != null && props.comments.comments.length == 0){
      renderArray.push(
        <div key={uuidv4()} className="row text-center text-light">
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
    let children = element.currentTarget.children;

    element.currentTarget.attributes["data-clicable"].value = "false";

    for (const element of children) {
      if (element.nodeName == "UL") {
        for (const el of element.children) {
          el.classList.remove("d-none");
        }
      }
      if (element.nodeName == "DIV") {
        for (const el of element.children) {
          if (el.nodeName == "I") {
            el.classList.remove("bi-arrow-right-square");
            el.classList.add("bi-arrow-down-square");
          }
        }
      }
    }
  }

  function closeParentList(element) {
    let children = element.currentTarget.children;

    element.currentTarget.attributes["data-clicable"].value = "true";

    for (const element of children) {
      if (element.nodeName == "UL") {
        for (const el of element.children) {
          el.classList.add("d-none");
        }
      }
      if (element.nodeName == "DIV") {
        for (const el of element.children) {
          if (el.nodeName == "I") {
            el.classList.remove("bi-arrow-down-square");
            el.classList.add("bi-arrow-right-square");
          }
        }
      }
    }
  }

  function listParent(element, child, parent) {
    return (
      <li
        key={uuidv4()}
        className={
          parent == null
            ? "visible border border-4 border-secondary list-group-item"
            : "d-none border list-group-item"
        }
        onClick={child.length > 0 ? oparateParentList : undefined}
        data-clicable={true}
      >
        <div className="row p-1 bd-highlight">
          <div className="col-1">
            {child.length > 0 ? (
              <i className="p-2 bi bi-arrow-right-square "></i>
            ) : (
              <div className="p-2 bd-highlight"></div>
            )}
          </div>
          <div className="col-1">{props.t("comment")}:</div>
          <div className="col-4">{element.comment}</div>
          <div className="col-1">{props.t("owner")}:</div>
          <div className="col-3">{element.userModel.email}</div>
          <div className="col-1">
          {element.deleted ? (
                 <i className="bi bi-bookmark-dash"></i>
         
            ) : (
              <i className="bi bi-bookmark-check-fill"></i>
            )}
          </div>
          <div className="col-1">
            <Button
              name="en"
              variant="dark"
              size="sm"
              className="btn button"
              onClick={()=>{deleteCommnet(element)}}
            >
              {props.t("delete")}
            </Button>
          </div>
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
          <div className="col-1">{props.t("comment")}:</div>
          <div className="col-5">{element.comment}</div>
          <div className="col-1">{props.t("owner")}:</div>
          <div className="col-3">{element.userModel.email}</div>
          <div className="col-1">
          {element.deleted ? (
                 <i className="bi bi-bookmark-dash"></i>
         
            ) : (
              <i className="bi bi-bookmark-check-fill"></i>
            )}
          </div>
          <div className="col-1">
            <Button
              name="en"
              variant="dark"
              size="sm"
              className="btn button"
              onClick={()=>{deleteCommnet(element)}}
            >
              {props.t("delete")}
            </Button>
          </div>
        </div>
      </li>
    );
  }

  function recursiveTree(array, renderArray, kids, parent = null) {
    let returnArray = [];

    for (const element of array) {
      let elementArray = [];
      let children = [];

      elementArray.push = element;

      if (element["children"].length != 0) {
        let returnedChildren = recursiveTree(
          element["children"],
          renderArray,
          kids,
          element
        );

        for (const value of returnedChildren) {
          let childElement = [createListElement(value.push)];

          if (kids[element.id] != undefined) {
            let ul = kids[element.id].filter((x) => x.type == "li");

            if (
              !ul.some((cat) =>
                cat.props.children[1] != undefined
                  ? cat.props.children[1].props["data-name"] == value.push.id
                  : false
              )
            ) {
              kids[element.id] = kids[element.id].concat(childElement);
            }
          } else {
            kids[element.id] = childElement;
          }

          elementArray["child"] = value;
        }

        if (Object.keys(kids).some((key) => key == element.id)) {
          for (const iterator of kids[element.id]) {
            children.push(iterator);
          }
        }

        if (element.parentCategoryKey == null) {
          renderArray.push(listParent(element, children, parent));
        } else {
          let parentElement = [listParent(element, children, parent)];

          if (kids[parent.id] != undefined) {
            kids[parent.id] = kids[parent.id].concat(parentElement);
          } else {
            kids[parent.id] = parentElement;
          }
        }
      } else {
        if (element.parentCategoryKey == null) {
          renderArray.push(listParent(element, children, parent));
        }
      }
      returnArray.push(elementArray);
    }
    return returnArray;
  }

  return (
    <div>
      <ul className="list-group">{createTree()}</ul>
    </div>
  );
}
