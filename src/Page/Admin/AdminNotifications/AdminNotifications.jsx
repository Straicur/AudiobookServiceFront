import React, { useState } from 'react';
import { useTokenStore } from 'Store/store';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import AdminNotificationsList from 'View/Admin/AdminNotifications/AdminNotificationsList';
import { AdminNotificationsProvider } from 'Providers/Admin/AdminNotificationsProvider';
import { AdminSystemRolesProvider } from 'Providers/Admin/AdminSystemRolesProvider';
import { AdminUsersListPrivider } from 'Providers/Admin/AdminUsersListPrivider';
import { AdminCategoriesListProvider } from 'Providers/Admin/AdminCategoriesListProvider';
import { AdminAudiobooksProvider } from 'Providers/Admin/AdminAudiobooksProvider';
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

  const [notificationsUsersState, setNotificationsUsersState] = useState({
    page: 0,
    refresh: false,
  });

  const [notificationsAudiobooksState, setNotificationsAudiobooksState] = useState({
    page: 0,
    refresh: false,
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
          <AdminUsersListPrivider
            token={token}
            page={notificationsUsersState.page}
            searchState={{
              email: '',
              phoneNumber: '',
              firstname: '',
              lastname: '',
              active: null,
              banned: null,
              order: 1,
            }}
            setState={setNotificationsState}
            i18n={i18n}
            limit={30}
          >
            <AdminAudiobooksProvider
              token={token}
              page={notificationsAudiobooksState.page}
              searchState={{
                sort: 3,
                categories: [],
                title: '',
                author: '',
                album: '',
                parts: 0,
                age: 0,
                year: 0,
                duration: 0,
              }}
              setState={setNotificationsState}
              i18n={i18n}
              limit={30}
            >
              <AdminCategoriesListProvider
                token={token}
                setState={setNotificationsState}
                i18n={i18n}
              >
                <AdminNotificationsList
                  notificationsState={notificationsState}
                  setNotificationsState={setNotificationsState}
                  searchState={searchState}
                  setSearchState={setSearchState}
                  setNotificationsUsersState={setNotificationsUsersState}
                  setNotificationsAudiobooksState={setNotificationsAudiobooksState}
                  token={token}
                  t={t}
                  i18n={i18n}
                />
              </AdminCategoriesListProvider>
            </AdminAudiobooksProvider>
          </AdminUsersListPrivider>
        </AdminSystemRolesProvider>
      </AdminNotificationsProvider>
    </ErrorBoundary>
  );
}
