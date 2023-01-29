import React, { useEffect } from "react";

export default function RenderList(props) {
  // https://codesandbox.io/s/13mxj2w2j7?file=/src/js/Account/TreeView.js
  const createTableTitles = () => {
    let renderArray = [];
    let kids = [];

    recursiveTree(props.categories, renderArray, kids, null);
    // console.log(kids);
    return renderArray;
  };

  function listParent(parent, child) {
    return (
      <ul>
        {parent.name}
        {child}
      </ul>
    );
  }

  function createListElement(element) {
    return <li id={element.id}>{element.name}</li>;
  }

  function recursiveTree(array, renderArray, kids, parent = null) {
    let ar = [];

    for (const element of array) {
      let child = [];
      let children = [];

      child.push = element;
      // console.log(element);
      //todo tu zostaje mi do rozkminy jak to ifami zrobić
      // Po tym jak będzie dobrze się renderować muszę ogarnąć reRender
      // I na koniec zostaje mi zrobienie krawdziwego drzewa z rozwijaniem tych okienek
      if (element["children"].length != 0) {
        let cos = recursiveTree(
          element["children"],
          renderArray,
          kids,
          element
        );
        for (const [index, value] of cos.entries()) {
          let val = [createListElement(value.push)];
          if (kids[element.id] != undefined) {
            let ul = kids[element.id].filter((x) => x.type == "ul");

            if (!ul.some((cat) => cat.props.children[0] == value.push.name)) {
              kids[element.id] = kids[element.id].concat(val);
            }
          } else {
            kids[element.id] = val;
          }

          child["child"] = value;
        }

        if (Object.keys(kids).some((key) => key == element.id)) {
          for (const iterator of kids[element.id]) {
            children.push(iterator);
          }
        }
        
        if (
          element.parentCategoryKey == null
        ) {
          renderArray.push(listParent(element, children));
        } else {
          let val = [listParent(element, children)];
          if (kids[parent.id] != undefined) {
            kids[parent.id] = kids[parent.id].concat(val);
          } else {
            kids[parent.id] = val;
          }
        }
      }
      else{
        if (
          element.parentCategoryKey == null
        ) {
          renderArray.push(listParent(element, children));
        }
      }
      console.log(element)
      ar.push(child);
    }
    return ar;

    // let elArray= [];
    // for(const [index, element] of array.entries()) {

    //     let elementList = [];
    //     if(element["children"].length != 0){
    //       console.log("cs")
    //         let cos = recursiveTree(element["children"])
    //         for(const [index, value] of cos.entries()){
    //           // elementList[index] = React.createElement("li",{},elementList)
    //           let childList = <ul></ul>
    //           console.log(value)
    //           // element.appendChild()child["parent"]["child"] = value;
    //         }
    //     }

    //   // let el = React.createElement("li",{},elementList);
    //   // elArray[index] = el;
    // };
    // return elArray;
  }

  return (
    <div>
      <ul>{createTableTitles()}</ul>
    </div>
  );
}
