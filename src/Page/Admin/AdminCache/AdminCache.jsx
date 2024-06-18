import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import { NetworkErrorBoundry } from 'Errors/NetworkErrorBoundry';
import { NetworkErrorBoundryModal } from 'Errors/NetworkErrorBoundryModal';
import { AdminCacheProvider } from 'Providers/Admin/AdminCacheProvider';
import AdminCacheContainer from 'View/Admin/AdminCache/AdminCacheContainer';
import { useTokenStore } from 'Store/store';
import { useTranslation } from 'react-i18next';
import './AdminCache.css';

export default function AdminCache() {
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
        <AdminCacheProvider token={token} i18n={i18n}>
          <AdminCacheContainer token={token} t={t} i18n={i18n} />
        </AdminCacheProvider>
      </ErrorBoundary>
    </NetworkErrorBoundry>
  );
}
