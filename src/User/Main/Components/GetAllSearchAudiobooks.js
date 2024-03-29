import React, { useState, useEffect } from "react";
import { useAudiobookSearch } from "../../../Components/Providers/AudiobookProviders/AudiobookSearchProvider";
import RenderSearchAudiobooksList from "./RenderSearchAudiobooksList";
import { HandleFetch } from "../../../Components/HandleFetch";

const ChildMemo = React.memo(RenderSearchAudiobooksList);

export default function GetAllSearchAudiobooks(props) {
  const [audiobooks, loading, setAudiobooks, setRefetchState] =
    useAudiobookSearch();

  const [coversState, setCoversState] = useState([]);

  const [loadstate, setLoadState] = useState(true);

  const getAudiobooksImages = () => {
    if (audiobooks != null) {
      setCoversState([]);

      if (audiobooks != undefined) {
        let audiobooksIds = [];

        audiobooks.map((audiobook) => {
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
            } else {
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

  useEffect(() => {
    if (props.state.search) {
      setRefetchState(true);
    }
  }, [props.state.searching]);

  return (
    <div>
      {loadstate ? (
        <div className="text-center">
          <div
            className="spinner-border text-info spinner my-5"
            role="status"
          ></div>
        </div>
      ) : (
        <ChildMemo
          state={props.state}
          setState={props.setState}
          token={props.token}
          t={props.t}
          coversState={coversState}
          audiobooks={audiobooks}
          loading={loading}
        />
      )}
    </div>
  );
}
