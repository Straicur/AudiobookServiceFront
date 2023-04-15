import React, { useState } from "react";
import { useTokenStore } from "../../store";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../Errors/ErrorHandlerModal";
import AudiobooksList from "./Components/Audiobooks/AudiobooksList";
import "./Audiobooks.css"

export default function Audiobooks() {
  const token = useTokenStore((state) => state.token);

  const [audiobooksState, setAudiobooksState] = useState({
    error: null,
  });

  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerModal}
      onReset={() => {
        setAudiobooksState({
          ...audiobooksState,
          error: null,
        });
      }}
    >
      <AudiobooksList
        audiobooksState={audiobooksState}
        setAudiobooksState={setAudiobooksState}
        token={token}
      />
    </ErrorBoundary>
  );
}
