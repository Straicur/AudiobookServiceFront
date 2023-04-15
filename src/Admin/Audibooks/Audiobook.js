import React, { useState } from "react";
import { useTokenStore } from "../../store";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../Errors/ErrorHandlerModal";
import AuidobookDetailProviders from "./Components/AuidobookDetailProviders";
import { useParams } from "react-router-dom";
import "./Audiobook.css";

export default function Audiobook() {
  const token = useTokenStore((state) => state.token);

  const { audiobookId } = useParams();

  const [audiobookState, setAudiobookState] = useState({
    file: null,
    edit: false,
    deleteFromCategory: false,
    deleteEntarly: false,
    addCategoriesModal: false,
    reAddingModal: false,
    reAdding: false,
    part: 0,
    error: null,
  });
  //todo ttu mi zostaje do poprawy img który się nie odświerza i pobierany jest z cache. Musze dodać chachowanie w serwerze i też czekanie przy img
  // Żeby mi się za wcześnie nie odświerzał 
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
      <AuidobookDetailProviders
        audiobookState={audiobookState}
        setAudiobookState={setAudiobookState}
        audiobookId={audiobookId}
        token={token}
      />
    </ErrorBoundary>
  );
}
