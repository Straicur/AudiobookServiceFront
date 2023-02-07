import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function RenderList(props) {
  // https://codesandbox.io/s/13mxj2w2j7?file=/src/js/Account/TreeView.js
  const createTableTitles = () => {
    let renderArray = [];
    let kids = [];

    recursiveTree(props.categories, renderArray, kids, null);

    return renderArray;
  };
  const oparateParentList = (element) => {
    if (element.currentTarget == element.target) {
      if (element.target.attributes["data-clicable"].value == "true") {
        openParentList(element);
      } else {
        closeParentList(element);
      }
    }
  };

  function openParentList(element) {
    let children = element.target.children;

    element.target.attributes["data-clicable"].value = "false";

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
    let children = element.target.children;

    element.target.attributes["data-clicable"].value = "true";

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
        className={parent == null ? "visible border mb-2" : "d-none"}
        onClick={child.length > 0 ? oparateParentList : undefined}
        data-clicable={true}
      >
        <div className="d-flex flex-row bd-highlight mb-2">
          {child.length > 0 ? (
            <i className="bi bi-arrow-right-square"></i>
          ) : (
            <div className="p-2 bd-highlight"></div>
          )}
          <div className="p-2 bd-highlight"> {element.name}</div>
          <div className="p-2 bd-highlight">
            {" "}
            {element.active ? (
              <i className="bi bi-bookmark-check-fill"></i>
            ) : (
              <i className="bi bi-bookmark-dash"></i>
            )}
          </div>
          <div className="p-2 bd-highlight"> {element.categoryKey}</div>
          <div className="p-2 bd-highlight"> {element.children.length}</div>
        </div>
        <ul className="mb-2">{child}</ul>
      </li>
    );
  }
  //todo tłumaczenia dodaj do tych kolumn, buttony odpowiednio i napraw te klikanie bo nie idzie tego używać 
  function createListElement(element) {
    return (
      <li
        key={uuidv4()}
        className="d-none p-2 d-flex  flex-row  bd-highlight border mb-2"
        id={element.id}
      >
        <div className="p-2 bd-highlight"> {element.name}</div>
        <div className="p-2 bd-highlight">
          {" "}
          {element.active ? (
            <i className="bi bi-bookmark-check-fill"></i>
          ) : (
            <i className="bi bi-bookmark-dash"></i>
          )}
        </div>
        <div className="p-2 bd-highlight"> {element.categoryKey}</div>
        <div className="p-2 bd-highlight"> {element.children.length}</div>
      </li>
    );
  }

  function recursiveTree(array, renderArray, kids, parent = null) {
    let returnArray = [];

    for (const element of array) {
      let elementArray = [];
      let children = [];

      elementArray.push = element;

      // Todo  refactor kodu na trochę bardziej poukładany
      // Po tym jak będzie dobrze się renderować muszę ogarnąć reRender (za dużo razy się odświerza)
      // I na koniec zostaje mi zrobienie prawdziwego drzewa z rozwijaniem tych okienek

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
            let ul = kids[element.id].filter((x) => x.type == "ul");

            if (!ul.some((cat) => cat.props.children[0] == value.push.name)) {
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
      <ul>{createTableTitles()}</ul>
    </div>
  );
}
