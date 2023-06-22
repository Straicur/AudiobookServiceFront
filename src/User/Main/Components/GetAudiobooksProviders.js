import React, { useEffect } from "react";
import { AudiobookUserDataProvider } from "../../../Components/Providers/AudiobookProviders/AudiobookUserDataProvider";
import { AudiobookUserProposedProvider } from "../../../Components/Providers/AudiobookProviders/AudiobookUserProposedProvider";
import GetAllAudiobooks from "./GetAllAudiobooks";

export default function GetAudiobooksProviders(props) {
  useEffect(() => {
    if (props.audiobooksState.error != null) {
      throw props.audiobooksState.error;
    }
  }, [props.audiobooksState.error]);

  return (
    <AudiobookUserProposedProvider
      state={props.audiobooksState}
      setState={props.setAudiobooksState}
      token={props.token}
      i18n={props.i18n}
    >
      <AudiobookUserDataProvider
        state={props.audiobooksState}
        setState={props.setAudiobooksState}
        token={props.token}
        page={props.audiobooksState.page}
        limit={props.audiobooksState.limit}
        i18n={props.i18n}
      >
        <GetAllAudiobooks
          state={props.audiobooksState}
          setState={props.setAudiobooksState}
          token={props.token}
          t={props.t}
          i18n={props.i18n}
        />
      </AudiobookUserDataProvider>
    </AudiobookUserProposedProvider>
  );
}
