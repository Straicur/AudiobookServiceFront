import React, { useState } from 'react';
import { useTokenStore } from 'Store/store';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import AdminAuidobookDetailProviders from 'View/Admin/AdminAudiobook/AdminAuidobookDetailProviders';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './AdminAudiobook.css';

export default function AdminAudiobook() {
  const token = useTokenStore((state) => state.token);

  const { t, i18n } = useTranslation();

  const { audiobookId } = useParams();

  const [audiobookState, setAudiobookState] = useState({
    file: null,
    edit: false,
    deleteFromCategory: false,
    deleteEntarly: false,
    addCategoriesModal: false,
    reAddingModal: false,
    reAdding: false,
    refresh: false,
    addAudiobookSeconds: 3000,
    part: 0,
    errorCover: '',
    errorPart: '',
  });

  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerModal}
      onReset={() => {
        setAudiobookState((prev) => ({
          ...prev,
          errorPart: null,
        }));
      }}
    >
      <AdminAuidobookDetailProviders
        audiobookState={audiobookState}
        setAudiobookState={setAudiobookState}
        audiobookId={audiobookId}
        token={token}
        t={t}
        i18n={i18n}
      />
    </ErrorBoundary>
  );
}
