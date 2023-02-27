import React, { useState } from "react";
import { useTokenStore } from "../../store";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../Errors/ErrorHandlerModal";
import AudiobooksList from "./Components/AudiobooksList";
import {useParams} from 'react-router-dom'

export default function Category() {
  
  const token = useTokenStore((state) => state.token);

  const { categoryKey } = useParams();

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
        categoryKey={categoryKey}
      />
    </ErrorBoundary>
  );
}
