import React, { useState, useEffect, useRef, useCallback } from "react";

import RenderCarousel from "./RenderCarousel";
import RenderAudiobookColumn from "./RenderAudiobookColumn";
import { v4 as uuidv4 } from "uuid";

export default function RenderAudiobooksList(props) {
  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (props.loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && props.hasMore) {
          observer.height = entries[0].target.offsetTop;

          props.setState({
            ...props.state,
            page: props.state.page + 1,
          });

          // if(observer.height != undefined){
          //   window.scroll({
          //     top: observer.height,
          //     left: 100,
          //     behavior: "smooth",
          //   });
          // }
       

        }
      });
      if (node) observer.current.observe(node);
    },
    [props.loading, props.hasMore]
  );

  const renderColumns = () => {
    let renderCategories = [];

    if (props.audiobooks != null && props.coversState.length > 0) {
      props.audiobooks.categories.forEach((category, index) => {
        let renderAudiobooks = [];

        if (category.audiobooks.length > 0 && category.audiobooks.length <= 4) {
          renderAudiobooks.push(
            RenderAudiobookColumn(
              props,
              category.audiobooks,
              lastBookElementRef
            )
          );
        } else if (category.audiobooks.length > 4) {
          renderAudiobooks.push(
            RenderCarousel(props, category.audiobooks, lastBookElementRef)
          );
        }

        if (props.audiobooks.categories.length == index + 1) {
          renderCategories.push(
            <div key={uuidv4()} className="text-light">
              <div className="fw-bold fs-1 ms-2 mb-1">{category.name}</div>
              {renderAudiobooks}
              <hr></hr>
              <div className="text-light"  ref={lastBookElementRef}></div>
            </div>
          );
        } else {
          renderCategories.push(
            <div key={uuidv4()} className="text-light">
              <div className="fw-bold fs-1 ms-2 mb-1">{category.name}</div>
              {renderAudiobooks}
              <hr></hr>

            </div>
          );
        }
      });
    }
    return renderCategories;
  };

  return renderColumns();
}
