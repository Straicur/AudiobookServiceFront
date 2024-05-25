import React, { useState } from 'react';
import { useTokenStore } from 'Store/store';
import { ErrorBoundary } from 'Errors/ErrorBoundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import AdminCategoryAudiobooksList from 'View/Admin/AdminCategory/AdminCategoryAudiobooksList';
import { AdminCategoryDetailProfider } from 'Providers/Admin/AdminCategoryDetailProfider';
import { AdminCategoryAudiobooksProvider } from 'Providers/Admin/AdminCategoryAudiobooksProvider';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import './AdminCategory.css';

export default function AdminCategory() {
  const token = useTokenStore((state) => state.token);

  const { t, i18n } = useTranslation();

  const { categoryKey } = useParams();

  const [audiobooksState, setAudiobooksState] = useState({
    page: 0,
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
      <AdminCategoryDetailProfider categoryKey={categoryKey} token={token} i18n={i18n}>
        <AdminCategoryAudiobooksProvider
          categoryKey={categoryKey}
          page={audiobooksState.page}
          token={token}
          i18n={i18n}
        >
          <AdminCategoryAudiobooksList
            audiobooksState={audiobooksState}
            setAudiobooksState={setAudiobooksState}
            token={token}
            categoryKey={categoryKey}
            t={t}
            i18n={i18n}
          />
        </AdminCategoryAudiobooksProvider>
      </AdminCategoryDetailProfider>
    </ErrorBoundary>
  );
}
