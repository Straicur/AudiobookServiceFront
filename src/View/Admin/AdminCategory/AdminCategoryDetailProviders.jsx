import React from 'react';
import { UserAudiobookDataProvider } from 'Providers/User/UserAudiobookDataProvider';
import { AudiobookCoverDataProvider } from 'Providers/Common/AudiobookCoverDataProvider';
import { AudiobookPartProvider } from 'Providers/Common/AudiobookPartProvider';
import AdminCategoryAudiobookDetailModal from './AdminCategoryAudiobookDetailModal';

export default function AdminCategoryDetailProviders(props) {
  return (
    <UserAudiobookDataProvider
      state={props.audiobooksState}
      setState={props.setAudiobooksState}
      token={props.token}
      audiobookId={props.state.detailAudiobookElement.id}
      i18n={props.i18n}
    >
      <AudiobookCoverDataProvider
        state={props.audiobooksState}
        setState={props.setAudiobooksState}
        token={props.token}
        audiobookId={props.state.detailAudiobookElement.id}
        i18n={props.i18n}
      >
        <AudiobookPartProvider
          state={props.audiobooksState}
          setState={props.setAudiobooksState}
          token={props.token}
          audiobookId={props.state.detailAudiobookElement.id}
          part={props.state.part}
          i18n={props.i18n}
        >
          <AdminCategoryAudiobookDetailModal
            state={props.state}
            setState={props.setState}
            t={props.t}
            token={props.token}
            categoryKey={props.categoryKey}
            audiobooksState={props.audiobooksState}
            setAudiobooksState={props.setAudiobooksState}
            i18n={props.i18n}
          />
        </AudiobookPartProvider>
      </AudiobookCoverDataProvider>
    </UserAudiobookDataProvider>
  );
}
