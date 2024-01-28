import React, { useState } from 'react';
import { useTokenStore } from 'Store/store';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import AdminNotificationsList from 'View/Admin/AdminNotifications/AdminNotificationsList';
import './AdminNotifications.css';

export default function AdminNotifications() {
  const token = useTokenStore((state) => state.token);

  const [notificationsState, setNotificationsState] = useState({
    error: null,
  });

  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerModal}
      onReset={() => {
        setNotificationsState({
          ...notificationsState,
          error: null,
        });
      }}
    >
      <AdminNotificationsList
        notificationsState={notificationsState}
        setNotificationsState={setNotificationsState}
        token={token}
      />
    </ErrorBoundary>
  );
}
