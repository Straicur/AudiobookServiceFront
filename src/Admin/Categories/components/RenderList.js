import React, { useEffect } from "react";

export default function RenderList(props) {
  // https://codesandbox.io/s/13mxj2w2j7?file=/src/js/Account/TreeView.js
  const createTableTitles= () =>{
    let renderArray = [];
    let cos = recursiveTree(props.categories,renderArray);
    return renderArray;
  }
  
  function listParent(parent,child){
    return(
      <ul>
        {parent.name}
        {child}
      </ul>
    )
  }

  function createListElement(element){
    return(
      <li>
        {element.push.name}
      </li>
    )
  }

  function recursiveTree(array, renderArray) {
    let ar = [];
    for(const element of array) {
        let child = [];
        let children = [];
        
        child.push = element;
        console.log(element)
        //todo tu zostaje mi do rozkminy jak to ifami zrobić 
        // Po tym jak będzie dobrze się renderować muszę ogarnąć reRender 
        // I na koniec zostaje mi zrobienie krawdziwego drzewa z rozwijaniem tych okienek
        if(element["children"].length != 0){
            renderArray.push(listParent(element,children))
            let cos = recursiveTree(element["children"],renderArray)
            for(const [index, value] of cos.entries()){
                children.push(createListElement(value))
                child["child"] = value;
            }
        }
        else{
          // if(){

          // }
          // renderArray.push(listParent(element,children))
        }
        ar.push(child)
        
    };
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
    
  <div><ul>{createTableTitles()}</ul>cos</div>
  );
}
