import React, { useEffect } from 'react';
import { AudiobookUserDataProvider } from 'Providers/AudiobookUserDataProvider';
import { AudiobookUserProposedProvider } from 'Providers/AudiobookUserProposedProvider';
import UserMainGetAllAudiobooks from './UserMainGetAllAudiobooks';

export default function UserMainGetAudiobooksProviders(props) {
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
        <UserMainGetAllAudiobooks
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
