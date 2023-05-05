import React, { useState, useEffect } from "react";
import { useAudiobookUserData } from "../../../Components/Providers/AudiobookProviders/AudiobookUserDataProvider";
import RenderCarousel from "./RenderCarousel";
import RenderAudiobookColumn from "./RenderAudiobookColumn";
import { v4 as uuidv4 } from "uuid";
// import { useAudiobookUserData } from "../../../Components/Providers/AudiobookProviders/AudiobookUserDataProvider";
import { HandleFetch } from "../../../Components/HandleFetch";
import { useAudiobookCoverListStore } from "../../../store";
export default function RenderAudiobooksList(props) {
  const [audiobooks, setAudiobooks, setRefetchState] = useAudiobookUserData();
  const audiobookCoverListStore = useAudiobookCoverListStore();

  const userAudiobooks = useAudiobookCoverListStore(
    (state) => state.audiobooks
  );
  const dateUpdate = useAudiobookCoverListStore((state) => state.dateUpdate);

  const getAudiobooksImages = () => {
    let copy = audiobooks;

    copy.categories.forEach((category) => {
      category.audiobooks.map((audiobook) => {
        HandleFetch(
          "http://127.0.0.1:8000/api/audiobook/cover/" + audiobook.id,
          "GET",
          null,
          props.token
        )
          .then((data) => {
            console.log(window.URL.createObjectURL(new Blob([data])));
            if (dateUpdate < Date.now()) {
              audiobookCoverListStore.removeCover(audiobook.id);
            }
            audiobookCoverListStore.addCover({
              audiobook: audiobook.id,
              url:
                data != null
                  ? window.URL.createObjectURL(new Blob([data]))
                  : null,
            });
          })
          .catch((e) => {
            props.setState({
              ...props.state,
              error: e,
            });
          });
      });
    });
  };

  useEffect(() => {
    if (audiobooks != null) {
      getAudiobooksImages();
    }
  }, [audiobooks]);

  const renderColumns = () => {
    let renderCategories = [];
    if (audiobooks != null) {
      audiobooks.categories.forEach((category) => {
        let renderAudiobooks = [];
        if (category.audiobooks.length > 0 && category.audiobooks.length < 4) {
          renderAudiobooks.push(RenderAudiobookColumn(category.audiobooks,userAudiobooks));
        } else if (category.audiobooks.length > 4) {
          renderAudiobooks.push(RenderCarousel(category.audiobooks));
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
