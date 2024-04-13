import React, { useState } from 'react';
import { useTokenStore } from 'Store/store';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import AdminNotificationsList from 'View/Admin/AdminNotifications/AdminNotificationsList';
import { AdminNotificationsProvider } from 'Providers/Admin/AdminNotificationsProvider';
import { AdminSystemRolesProvider } from 'Providers/Admin/AdminSystemRolesProvider';
import { useTranslation } from 'react-i18next';
import './AdminNotifications.css';

export default function AdminNotifications() {
  const token = useTokenStore((state) => state.token);
  const { t, i18n } = useTranslation();

  const [notificationsState, setNotificationsState] = useState({
    page: 0,
    refresh: false,
    error: null,
  });

  const [searchState, setSearchState] = useState({
    text: '',
    type: 0,
    deleted: null,
    order: 0,
  });

  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerModal}
      onReset={() => {
        setNotificationsState((prev) => ({
          ...prev,
          error: null,
        }));
      }}
    >
      <AdminNotificationsProvider
        token={token}
        page={notificationsState.page}
        searchState={searchState}
        setState={setNotificationsState}
        i18n={i18n}
      >
        <AdminSystemRolesProvider token={token} setState={setNotificationsState} i18n={i18n}>
          <AdminNotificationsList
            notificationsState={notificationsState}
            setNotificationsState={setNotificationsState}
            searchState={searchState}
            setSearchState={setSearchState}
            token={token}
            t={t}
            i18n={i18n}
          />
        </AdminSystemRolesProvider>
      </AdminNotificationsProvider>
    </ErrorBoundary>
  );
}
