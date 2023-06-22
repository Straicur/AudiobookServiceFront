import React, { useState, useEffect, useRef } from "react";
import { useAudiobookMy } from "../../../Components/Providers/AudiobookProviders/AudiobookMyListProvider";
import RenderMyList from "./RenderMyList";
import { HandleFetch } from "../../../Components/HandleFetch";

const ChildMemo = React.memo(RenderMyList);

export default function GetCovers(props) {
  const [audiobooks, loading, setAudiobooks, setRefetchState] =
    useAudiobookMy();

  const [coversState, setCoversState] = useState([]);

  const covers = useRef([]);

  const getAudiobooksImages = () => {
    if (audiobooks != null) {
      setCoversState([]);

      let copy = audiobooks;
      if (copy != undefined) {
        copy.map((audiobook) => {
          if (!covers.current.some((el) => el == audiobook.id)) {
            covers.current.push(audiobook.id);

            HandleFetch(
              "http://127.0.0.1:8000/api/audiobook/cover/" + audiobook.id,
              "GET",
              null,
              props.token,
              props.i18n.language
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
      <ChildMemo
        state={props.state}
        setState={props.setState}
        token={props.token}
        t={props.t}
        coversState={coversState}
        loading={loading}
        audiobooks={audiobooks}
      />
    </div>
  );
}
