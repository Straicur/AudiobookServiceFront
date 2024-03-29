import React, { useState, useEffect, useRef } from "react";
import RenderAudiobooksList from "./RenderAudiobooksList";
import { useAudiobookUserData } from "../../../Components/Providers/AudiobookProviders/AudiobookUserDataProvider";
import { HandleFetch } from "../../../Components/HandleFetch";
import RenderProposedList from "./RenderProposedList";
import { useCoverListStore } from "../../../store";

const ChildFirstMemo = React.memo(RenderAudiobooksList);
const ChildSecondMemo = React.memo(RenderProposedList);

export default function GetAllAudiobooks(props) {
  const [audiobooks, loading, hasMore, setAudiobooks, setRefetchState] =
    useAudiobookUserData();

  const [loadstate, setLoadState] = useState(true);

  const coversStore = useCoverListStore();

  const covers = useCoverListStore((state) => state.covers);
  const dateUpdate = useCoverListStore((state) => state.dateUpdate);

  const getAudiobooksImages = () => {
    if (audiobooks != null) {
      let audiobooksIds = [];
      let copy = audiobooks;

      copy.categories.forEach((category) => {
        if (category.audiobooks != undefined) {
          category.audiobooks.map((audiobook) => {
            audiobooksIds.push(audiobook.id);
          });
        }
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
            let updatedCovers = covers;

            data.audiobookCoversModels.forEach((cover) => {
              if (!covers.some((x) => x.id == cover.id)) {
                updatedCovers.push(cover);
              } else {
                if (dateUpdate < Date.now() && dateUpdate != 0) {
                  coversStore.updateCover(cover.id, cover.url);
                }
              }
            });

            coversStore.addCovers(updatedCovers);
          }
        })
        .catch((e) => {
          props.setState({
            ...props.state,
            error: e,
          });
        });
    }
  };

  useEffect(() => {
    if (covers.length != 0) {
      setLoadState(false);
    }
  }, [covers]);

  useEffect(() => {
    if (audiobooks != null) {
      getAudiobooksImages();
    }
  }, [audiobooks]);

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
        <div>
          <ChildSecondMemo
            state={props.state}
            setState={props.setState}
            token={props.token}
            t={props.t}
            coversState={covers}
            loading={loading}
            hasMore={hasMore}
          />
          <ChildFirstMemo
            state={props.state}
            setState={props.setState}
            token={props.token}
            t={props.t}
            coversState={covers}
            audiobooks={audiobooks}
            loading={loading}
            hasMore={hasMore}
          />
        </div>
      )}
    </div>
  );
}
