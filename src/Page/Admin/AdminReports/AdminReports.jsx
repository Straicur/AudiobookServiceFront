import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import { NetworkErrorBoundry } from 'Errors/NetworkErrorBoundry';
import { NetworkErrorBoundryModal } from 'Errors/NetworkErrorBoundryModal';
import './AdminReports.css';

export default function AdminReports() {
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
        Reports
      </ErrorBoundary>
    </NetworkErrorBoundry>
  );
}
