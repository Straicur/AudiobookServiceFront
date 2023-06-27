import React, { useState } from "react";
import { useTokenStore } from "../../store";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../Errors/ErrorHandlerModal";
import AuidobookDetailProviders from "./Components/Audiobook/AuidobookDetailProviders";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Audiobook.css";

export default function Audiobook() {
  const token = useTokenStore((state) => state.token);
  const { t, i18n } = useTranslation();

  const { audiobookId } = useParams();

  const [audiobookState, setAudiobookState] = useState({
    file: null,
    edit: false,
    deleteFromCategory: false,
    deleteEntarly: false,
    addCategoriesModal: false,
    reAddingModal: false,
    reAdding: false,
    refresh: false,
    addAudiobookSeconds: 3000,
    part: 0,
    errorPart: "",
    errorCover: "",
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
        t={t}
        i18n={i18n}
      />
    </ErrorBoundary>
  );
}
