import React, { useState } from 'react';
import { useTokenStore } from 'Store/store';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import AdminNotificationsList from 'View/Admin/AdminNotifications/AdminNotificationsList';
import { AdminNotificationsProvider } from 'Providers/Admin/AdminNotificationsProvider';
import { AdminSystemRolesProvider } from 'Providers/Admin/AdminSystemRolesProvider';
import { AdminUsersListProvider } from '../../../Providers/Admin/AdminUsersListProvider';
import { AdminCategoriesListProvider } from 'Providers/Admin/AdminCategoriesListProvider';
import { AdminAudiobooksProvider } from 'Providers/Admin/AdminAudiobooksProvider';
import { NetworkErrorBoundry } from 'Errors/NetworkErrorBoundry';
import { NetworkErrorBoundryModal } from 'Errors/NetworkErrorBoundryModal';
import { useTranslation } from 'react-i18next';
import './AdminNotifications.css';

export default function AdminNotifications() {
  const token = useTokenStore((state) => state.token);

  const { t, i18n } = useTranslation();

  const [notificationsState, setNotificationsState] = useState({
    page: 0,
    refresh: false,
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
    <NetworkErrorBoundry FallbackComponent={NetworkErrorBoundryModal}>
      <ErrorBoundary
        FallbackComponent={ErrorHandlerModal}
        // onReset={() => {
        //   setNotificationsState((prev) => ({
        //     ...prev,
        //     error: null,
        //   }));
        // }}
      >
        <AdminNotificationsProvider
          token={token}
          page={notificationsState.page}
          searchState={searchState}
          i18n={i18n}
        >
          <AdminSystemRolesProvider token={token} i18n={i18n}>
            <AdminUsersListProvider
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
              i18n={i18n}
              limit={25}
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
                i18n={i18n}
                limit={25}
              >
                <AdminCategoriesListProvider token={token} i18n={i18n}>
                  <AdminNotificationsList
                    notificationsState={notificationsState}
                    setNotificationsState={setNotificationsState}
                    searchState={searchState}
                    setSearchState={setSearchState}
                    setNotificationsUsersState={setNotificationsUsersState}
                    notificationsUsersState={notificationsUsersState}
                    notificationsAudiobooksState={notificationsAudiobooksState}
                    setNotificationsAudiobooksState={setNotificationsAudiobooksState}
                    token={token}
                    t={t}
                    i18n={i18n}
                  />
                </AdminCategoriesListProvider>
              </AdminAudiobooksProvider>
            </AdminUsersListProvider>
          </AdminSystemRolesProvider>
        </AdminNotificationsProvider>
      </ErrorBoundary>
    </NetworkErrorBoundry>
  );
}
