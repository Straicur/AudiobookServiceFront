import React, { useState, useEffect } from "react";
import RenderAudiobooksList from "./RenderAudiobooksList";
import { useAudiobookUserData } from "../../../Components/Providers/AudiobookProviders/AudiobookUserDataProvider";
import { HandleFetch } from "../../../Components/HandleFetch";

const ChildMemo = React.memo(RenderAudiobooksList);

export default function GetAllAudiobooks(props) {
  const [audiobooks, loading, hasMore, setAudiobooks, setRefetchState] = useAudiobookUserData();

  const [coversState, setCoversState] = useState([]);

  const getAudiobooksImages = () => {
    let covers = [];

    if (audiobooks != null) {
      setCoversState([]);

      let copy = audiobooks;

      copy.categories.forEach((category) => {
        if (category.audiobooks != undefined) {
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
                  setCoversState((coversState) => [
                    ...coversState,
                    {
                      audiobook: audiobook.id,
                      url:
                        data != null
                          ? window.URL.createObjectURL(new Blob([data]))
                          : null,
                    },
                  ]);
                }
              })
              .catch(() => {
                setCoversState((coversState) => [
                  ...coversState,
                  {
                    audiobook: audiobook.id,
                    url: null,
                  },
                ]);
              });
          });
        }
      });
    }
  };

  useEffect(() => {
    if (audiobooks != null) {
      getAudiobooksImages();
    }
  }, [audiobooks]);

  return (
    <ChildMemo
      state={props.state}
      setState={props.setState}
      token={props.token}
      t={props.t}
      coversState={coversState}
      audiobooks={audiobooks}
      loading={loading}
      hasMore={hasMore}
    />
  );
}
