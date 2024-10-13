import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { UserFooter } from 'View/User/Common/UserFooter';
import { useTokenStore } from 'Store/store';
import { useTranslation } from 'react-i18next';
import './UserReports.css';
import { NetworkErrorBoundry } from 'Errors/NetworkErrorBoundry';
import { NetworkErrorBoundryModal } from 'Errors/NetworkErrorBoundryModal';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import { ErrorBoundary } from 'react-error-boundary';
import { UserReportsProvider } from '../../../Providers/User/UserReportsProvider';
import UserRenderCategoriesList from '../../../View/User/UserReports/UserReportsList';
import UserReportDetailModal from '../../../View/User/UserReports/UserReportDetailModal';

export default function UserReports() {
  const { t, i18n } = useTranslation();

  const [reportsState, setReportsState] = useState({
    page: 0,
    limit: 10,
    refresh: false,
    detailReportModal: false,
    report: null,
  });

  const token = useTokenStore((state) => state.token);

  return (
    <NetworkErrorBoundry FallbackComponent={NetworkErrorBoundryModal}>
      <ErrorBoundary FallbackComponent={ErrorHandlerModal}>
        <HelmetProvider>
          <Helmet>
            <style>{'body { background-color: black; }'}</style>
          </Helmet>
          <UserReportsProvider
            token={token}
            i18n={i18n}
            page={reportsState.page}
            limit={reportsState.limit}
          >
            <UserRenderCategoriesList
              reportsState={reportsState}
              setReportsState={setReportsState}
              token={token}
              i18n={i18n}
              t={t}
            />
            {reportsState.detailReportModal ? (
              <UserReportDetailModal
                reportsState={reportsState}
                setReportsState={setReportsState}
                t={t}
              />
            ) : null}
          </UserReportsProvider>
          <UserFooter />
        </HelmetProvider>
      </ErrorBoundary>
    </NetworkErrorBoundry>
  );
}
