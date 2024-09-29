import React, { useRef, useState } from 'react';
import { useTokenStore } from 'Store/store';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import AdminAudiobookDetailProviders from '../../../View/Admin/AdminAudiobook/AdminAudiobookDetailProviders';
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
    deleteEntirely: false,
    addCategoriesModal: false,
    reAddingModal: false,
    reAdding: false,
    refresh: false,
    addAudiobookSeconds: 3000,
    part: 0,
    errorCover: '',
  });

  const [audiobookDetailState, setAudiobookDetailState] = useState({
    id: '',
    title: '',
    author: '',
    version: '',
    album: '',
    year: 0,
    duration: 0,
    size: '',
    parts: 0,
    description: '',
    age: 0,
    encoded: '',
    categories: [],
    active: false,
    avgRating: 0,
    ratingAmount: 0,
  });

  return (
    <NetworkErrorBoundry FallbackComponent={NetworkErrorBoundryModal} showModal={deleted.current}>
      <ErrorBoundary FallbackComponent={ErrorHandlerModal}>
        <AdminAudiobookDetailProviders
          audiobookState={audiobookState}
          setAudiobookState={setAudiobookState}
          audiobookId={audiobookId}
          audiobookDetailState={audiobookDetailState}
          setAudiobookDetailState={setAudiobookDetailState}
          token={token}
          t={t}
          i18n={i18n}
          deleted={deleted}
        />
      </ErrorBoundary>
    </NetworkErrorBoundry>
  );
}
