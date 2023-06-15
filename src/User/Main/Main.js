import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { UserNavBar } from "../../Components/NavBars/UserNavBar";
import { useTokenStore } from "../../store";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../Errors/ErrorHandlerModal";
import { useTranslation } from "react-i18next";
import GetAudiobooksProviders from "./Components/GetAudiobooksProviders";
import AudiobookDetailProviders from "./Components/AudiobookDetailProviders";
import SearchAudiobooks from "./Components/SearchAudiobooks";
import RenderAudiobookSearch from "./Components/RenderAudiobookSearch";
import { Footer } from "../../Components/Footers/Footer";
import "./Main.css";

export default function Main() {
  const { t } = useTranslation();
  //todo tu jest do poprawy te przesuwanie które czasami występuje od razu po odświerzeniu 
  const token = useTokenStore((state) => state.token);

  const [audiobooksState, setAudiobooksState] = useState({
    page: 0,
    limit: 10,
    detailModal: false,
    detailModalAudiobook: null,
    detailModalCover: null,
    detailModalCategory: null,
    search: false,
    searching: false,
    wasSearch: false,
    searchText: "",
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
      <HelmetProvider>
        <Helmet>
          <style>{"body { background-color: black; }"}</style>
        </Helmet>

        <div className="container-fluid main-container mt-3">
          <div className="card position-relative p-3 bg-dark shadow">
            <UserNavBar />
            <SearchAudiobooks
              audiobooksState={audiobooksState}
              setAudiobooksState={setAudiobooksState}
              token={token}
              t={t}
            />
            {audiobooksState.search ? (
              <RenderAudiobookSearch
                audiobooksState={audiobooksState}
                setAudiobooksState={setAudiobooksState}
                token={token}
                t={t}
              />
            ) : (
              <GetAudiobooksProviders
                audiobooksState={audiobooksState}
                setAudiobooksState={setAudiobooksState}
                token={token}
                t={t}
              />
            )}

            {audiobooksState.detailModal &&
            audiobooksState.detailModalAudiobook != null &&
            audiobooksState.detailModalCover != null &&
            audiobooksState.detailModalCategory != null ? (
              <AudiobookDetailProviders
                state={audiobooksState}
                setState={setAudiobooksState}
                token={token}
                t={t}
              />
            ) : null}

            <div className="p-5">
              <div className="p-3"></div>
            </div>
          </div>
        </div>
        <Footer/>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
