import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import { NetworkErrorBoundry } from 'Errors/NetworkErrorBoundry';
import { NetworkErrorBoundryModal } from 'Errors/NetworkErrorBoundryModal';
import './AdminCache.css';

export default function AdminCache() {
  return (
    <NetworkErrorBoundry FallbackComponent={NetworkErrorBoundryModal}>
      <ErrorBoundary
        FallbackComponent={ErrorHandlerModal}
        // onReset={() => {
        //   setUsersState((prev) => ({
        //     ...prev,
        //     error: null,
        //   }));
        // }}
      >
        Cache
      </ErrorBoundary>
    </NetworkErrorBoundry>
  );
}
