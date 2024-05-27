import React from 'react';
import { AdminAudiobookDataProvider } from 'Providers/Admin/AdminAudiobookDataProvider';
import { AdminAudiobookPartProvider } from 'Providers/Admin/AdminAudiobookPartProvider';
import { AdminAudiobookCommentsProvider } from 'Providers/Admin/AdminAudiobookCommentsProvider';
import AdminAudiobookDetail from './AdminAudiobookDetail';
import { AdminCategoriesTreeProvider } from 'Providers/Admin/AdminCategoriesTreeProvider';
import { AdminCategoriesListProvider } from 'Providers/Admin/AdminCategoriesListProvider';

export default function AdminAuidobookDetailProviders(props) {
  return (
    <AdminAudiobookDataProvider
      token={props.token}
      audiobookId={props.audiobookId}
      t={props.t}
      i18n={props.i18n}
    >
      <AdminAudiobookPartProvider
        state={props.audiobookState}
        token={props.token}
        audiobookId={props.audiobookId}
        part={props.audiobookState.part}
        t={props.t}
        i18n={props.i18n}
      >
        <AdminAudiobookCommentsProvider
          token={props.token}
          audiobookId={props.audiobookId}
          t={props.t}
          i18n={props.i18n}
        >
          <AdminCategoriesTreeProvider token={props.token} i18n={props.i18n}>
            <AdminCategoriesListProvider token={props.token} i18n={props.i18n}>
              <AdminAudiobookDetail
                audiobookState={props.audiobookState}
                setAudiobookState={props.setAudiobookState}
                t={props.t}
                token={props.token}
                i18n={props.i18n}
                deleted={props.deleted}
              />
            </AdminCategoriesListProvider>
          </AdminCategoriesTreeProvider>
        </AdminAudiobookCommentsProvider>
      </AdminAudiobookPartProvider>
    </AdminAudiobookDataProvider>
  );
}
