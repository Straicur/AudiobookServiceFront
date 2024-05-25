import React, { useState } from 'react';
import { useTokenStore } from 'Store/store';
import { ErrorBoundary } from 'Errors/ErrorBoundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import AdminAudiobooksList from 'View/Admin/AdminAudiobooks/AdminAudiobooksList';
import { useTranslation } from 'react-i18next';
import { AdminAudiobooksProvider } from 'Providers/Admin/AdminAudiobooksProvider';
import { AdminCategoriesListProvider } from 'Providers/Admin/AdminCategoriesListProvider';
import './AdminAudiobooks.css';

export default function AdminAudiobooks() {
  const token = useTokenStore((state) => state.token);

  const { t, i18n } = useTranslation();

  const [audiobooksState, setAudiobooksState] = useState({
    page: 0,
    refresh: false,
  });

  const [searchState, setSearchState] = useState({
    sort: 0,
    categories: [],
    title: '',
    author: '',
    album: '',
    parts: 0,
    age: 0,
    year: 0,
    duration: 0,
  });

  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerModal}
      // onReset={() => {
      //   setAudiobooksState((prev) => ({
      //     ...prev,
      //     error: null,
      //   }));
      // }}
    >
      <AdminAudiobooksProvider
        token={token}
        page={audiobooksState.page}
        searchState={searchState}
        i18n={i18n}
      >
        <AdminCategoriesListProvider token={token} i18n={i18n}>
          <AdminAudiobooksList
            audiobooksState={audiobooksState}
            setAudiobooksState={setAudiobooksState}
            t={t}
            i18n={i18n}
            searchState={searchState}
            setSearchState={setSearchState}
            token={token}
          />
        </AdminCategoriesListProvider>
      </AdminAudiobooksProvider>
    </ErrorBoundary>
  );
}
