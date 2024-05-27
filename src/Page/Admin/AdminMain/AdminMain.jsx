import React, { useState } from 'react';
import { useTokenStore } from 'Store/store';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import AdminMainContainer from 'View/Admin/AdminMain/AdminMainContainer';
import { useTranslation } from 'react-i18next';
import { AdminMainDataPrivider } from 'Providers/Admin/AdminMainDataPrivider';
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
        <AdminMainDataPrivider token={token} i18n={i18n}>
          <AdminMainContainer infoState={infoState} setInfoState={setInfoState} t={t} i18n={i18n} />
        </AdminMainDataPrivider>
      </ErrorBoundary>
    </NetworkErrorBoundry>
  );
}
