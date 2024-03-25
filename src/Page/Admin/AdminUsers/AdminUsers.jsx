import React, { useState } from 'react';
import { useTokenStore } from 'Store/store';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import AdminUsersList from 'View/Admin/AdminUsers/AdminUsersList';
import './AdminUsers.css';

export default function AdminUsers() {
  const token = useTokenStore((state) => state.token);

  const [usersState, setUsersState] = useState({
    error: null,
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
      <AdminUsersList usersState={usersState} setUsersState={setUsersState} token={token} />
    </ErrorBoundary>
  );
}
