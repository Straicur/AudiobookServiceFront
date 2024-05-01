import React, { useEffect } from 'react';
import { AdminAudiobookDataProvider } from 'Providers/Admin/AdminAudiobookDataProvider';
import { AdminAudiobookPartProvider } from 'Providers/Admin/AdminAudiobookPartProvider';
import { AdminAudiobookCommentsProvider } from 'Providers/Admin/AdminAudiobookCommentsProvider';
import AdminAudiobookDetail from './AdminAudiobookDetail';
import { AdminCategoriesTreeProvider } from 'Providers/Admin/AdminCategoriesTreeProvider';
import { AdminCategoriesListProvider } from 'Providers/Admin/AdminCategoriesListProvider';

export default function AdminAuidobookDetailProviders(props) {
  useEffect(() => {
    if (props.audiobookState.error != null) {
      throw props.audiobookState.error;
    }
  }, [props.audiobookState.error]);

  return (
    <AdminAudiobookDataProvider
      setState={props.setAudiobookState}
      token={props.token}
      audiobookId={props.audiobookId}
      t={props.t}
      i18n={props.i18n}
    >
      <AdminAudiobookPartProvider
        state={props.audiobookState}
        setState={props.setAudiobookState}
        token={props.token}
        audiobookId={props.audiobookId}
        part={props.audiobookState.part}
        t={props.t}
        i18n={props.i18n}
      >
        <AdminAudiobookCommentsProvider
          setState={props.setAudiobookState}
          token={props.token}
          audiobookId={props.audiobookId}
          t={props.t}
          i18n={props.i18n}
        >
          <AdminCategoriesTreeProvider
            token={props.token}
            setState={props.setAudiobookState}
            i18n={props.i18n}
          >
            <AdminCategoriesListProvider
              token={props.token}
              setState={props.setAudiobookState}
              i18n={props.i18n}
            >
              <AdminAudiobookDetail
                audiobookState={props.audiobookState}
                setAudiobookState={props.setAudiobookState}
                t={props.t}
                token={props.token}
                i18n={props.i18n}
              />
            </AdminCategoriesListProvider>
          </AdminCategoriesTreeProvider>
        </AdminAudiobookCommentsProvider>
      </AdminAudiobookPartProvider>
    </AdminAudiobookDataProvider>
  );
}
