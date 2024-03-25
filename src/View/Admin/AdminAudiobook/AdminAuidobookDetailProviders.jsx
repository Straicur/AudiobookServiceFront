import React, { useEffect } from 'react';
import { UserAudiobookDataProvider } from 'Providers/User/UserAudiobookDataProvider';
import { AudiobookCoverDataProvider } from 'Providers/Common/AudiobookCoverDataProvider';
import { AudiobookPartProvider } from 'Providers/Common/AudiobookPartProvider';
import { UserAudiobookCommentsProvider } from 'Providers/User/UserAudiobookCommentsProvider';
import AdminAudiobookDetail from './AdminAudiobookDetail';

export default function AuidobookDetailProviders(props) {
  useEffect(() => {
    if (props.audiobookState.error != null) {
      throw props.audiobookState.error;
    }
  }, [props.audiobookState.error]);

  return (
    <UserAudiobookDataProvider
      state={props.audiobookState}
      setState={props.setAudiobookState}
      token={props.token}
      audiobookId={props.audiobookId}
      t={props.t}
      i18n={props.i18n}
    >
      <AudiobookCoverDataProvider
        state={props.audiobookState}
        setState={props.setAudiobookState}
        token={props.token}
        audiobookId={props.audiobookId}
        t={props.t}
        i18n={props.i18n}
      >
        <AudiobookPartProvider
          state={props.audiobookState}
          setState={props.setAudiobookState}
          token={props.token}
          audiobookId={props.audiobookId}
          part={props.audiobookState.part}
          t={props.t}
          i18n={props.i18n}
        >
          <UserAudiobookCommentsProvider
            state={props.audiobookState}
            setState={props.setAudiobookState}
            token={props.token}
            audiobookId={props.audiobookId}
            t={props.t}
            i18n={props.i18n}
          >
            <AdminAudiobookDetail
              audiobookState={props.audiobookState}
              setAudiobookState={props.setAudiobookState}
              t={props.t}
              token={props.token}
              i18n={props.i18n}
            />
          </UserAudiobookCommentsProvider>
        </AudiobookPartProvider>
      </AudiobookCoverDataProvider>
    </UserAudiobookDataProvider>
  );
}
