import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import { NetworkErrorBoundry } from 'Errors/NetworkErrorBoundry';
import { NetworkErrorBoundryModal } from 'Errors/NetworkErrorBoundryModal';
import { useTokenStore } from 'Store/store';
import { useTranslation } from 'react-i18next';
import AdminTechnicalBreaksContainer from 'View/Admin/AdminTechnicalBreaks/AdminTechnicalBreaksContainer';
import './AdminTechnicalBreaks.css';
import { AdminTechnicalBreaksProvider } from 'Providers/Admin/AdminTechnicalBreaksProvider';

export default function AdminTechnicalBreaks() {
  const [technicalBreaksState, setTechnicalBreaks] = useState({
    page: 0,
    refresh: false,
  });

  const [searchState, setSearchState] = useState({
    nameOrLastname: '',
    active: null,
    order: 0,
    dateFrom: 0,
    dateTo: 0,
  });

  const token = useTokenStore((state) => state.token);

  const { t, i18n } = useTranslation();

  return (
    <NetworkErrorBoundry FallbackComponent={NetworkErrorBoundryModal}>
      <ErrorBoundary FallbackComponent={ErrorHandlerModal}>
        <AdminTechnicalBreaksProvider
          token={token}
          page={technicalBreaksState.page}
          searchState={searchState}
          i18n={i18n}
        >
          <AdminTechnicalBreaksContainer
            technicalBreaksState={technicalBreaksState}
            setTechnicalBreaks={setTechnicalBreaks}
            token={token}
            searchState={searchState}
            setSearchState={setSearchState}
            t={t}
            i18n={i18n}
          />
        </AdminTechnicalBreaksProvider>
      </ErrorBoundary>
    </NetworkErrorBoundry>
  );
}
