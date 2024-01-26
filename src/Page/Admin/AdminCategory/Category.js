import React, { useState } from "react";
import { useTokenStore } from "../../../Store/store";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../../Errors/ErrorHandlerModal";
import AudiobooksList from "../../../View/Admin/AdminCategory/AudiobooksList";
import { useParams } from "react-router-dom";
import "./Category.css";

export default function Category() {
  const token = useTokenStore((state) => state.token);

  const { categoryKey } = useParams();

  const [audiobooksState, setAudiobooksState] = useState({
    errorPart: "",
    errorCover: "",
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
