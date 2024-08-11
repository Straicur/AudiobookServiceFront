import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import { NetworkErrorBoundry } from 'Errors/NetworkErrorBoundry';
import { NetworkErrorBoundryModal } from 'Errors/NetworkErrorBoundryModal';
import { useTokenStore } from 'Store/store';
import { useTranslation } from 'react-i18next';
import AdminReportsContainer from 'View/Admin/AdminReports/AdminReportsContainer';
import './AdminReports.css';
import { AdminReportsProvider } from 'Providers/Admin/AdminReportsProvider';

export default function AdminReports() {
  const [reportsState, setReportsState] = useState({
    page: 0,
    refresh: false,
  });

  const [searchState, setSearchState] = useState({
    actionId: '',
    description: '',
    email: '',
    ip: '',
    type: 0,
    user: null,
    accepted: null,
    denied: null,
    dateFrom: 0,
    dateTo: 0,
    order: 0,
  });

  const token = useTokenStore((state) => state.token);

  const { t, i18n } = useTranslation();

  return (
    <NetworkErrorBoundry FallbackComponent={NetworkErrorBoundryModal}>
      <ErrorBoundary FallbackComponent={ErrorHandlerModal}>
        <AdminReportsProvider
          token={token}
          page={reportsState.page}
          searchState={searchState}
          i18n={i18n}
        >
          <AdminReportsContainer
            token={token}
            t={t}
            i18n={i18n}
            reportsState={reportsState}
            setReportsState={setReportsState}
            searchState={searchState}
            setSearchState={setSearchState}
          />
        </AdminReportsProvider>
      </ErrorBoundary>
    </NetworkErrorBoundry>
  );
}
