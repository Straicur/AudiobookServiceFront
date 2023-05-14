import React, { useState, useEffect } from "react";
import { HandleFetch } from "../../../Components/HandleFetch";
import { AudiobookUserDetailProvider } from "../../../Components/Providers/AudiobookProviders/AudiobookUserDetailProvider";
import { AudiobookPartProvider } from "../../../Components/Providers/AudiobookProviders/AudiobookPartProvider";
import { AudiobookRatingProvider } from "../../../Components/Providers/AudiobookProviders/AudiobookRatingProvider";
import DataNotFoundError from "../../../Errors/Errors/DataNotFoundError";

import AudiobookDetailModal from "./AudiobookDetailModal";

export default function AudiobookDetailProviders(props) {
  const [audiobookState, setAudiobookState] = useState({
    part: 0,
    detailWatvhingDate: null,
    datailEndedTime: null,
    info: false,
  });

  const fetchData = () => {
    HandleFetch(
      "http://127.0.0.1:8000/api/user/audiobook/info",
      "POST",
      {
        audiobookId: props.audiobooksState.detailModalAudiobook.id,
        categoryKey: props.audiobooksState.detailModalCategory.categoryKey,
      },
      props.token
    )
      .then((data) => {
        setAudiobookState({
          ...audiobookState,
          info: true,
          part: data.part,
          detailWatvhingDate: data.watchingDate,
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
          props.setAudiobooksState({
            ...props.audiobooksState,
            error: e,
          });
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {audiobookState.info ? (
        <AudiobookUserDetailProvider
          state={props.audiobooksState}
          setState={props.setAudiobooksState}
          token={props.token}
          audiobookId={props.audiobooksState.detailModalAudiobook.id}
          categoryKey={props.audiobooksState.detailModalCategory.categoryKey}
        >
          <AudiobookPartProvider
            state={props.audiobooksState}
            setState={props.setAudiobooksState}
            token={props.token}
            audiobookId={props.audiobooksState.detailModalAudiobook.id}
            part={audiobookState.part}
          >
            <AudiobookRatingProvider
              state={props.audiobooksState}
              setState={props.setAudiobooksState}
              token={props.token}
              audiobookId={props.audiobooksState.detailModalAudiobook.id}
              categoryKey={
                props.audiobooksState.detailModalCategory.categoryKey
              }
            >
              <AudiobookDetailModal
                audiobooksState={props.audiobooksState}
                setAudiobooksState={props.setAudiobooksState}
                audiobookState={props.audiobookState}
                setAudiobookState={props.setAudiobookState}
                t={props.t}
                token={props.token}
              />
            </AudiobookRatingProvider>
          </AudiobookPartProvider>
        </AudiobookUserDetailProvider>
      ) : null}
    </div>
  );
}
