import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import { NetworkErrorBoundry } from 'Errors/NetworkErrorBoundry';
import { NetworkErrorBoundryModal } from 'Errors/NetworkErrorBoundryModal';
import { useTokenStore } from 'Store/store';
import { useTranslation } from 'react-i18next';
import AdminTechnicalBreaksContainer from 'View/Admin/AdminTechnicalBreaks/AdminTechnicalBreaksContainer';
import './AdminTechnicalBreaks.css';

export default function AdminTechnicalBreaks() {
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
        <AdminTechnicalBreaksContainer token={token} t={t} i18n={i18n} />
      </ErrorBoundary>
    </NetworkErrorBoundry>
  );
}
