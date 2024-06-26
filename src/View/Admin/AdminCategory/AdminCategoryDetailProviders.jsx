import React from 'react';
import { AdminAudiobookDataProvider } from 'Providers/Admin/AdminAudiobookDataProvider';
import { AdminAudiobookPartProvider } from 'Providers/Admin/AdminAudiobookPartProvider';
import AdminCategoryAudiobookDetailModal from './AdminCategoryAudiobookDetailModal';

export default function AdminCategoryDetailProviders(props) {
  return (
    <AdminAudiobookDataProvider
      state={props.audiobooksState}
      token={props.token}
      audiobookId={props.state.detailAudiobookElement.id}
      i18n={props.i18n}
    >
      <AdminAudiobookPartProvider
        state={props.audiobooksState}
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
          deleteAudiobook={props.deleteAudiobook}
          categoryDetail={props.categoryDetail}
          deleteAudiobookFromCategory={props.deleteAudiobookFromCategory}
          categoryKey={props.categoryKey}
          audiobooksState={props.audiobooksState}
          setAudiobooksState={props.setAudiobooksState}
          i18n={props.i18n}
        />
      </AdminAudiobookPartProvider>
    </AdminAudiobookDataProvider>
  );
}
