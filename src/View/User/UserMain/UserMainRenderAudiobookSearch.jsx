import React from 'react';
import UserMainGetAllSearchAudiobooks from './UserMainGetAllSearchAudiobooks';
import { AudiobookSearchProvider } from 'Providers/AudiobookSearchProvider';

export default function UserMainRenderAudiobookSearch(props) {
  return (
    <AudiobookSearchProvider
      state={props.audiobooksState}
      setState={props.setAudiobooksState}
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
    </AudiobookSearchProvider>
  );
}
