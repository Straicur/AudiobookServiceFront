import React, { useState, useEffect, useMemo } from "react";
import RenderAudiobooksList from "./RenderAudiobooksList";
import { useAudiobookUserData } from "../../../Components/Providers/AudiobookProviders/AudiobookUserDataProvider";
import { HandleFetch } from "../../../Components/HandleFetch";

const ChildMemo = React.memo(RenderAudiobooksList);

export default function GetAllAudiobooks(props) {
  const [audiobooks, setAudiobooks, setRefetchState] = useAudiobookUserData();

  const [coversState, setCoversState] = useState([]);

  const getAudiobooksImages = () => {
    let covers = [];

    if (audiobooks != null) {
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
              if (!covers.some((el) => el.audiobook == audiobook.id)) {
                covers.push({
                  audiobook: audiobook.id,
                  url:
                    data != null
                      ? window.URL.createObjectURL(new Blob([data]))
                      : null,
                });
                console.log(covers)
                setCoversState(covers);
              }
            })
            .catch((e) => {
              covers.push({
                audiobook: audiobook.id,
                url: null,
              });
            });
        });
      });
    }

   
  };

  //   const value = useMemo(() => getAudiobooksImages(), [audiobooks]);

  useEffect(() => {
    if (audiobooks != null) {
      getAudiobooksImages();
    }
  }, [audiobooks]);

  return (
    <RenderAudiobooksList
      props={props}
      coversState={coversState}
      audiobooks={audiobooks}
    />
  );
}
