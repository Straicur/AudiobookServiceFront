import React, { useEffect } from 'react';
import UserMainGetAllSearchAudiobooks from './UserMainGetAllSearchAudiobooks';
import { UserAudiobookSearchProvider } from 'Providers/User/UserAudiobookSearchProvider';

export default function UserMainRenderAudiobookSearch(props) {
  useEffect(() => {
    if (props.audiobooksState.error != null) {
      throw props.audiobooksState.error;
    }
  }, [props.audiobooksState.error]);

  return (
    <UserAudiobookSearchProvider
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
    </UserAudiobookSearchProvider>
  );
}
