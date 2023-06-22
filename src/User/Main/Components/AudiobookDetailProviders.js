import React, { useState, useEffect } from "react";
import { HandleFetch } from "../../../Components/HandleFetch";
import { AudiobookUserDetailProvider } from "../../../Components/Providers/AudiobookProviders/AudiobookUserDetailProvider";
import { AudiobookPartProvider } from "../../../Components/Providers/AudiobookProviders/AudiobookPartProvider";
import { AudiobookRatingProvider } from "../../../Components/Providers/AudiobookProviders/AudiobookRatingProvider";
import { AudiobookUserCommentsProvider } from "../../../Components/Providers/AudiobookProviders/AudiobookUserCommentsProvider";
import DataNotFoundError from "../../../Errors/Errors/DataNotFoundError";

import AudiobookDetailModal from "./AudiobookDetailModal";

export default function AudiobookDetailProviders(props) {
  const [audiobookState, setAudiobookState] = useState({
    part: 0,
    detailWatchingDate: null,
    datailEndedTime: null,
    info: false,
  });

  const fetchData = () => {
    HandleFetch(
      "http://127.0.0.1:8000/api/user/audiobook/info",
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
