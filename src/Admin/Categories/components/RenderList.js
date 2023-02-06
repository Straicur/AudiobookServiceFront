import React, { useEffect } from "react";

export default function RenderList(props) {
  // https://codesandbox.io/s/13mxj2w2j7?file=/src/js/Account/TreeView.js
  const createTableTitles = () => {
    let renderArray = [];
    let kids = [];

    recursiveTree(props.categories, renderArray, kids, null);

    return renderArray;
  };
  const oparateParentList=element=>{
    element.stopPropagation();
    if(element.target.attributes['data-clicable'].value == "true"){
      openParentList(element)
    }
    else{
      closeParentList(element)
    }
  }

  function openParentList(element){
    let children = element.target.children;

    element.target.attributes['data-clicable'].value = "false";

    for (const element of children) {

      if(element.nodeName == "UL")
      {
        for (const el of element.children) {
          el.classList.remove("d-none");
        }
      }
    }
  }

  function closeParentList(element){
    let children = element.target.children;

    element.target.attributes['data-clicable'].value = "true";

    for (const element of children) {

      if(element.nodeName == "UL")
      {
        for (const el of element.children) {
          el.classList.add("d-none");
        }
      }
    }
  }

  function listParent(element, child, parent) {
    return (
      <li className={parent == null? "visible" : "d-none"} onClick={child.length > 0 ? oparateParentList : undefined} data-clicable = {true}>
        {child.length > 0 ? <i className="bi bi-arrow-down-square" >{element.name}</i>:element.name}
        <ul>{child}</ul>
      </li>
    );
  }

  function createListElement(element) {
    return <li className="d-none" id={element.id}>{element.name}</li>;
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
