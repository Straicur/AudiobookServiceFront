import React, { useRef, useState } from 'react';
import { useTokenStore } from 'Store/store';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import AdminAuidobookDetailProviders from 'View/Admin/AdminAudiobook/AdminAuidobookDetailProviders';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './AdminAudiobook.css';
import { ErrorBoundary } from 'react-error-boundary';
import { NetworkErrorBoundry } from 'Errors/NetworkErrorBoundry';
import { NetworkErrorBoundryModal } from 'Errors/NetworkErrorBoundryModal';

export default function AdminAudiobook() {
  const token = useTokenStore((state) => state.token);

  const { t, i18n } = useTranslation();

  const { audiobookId } = useParams();

  const deleted = useRef(true);

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
  });

  return (
    <NetworkErrorBoundry FallbackComponent={NetworkErrorBoundryModal} showModal={deleted}>
      <ErrorBoundary FallbackComponent={ErrorHandlerModal}>
        <AdminAuidobookDetailProviders
          audiobookState={audiobookState}
          setAudiobookState={setAudiobookState}
          audiobookId={audiobookId}
          token={token}
          t={t}
          i18n={i18n}
          deleted={deleted}
        />
      </ErrorBoundary>
    </NetworkErrorBoundry>
  );
}
