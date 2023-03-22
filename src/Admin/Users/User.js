import React, { useState } from "react";
import { useTokenStore } from "../../store";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../Errors/ErrorHandlerModal";
// import AudiobooksList from "./Components/AudiobooksList";

export default function User() {
  const token = useTokenStore((state) => state.token);

  const [userState, setUserState] = useState({
    error: null,
  });

  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerModal}
      onReset={() => {
        setUserState({
          ...userState,
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