import React, { useState, useEffect } from "react";

import RenderCarousel from "./RenderCarousel";
import RenderAudiobookColumn from "./RenderAudiobookColumn";
import { v4 as uuidv4 } from "uuid";

export default function RenderAudiobooksList(props) {
  const renderColumns = () => {
    let renderCategories = [];

    if (props.audiobooks != null) {  
      props.audiobooks.categories.forEach((category) => {
        let renderAudiobooks = [];
        if (category.audiobooks.length > 0 && category.audiobooks.length < 4) {
          renderAudiobooks.push(RenderAudiobookColumn(category.audiobooks,props.coversState));
        } else if (category.audiobooks.length > 4) {
          // renderAudiobooks.push(RenderCarousel(category.audiobooks));
        }
        renderCategories.push(
          <div key={uuidv4()} className="text-light">
            {category.name}
            {renderAudiobooks}
          </div>
        );
      });
    }
    return renderCategories;
  };

  return renderColumns();
}
