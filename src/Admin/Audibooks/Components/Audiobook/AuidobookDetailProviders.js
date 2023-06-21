import React, { useEffect } from "react";
import { AudiobookDataProvider } from "../../../../Components/Providers/AudiobookProviders/AudiobookDataProvider";
import { AudiobookCoverDataProvider } from "../../../../Components/Providers/AudiobookProviders/AudiobookCoverDataProvider";
import { AudiobookPartProvider } from "../../../../Components/Providers/AudiobookProviders/AudiobookPartProvider";
import { AudiobookCommentsProvider } from "../../../../Components/Providers/AudiobookProviders/AudiobookCommentsProvider";

import AudiobookDetail from "./AudiobookDetail";

export default function AuidobookDetailProviders(props) {
  useEffect(() => {
    if (props.audiobookState.error != null) {
      throw props.audiobookState.error;
    }
  }, [props.audiobookState.error]);

  return (
    <AudiobookDataProvider
      state={props.audiobookState}
      setState={props.setAudiobookState}
      token={props.token}
      audiobookId={props.audiobookId}
    >
      <AudiobookCoverDataProvider
        state={props.audiobookState}
        setState={props.setAudiobookState}
        token={props.token}
        audiobookId={props.audiobookId}
      >
        <AudiobookPartProvider
          state={props.audiobookState}
          setState={props.setAudiobookState}
          token={props.token}
          audiobookId={props.audiobookId}
          part={props.audiobookState.part}
        >
          <AudiobookCommentsProvider
            state={props.audiobookState}
            setState={props.setAudiobookState}
            token={props.token}
            audiobookId={props.audiobookId}
          >
            <AudiobookDetail
              audiobookState={props.audiobookState}
              setAudiobookState={props.setAudiobookState}
              t={props.t}
              token={props.token}
            />
          </AudiobookCommentsProvider>
        </AudiobookPartProvider>
      </AudiobookCoverDataProvider>
    </AudiobookDataProvider>
  );
}
