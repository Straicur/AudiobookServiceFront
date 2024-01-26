import React, { useState, useEffect } from "react";
import { HandleFetch } from "../../../Util/HandleFetch";
import { AudiobookUserDetailProvider } from "../../../Providers/AudiobookUserDetailProvider";
import { AudiobookPartProvider } from "../../../Providers/AudiobookPartProvider";
import { AudiobookRatingProvider } from "../../../Providers/AudiobookRatingProvider";
import { AudiobookUserCommentsProvider } from "../../../Providers/AudiobookUserCommentsProvider";
import DataNotFoundError from "../../../Errors/Errors/DataNotFoundError";

import AudiobookDetailModal from "./AudiobookDetailModal";

export default function AudiobookDetailProviders(props) {
  const [audiobookState, setAudiobookState] = useState({
    part: 0,
    detailWatchingDate: null,
    datailEndedTime: null,
    renderAudiobookPlayer: false,
    newPart: false,
    info: false,
  });

  const fetchData = () => {
    HandleFetch(
      "/user/audiobook/info",
      "POST",
      {
        audiobookId: props.state.detailModalAudiobook.id,
        categoryKey: props.state.detailModalCategory.categoryKey,
      },
      props.token,
      props.i18n.language
    )
      .then((data) => {
        setAudiobookState({
          ...audiobookState,
          info: true,
          part: data.part,
          detailWatchingDate: data.watchingDate,
          datailEndedTime: data.endedTime,
        });
      })
      .catch((e) => {
        if (e instanceof DataNotFoundError) {
          setAudiobookState({
            ...audiobookState,
            info: true,
          });
        } else {
          props.setState({
            ...props.state,
            error: e,
          });
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (props.state.error != null) {
      throw props.state.error;
    }
  }, [props.state.error]);

  return (
    <div>
      {audiobookState.info ? (
        <AudiobookUserDetailProvider
          state={props.state}
          setState={props.setState}
          token={props.token}
          audiobookId={props.state.detailModalAudiobook.id}
          categoryKey={props.state.detailModalCategory.categoryKey}
          i18n={props.i18n}
        >
          <AudiobookPartProvider
            state={props.state}
            setState={props.setState}
            token={props.token}
            audiobookId={props.state.detailModalAudiobook.id}
            audiobookState={audiobookState}
            setAudiobookState={setAudiobookState}
            part={audiobookState.part}
            i18n={props.i18n}
          >
            <AudiobookRatingProvider
              state={props.state}
              setState={props.setState}
              token={props.token}
              audiobookId={props.state.detailModalAudiobook.id}
              categoryKey={props.state.detailModalCategory.categoryKey}
              i18n={props.i18n}
            >
              <AudiobookUserCommentsProvider
                state={props.state}
                setState={props.setState}
                token={props.token}
                audiobookId={props.state.detailModalAudiobook.id}
                categoryKey={props.state.detailModalCategory.categoryKey}
                i18n={props.i18n}
              >
                <AudiobookDetailModal
                  state={props.state}
                  setState={props.setState}
                  audiobookState={audiobookState}
                  setAudiobookState={setAudiobookState}
                  t={props.t}
                  token={props.token}
                  i18n={props.i18n}
                />
              </AudiobookUserCommentsProvider>
            </AudiobookRatingProvider>
          </AudiobookPartProvider>
        </AudiobookUserDetailProvider>
      ) : null}
    </div>
  );
}
