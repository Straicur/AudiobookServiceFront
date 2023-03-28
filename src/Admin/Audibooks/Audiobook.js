import React, { useState } from "react";
import { useTokenStore } from "../../store";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../Errors/ErrorHandlerModal";
// import AudiobooksList from "./Components/AudiobooksList";

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
      {/* <AudiobookDetail
        audiobooksState={audiobooksState}
        setAudiobooksState={setAudiobooksState}
        token={token}
      /> */}
    </ErrorBoundary>
  );
}