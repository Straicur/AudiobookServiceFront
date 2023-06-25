import React, { useEffect } from "react";
import { AudiobookDataProvider } from "../../../../Components/Providers/AudiobookProviders/AudiobookDataProvider";
import { AdminAudiobookCoverDataProvider } from "../../../../Components/Providers/AudiobookProviders/AdminAudiobookCoverDataProvider";
import { AdminAudiobookPartProvider } from "../../../../Components/Providers/AudiobookProviders/AdminAudiobookPartProvider";
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
      t={props.t}
      i18n={props.i18n}
    >
      <AdminAudiobookCoverDataProvider
        state={props.audiobookState}
        setState={props.setAudiobookState}
        token={props.token}
        audiobookId={props.audiobookId}
        t={props.t}
        i18n={props.i18n}
      >
        <AdminAudiobookPartProvider
          state={props.audiobookState}
          setState={props.setAudiobookState}
          token={props.token}
          audiobookId={props.audiobookId}
          part={props.audiobookState.part}
          t={props.t}
          i18n={props.i18n}
        >
          <AudiobookCommentsProvider
            state={props.audiobookState}
            setState={props.setAudiobookState}
            token={props.token}
            audiobookId={props.audiobookId}
            t={props.t}
            i18n={props.i18n}
          >
            <AudiobookDetail
              audiobookState={props.audiobookState}
              setAudiobookState={props.setAudiobookState}
              t={props.t}
              token={props.token}
              i18n={props.i18n}
            />
          </AudiobookCommentsProvider>
        </AdminAudiobookPartProvider>
      </AdminAudiobookCoverDataProvider>
    </AudiobookDataProvider>
  );
}
