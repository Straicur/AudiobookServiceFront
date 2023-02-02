import React, { useState } from "react";
import { useTokenStore } from "../../store";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../Errors/ErrorHandlerModal";
import InfoContainer from "./components/InfoContainer";

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
        setInfoState({
          ...infoState,
          error: null,
        });
      }}
    >
      <InfoContainer
        infoState={infoState}
        setInfoState={setInfoState}
        token={token}
      />
    </ErrorBoundary>
  );
}
