import React, { useState } from "react";
import { useTokenStore } from "../../../Store/store";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../../Errors/ErrorHandlerModal";
import UsersList from "../../../View/Admin/AdminUsers/UsersList";
import "./Users.css";

export default function Users() {
  const token = useTokenStore((state) => state.token);

  const [usersState, setUsersState] = useState({
    error: null,
  });

  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerModal}
      onReset={() => {
        setUsersState({
          ...usersState,
          error: null,
        });
      }}
    >
      <UsersList
        usersState={usersState}
        setUsersState={setUsersState}
        token={token}
      />
    </ErrorBoundary>
  );
}
