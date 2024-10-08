import React, { useState } from 'react';
import { useTokenStore } from 'Store/store';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import AdminMainContainer from 'View/Admin/AdminMain/AdminMainContainer';
import { useTranslation } from 'react-i18next';
import { AdminMainDataProvider } from '../../../Providers/Admin/AdminMainDataProvider';
import { NetworkErrorBoundry } from 'Errors/NetworkErrorBoundry';
import { NetworkErrorBoundryModal } from 'Errors/NetworkErrorBoundryModal';
import './AdminMain.css';

export default function AdminMain() {
  const token = useTokenStore((state) => state.token);
  const { t, i18n } = useTranslation();

  const [infoState, setInfoState] = useState({
    // error: null,
  });

  return (
    <NetworkErrorBoundry FallbackComponent={NetworkErrorBoundryModal}>
      <ErrorBoundary
        FallbackComponent={ErrorHandlerModal}
        // onReset={() => {
        //   setInfoState((prev) => ({
        //     ...prev,
        //     error: null,
        //   }));
        // }}
      >
        <AdminMainDataProvider token={token} i18n={i18n}>
          <AdminMainContainer
            infoState={infoState}
            token={token}
            setInfoState={setInfoState}
            t={t}
            i18n={i18n}
          />
        </AdminMainDataProvider>
      </ErrorBoundary>
    </NetworkErrorBoundry>
  );
}
