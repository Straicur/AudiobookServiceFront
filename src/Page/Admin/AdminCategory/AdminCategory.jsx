import React, { useState } from 'react';
import { useTokenStore } from 'Store/store';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import AdminCategoryAudiobooksList from 'View/Admin/AdminCategory/AdminCategoryAudiobooksList';
import { useParams } from 'react-router-dom';
import './AdminCategory.css';

export default function AdminCategory() {
  const token = useTokenStore((state) => state.token);

  const { categoryKey } = useParams();

  const [audiobooksState, setAudiobooksState] = useState({
    errorPart: '',
    errorCover: '',
    error: null,
  });

  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerModal}
      onReset={() => {
        setAudiobooksState({
          ...audiobooksState,
          error: null,
        });
      }}
    >
      <AdminCategoryAudiobooksList
        audiobooksState={audiobooksState}
        setAudiobooksState={setAudiobooksState}
        token={token}
        categoryKey={categoryKey}
      />
    </ErrorBoundary>
  );
}
