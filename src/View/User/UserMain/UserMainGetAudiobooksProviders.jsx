import React, { useEffect } from 'react';
import { UserAudiobooksProvider } from 'Providers/User/UserAudiobooksProvider';
import { UserAudiobookProposedProvider } from 'Providers/User/UserAudiobookProposedProvider';
import UserMainGetAllAudiobooks from './UserMainGetAllAudiobooks';

export default function UserMainGetAudiobooksProviders(props) {
  useEffect(() => {
    if (props.audiobooksState.error != null) {
      throw props.audiobooksState.error;
    }
  }, [props.audiobooksState.error]);

  return (
    <UserAudiobookProposedProvider
      state={props.audiobooksState}
      setState={props.setAudiobooksState}
      token={props.token}
      i18n={props.i18n}
    >
      <UserAudiobooksProvider
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
      </UserAudiobooksProvider>
    </UserAudiobookProposedProvider>
  );
}
