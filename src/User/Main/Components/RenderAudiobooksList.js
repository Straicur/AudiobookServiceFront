import React, { useState, useEffect } from "react";

import RenderCarousel from "./RenderCarousel";
import RenderAudiobookColumn from "./RenderAudiobookColumn";
import { v4 as uuidv4 } from "uuid";

export default function RenderAudiobooksList(props) {
  const renderColumns = () => {
    let renderCategories = [];

    if (props.audiobooks != null && props.coversState.length > 0) {
      props.audiobooks.categories.forEach((category) => {
        let renderAudiobooks = [];
        
        if (category.audiobooks.length > 0 && category.audiobooks.length <= 4) {
          renderAudiobooks.push(
            RenderAudiobookColumn(props, category.audiobooks)
          );
        } else if (category.audiobooks.length > 4) {
          renderAudiobooks.push(RenderCarousel(props, category.audiobooks));
        }

        renderCategories.push(
          <div key={uuidv4()} className="text-light">
            <div className="fw-bold fs-1 ms-2 mb-1">{category.name}</div>
            {renderAudiobooks}
            <hr></hr>
          </div>
        );
      });
    }
    return renderCategories;
  };

  return renderColumns();
}
