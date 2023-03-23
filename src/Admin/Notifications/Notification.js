import React, { useState } from "react";
import { useTokenStore } from "../../store";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../Errors/ErrorHandlerModal";
// import AudiobooksList from "./Components/AudiobooksList";

export default function Notification() {
  const token = useTokenStore((state) => state.token);

  const [notificationState, setNotificationState] = useState({
    error: null,
  });

  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerModal}
      onReset={() => {
        setNotificationState({
          ...notificationState,
          error: null,
        });
      }}
    >
      {/* <AudiobooksList
        audiobooksState={audiobooksState}
        setAudiobooksState={setAudiobooksState}
        token={token}
      /> */}
    </ErrorBoundary>
  );
}