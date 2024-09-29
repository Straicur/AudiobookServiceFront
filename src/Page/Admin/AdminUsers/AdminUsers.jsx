import React, { useState } from 'react';
import { useTokenStore } from 'Store/store';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import AdminUsersList from 'View/Admin/AdminUsers/AdminUsersList';
import { AdminUsersListProvider } from '../../../Providers/Admin/AdminUsersListProvider';
import { useTranslation } from 'react-i18next';
import { AdminSystemRolesProvider } from 'Providers/Admin/AdminSystemRolesProvider';
import { NetworkErrorBoundry } from 'Errors/NetworkErrorBoundry';
import { NetworkErrorBoundryModal } from 'Errors/NetworkErrorBoundryModal';
import './AdminUsers.css';

export default function AdminUsers() {
  const [usersState, setUsersState] = useState({
    page: 0,
    refresh: false,
  });

  const [searchState, setSearchState] = useState({
    email: '',
    phoneNumber: '',
    firstname: '',
    lastname: '',
    active: null,
    banned: null,
    order: 0,
  });

  const { t, i18n } = useTranslation();

  const token = useTokenStore((state) => state.token);

  return (
    <NetworkErrorBoundry FallbackComponent={NetworkErrorBoundryModal}>
      <ErrorBoundary FallbackComponent={ErrorHandlerModal}>
        <AdminUsersListProvider
          token={token}
          page={usersState.page}
          searchState={searchState}
          i18n={i18n}
        >
          <AdminSystemRolesProvider token={token} i18n={i18n}>
            <AdminUsersList
              usersState={usersState}
              setUsersState={setUsersState}
              token={token}
              searchState={searchState}
              setSearchState={setSearchState}
              t={t}
              i18n={i18n}
            />
          </AdminSystemRolesProvider>
        </AdminUsersListProvider>
      </ErrorBoundary>
    </NetworkErrorBoundry>
  );
}
