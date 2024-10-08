import React from 'react';
import UserMainGetAllSearchAudiobooks from './UserMainGetAllSearchAudiobooks';
import { UserAudiobookSearchProvider } from 'Providers/User/UserAudiobookSearchProvider';

export default function UserMainRenderAudiobookSearch(props) {
  return (
    <UserAudiobookSearchProvider
      allowed={props.serchAllowed}
      title={props.audiobooksState.searchText}
      categoryKey={props.audiobooksState.categoryKey}
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
