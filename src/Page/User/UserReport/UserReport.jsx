import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { UserFooter } from 'View/User/Common/UserFooter';
import { useTokenStore } from 'Store/store';
import './UserReport.css';
import UserReportContainer from 'View/User/UserReport/UserReportContainer';
import { UserReportProvider } from 'Providers/User/UserReportProvider';
import { UserIpProvider } from 'Providers/User/UserIpProvider';
import { NetworkErrorBoundry } from 'Errors/NetworkErrorBoundry';
import { NetworkErrorBoundryModal } from 'Errors/NetworkErrorBoundryModal';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import { ErrorBoundary } from 'react-error-boundary';

export default function UserReport() {
  const { t, i18n } = useTranslation();

  const [reportState, setReportState] = useState({
    type: 8,
    description: '',
    email: '',
    send: false,
    openSuccessModal: false,
    openCategoriesList: false,
    openAudiobooksList: false,
    choosenCategory: null,
    choosenCategoryName: null,
    choosenAudiobook: null,
    choosenAudiobookTitle: null,
    choosenAudiobookAuthor: null,
  });

  const token = useTokenStore((state) => state.token);

  return (
    <NetworkErrorBoundry FallbackComponent={NetworkErrorBoundryModal}>
      <ErrorBoundary FallbackComponent={ErrorHandlerModal}>
        <HelmetProvider>
          <Helmet>
            <style>{'body { background-color: black; }'}</style>
          </Helmet>
          <UserReportProvider token={token} i18n={i18n}>
            <UserIpProvider token={token}>
              <UserReportContainer
                token={token}
                t={t}
                i18n={i18n}
                reportState={reportState}
                setReportState={setReportState}
              />
            </UserIpProvider>
          </UserReportProvider>
          <UserFooter />
        </HelmetProvider>
      </ErrorBoundary>
    </NetworkErrorBoundry>
  );
}
