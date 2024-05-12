import React from 'react';
import { UserAudiobooksProvider } from 'Providers/User/UserAudiobooksProvider';
import { UserAudiobookProposedProvider } from 'Providers/User/UserAudiobookProposedProvider';
import UserMainGetAllAudiobooks from './UserMainGetAllAudiobooks';

export default function UserMainGetAudiobooksProviders(props) {
  return (
    <UserAudiobookProposedProvider
      state={props.audiobooksState}
      token={props.token}
      i18n={props.i18n}
    >
      <UserAudiobooksProvider
        state={props.audiobooksState}
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
