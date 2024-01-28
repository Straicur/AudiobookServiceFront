import React, { useState } from 'react';
import { useTokenStore } from 'Store/store';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import AdminAudiobooksList from 'View/Admin/AdminAudiobooks/AdminAudiobooksList';
import './AdminAudiobooks.css';

export default function AdminAudiobooks() {
  const token = useTokenStore((state) => state.token);

  const [audiobooksState, setAudiobooksState] = useState({
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
      <AdminAudiobooksList
        audiobooksState={audiobooksState}
        setAudiobooksState={setAudiobooksState}
        token={token}
      />
    </ErrorBoundary>
  );
}
