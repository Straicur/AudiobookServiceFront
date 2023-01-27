import React, { useEffect } from "react";

export default function RenderList(props) {
  // https://codesandbox.io/s/13mxj2w2j7?file=/src/js/Account/TreeView.js
    function recursiveTree(array) {
      let elArray= [];
      for(const [index, element] of array.entries()) {

          let elementList = [];
          if(element["children"].length != 0){
            console.log("cs")
              let cos = recursiveTree(element["children"])
              for(const [index, value] of cos.entries()){
                elementList[index] = React.createElement("li",{},elementList)
                let childList = <ul></ul>
                console.log(value)
                // element.appendChild()child["parent"]["child"] = value;
              }
          }
   
        // let el = React.createElement("li",{},elementList);
        // elArray[index] = el;
      };
      return elArray;
    }


  return (
    
  <div><ul>{recursiveTree(props.categories)}</ul>cos</div>
  );
}
