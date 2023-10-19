import React, { useState, useEffect, useRef } from "react";
import { useAudiobookMy } from "../../../Components/Providers/AudiobookProviders/AudiobookMyListProvider";
import RenderMyList from "./RenderMyList";
import { HandleFetch } from "../../../Components/HandleFetch";

const ChildMemo = React.memo(RenderMyList);

export default function GetCovers(props) {
  const [audiobooks, loading, setAudiobooks, setRefetchState] =
    useAudiobookMy();

  const [coversState, setCoversState] = useState([]);

  const [loadstate, setLoadState] = useState(true);

  const getAudiobooksImages = () => {
    if (audiobooks != null) {
      setCoversState([]);

      let audiobooksIds = [];
      let copy = audiobooks;

      if (copy != undefined) {
        copy.map((audiobook) => {
          audiobooksIds.push(audiobook.id);
        });

        HandleFetch(
          "/audiobook/covers",
          "POST",
          {
            audiobooks: audiobooksIds,
          },
          props.token,
          props.i18n.language
        )
          .then((data) => {
            if (data.audiobookCoversModels != undefined) {
              setCoversState(data.audiobookCoversModels);
            }
            else{
              setLoadState(false);
            }
          })
          .catch((e) => {
            props.setState({
              ...props.state,
              error: e,
            });
          });
      }
    }
  };

  useEffect(() => {
    if (coversState.length != 0) {
      setLoadState(false);
    }
  }, [coversState]);

  useEffect(() => {
    if (audiobooks != null) {
      getAudiobooksImages();
    }
  }, [audiobooks]);

  return (
    <div>
      {
        loadstate ? (
          <div className="text-center">
            <div
              className="spinner-border text-info spinner my-5"
              role="status"
            ></div>
          </div>
        ) : 
        <ChildMemo
          state={props.state}
          setState={props.setState}
          token={props.token}
          t={props.t}
          coversState={coversState}
          loading={loading}
          audiobooks={audiobooks}
        />
      }
    </div>
  );
}
