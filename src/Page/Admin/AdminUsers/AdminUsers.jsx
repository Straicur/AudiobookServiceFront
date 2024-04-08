import React, { useState } from 'react';
import { useTokenStore } from 'Store/store';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import AdminUsersList from 'View/Admin/AdminUsers/AdminUsersList';
import { AdminUsersListPrivider } from 'Providers/Admin/AdminUsersListPrivider';
import { useTranslation } from 'react-i18next';
import { AdminSystemRolesProvider } from 'Providers/Admin/AdminSystemRolesProvider';
import './AdminUsers.css';

export default function AdminUsers() {
  const { t, i18n } = useTranslation();
  const token = useTokenStore((state) => state.token);

  const [usersState, setUsersState] = useState({
    page: 0,
    refresh: false,
    error: null,
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

  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerModal}
      onReset={() => {
        setUsersState((prev) => ({
          ...prev,
          error: null,
        }));
      }}
    >
      <AdminUsersListPrivider
        token={token}
        page={usersState.page}
        searchState={searchState}
        setState={setUsersState}
        i18n={i18n}
      >
        <AdminSystemRolesProvider
          token={token}
          page={usersState.page}
          setState={setUsersState}
          i18n={i18n}
        >
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
      </AdminUsersListPrivider>
    </ErrorBoundary>
  );
}
