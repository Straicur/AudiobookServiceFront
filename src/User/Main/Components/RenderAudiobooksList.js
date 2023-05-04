import React, { useState } from "react";
import { useAudiobookUserData } from "../../../Components/Providers/AudiobookProviders/AudiobookUserDataProvider";
import RenderCarousel from "./RenderCarousel";
import RenderAudiobookColumn from "./RenderAudiobookColumn";
import { v4 as uuidv4 } from "uuid";
// import { useAudiobookUserData } from "../../../Components/Providers/AudiobookProviders/AudiobookUserDataProvider";

export default function RenderAudiobooksList() {
  const [audiobooks, setAudiobooks, setRefetchState] = useAudiobookUserData();

//   console.log(audiobooks);

  const renderColumns = () => {
    let renderCategories = [];
    if(audiobooks != null){

        audiobooks.categories.forEach(category => {
            let renderAudiobooks=[];
            if(category.audiobooks.length > 0 && category.audiobooks.length < 4){
                renderAudiobooks.push(RenderAudiobookColumn( category.audiobooks))
            }
            else if(category.audiobooks.length > 4){
                renderAudiobooks.push(RenderCarousel( category.audiobooks))
            }
            renderCategories.push(<div  key={uuidv4()} className="text-light">{category.name}{renderAudiobooks}</div>);
        });

    }
    return renderCategories;
  };

  return renderColumns();
}
