import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import { NetworkErrorBoundry } from 'Errors/NetworkErrorBoundry';
import { NetworkErrorBoundryModal } from 'Errors/NetworkErrorBoundryModal';
import { useTokenStore } from 'Store/store';
import { useTranslation } from 'react-i18next';
import AdminReportsContainer from 'View/Admin/AdminReports/AdminReportsContainer';
import './AdminReports.css';

export default function AdminReports() {
  const token = useTokenStore((state) => state.token);

  const { t, i18n } = useTranslation();

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
        <AdminReportsContainer token={token} t={t} i18n={i18n} />
      </ErrorBoundary>
    </NetworkErrorBoundry>
  );
}
