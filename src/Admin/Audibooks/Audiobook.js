import React, { useState } from "react";
import { useTokenStore } from "../../store";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../Errors/ErrorHandlerModal";
import AudiobookDetail from "./Components/AudiobookDetail";

export default function Audiobook() {
  const token = useTokenStore((state) => state.token);

  const [audiobookState, setAudiobookState] = useState({
    error: null,
  });

  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerModal}
      onReset={() => {
        setAudiobookState({
          ...audiobookState,
          error: null,
        });
      }}
    >
      <AudiobookDetail
        audiobookState={audiobookState}
        setAudiobookState={setAudiobookState}
        token={token}
      />
    </ErrorBoundary>
  );
}