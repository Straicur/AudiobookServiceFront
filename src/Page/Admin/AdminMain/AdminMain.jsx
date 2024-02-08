import React, { useState } from 'react';
import { useTokenStore } from 'Store/store';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import AdminMainContainer from 'View/Admin/AdminMain/AdminMainContainer';
import './AdminMain.css';

export default function AdminMain() {
  const token = useTokenStore((state) => state.token);

  const [infoState, setInfoState] = useState({
    users: 0,
    categories: 0,
    audiobooks: 0,
    lastWeekRegistered: 0,
    lastWeekLogins: 0,
    lastWeekNotifications: 0,
    error: null,
  });

  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerModal}
      onReset={() => {
        setInfoState((prev) => ({
          ...prev,
          error: null,
        }));
      }}
    >
      <AdminMainContainer infoState={infoState} setInfoState={setInfoState} token={token} />
    </ErrorBoundary>
  );
}
