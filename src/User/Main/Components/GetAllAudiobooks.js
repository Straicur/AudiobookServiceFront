import React, { useState, useEffect, useRef } from "react";
import RenderAudiobooksList from "./RenderAudiobooksList";
import { useAudiobookUserData } from "../../../Components/Providers/AudiobookProviders/AudiobookUserDataProvider";
import { HandleFetch } from "../../../Components/HandleFetch";
import RenderProposedList from "./RenderProposedList";

const ChildFirstMemo = React.memo(RenderAudiobooksList);
const ChildSecondMemo = React.memo(RenderProposedList);

export default function GetAllAudiobooks(props) {
  const [audiobooks, loading, hasMore, setAudiobooks, setRefetchState] =
    useAudiobookUserData();

  const [coversState, setCoversState] = useState([]);

  const covers = useRef([]);

  const getAudiobooksImages = () => {
    if (audiobooks != null) {
      setCoversState([]);

      let copy = audiobooks;

      copy.categories.forEach((category) => {
        if (category.audiobooks != undefined) {
          category.audiobooks.map((audiobook) => {
            if (!covers.current.some((el) => el == audiobook.id)) {
              covers.current.push(audiobook.id);

              HandleFetch(
                "http://127.0.0.1:8000/api/audiobook/cover/" + audiobook.id,
                "GET",
                null,
                props.token
              )
                .then((data) => {
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
            }
          });
        }
      });
    }
  };

  useEffect(() => {
    if (audiobooks != null) {
      covers.current = [];
      getAudiobooksImages();
    }
  }, [audiobooks]);

  return (
    <div>
      <ChildSecondMemo
        state={props.state}
        setState={props.setState}
        token={props.token}
        t={props.t}
        coversState={coversState}
        loading={loading}
        hasMore={hasMore}
      />
      <ChildFirstMemo
        state={props.state}
        setState={props.setState}
        token={props.token}
        t={props.t}
        coversState={coversState}
        audiobooks={audiobooks}
        loading={loading}
        hasMore={hasMore}
      />
    </div>
  );
}
