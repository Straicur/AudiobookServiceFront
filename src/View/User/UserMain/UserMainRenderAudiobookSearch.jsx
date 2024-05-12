import React from 'react';
import UserMainGetAllSearchAudiobooks from './UserMainGetAllSearchAudiobooks';
import { UserAudiobookSearchProvider } from 'Providers/User/UserAudiobookSearchProvider';

export default function UserMainRenderAudiobookSearch(props) {
  return (
    <UserAudiobookSearchProvider
      state={props.audiobooksState}
      title={props.audiobooksState.searchText}
      token={props.token}
      i18n={props.i18n}
    >
      <UserMainGetAllSearchAudiobooks
        state={props.audiobooksState}
        setState={props.setAudiobooksState}
        token={props.token}
        t={props.t}
        i18n={props.i18n}
      />
    </UserAudiobookSearchProvider>
  );
}
