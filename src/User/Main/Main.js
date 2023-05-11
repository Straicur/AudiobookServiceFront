import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { UserNavBar } from "../../Components/NavBars/UserNavBar";
import { useTokenStore } from "../../store";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../Errors/ErrorHandlerModal";
import { useTranslation } from "react-i18next";
import GetAudiobooksProviders from "./Components/GetAudiobooksProviders";
import AudiobookDetailModal from "./Components/AudiobookDetailModal";
import {BottomScrollListener} from "react-bottom-scroll-listener";
import "./Main.css";

export default function Main() {
  const { t } = useTranslation();

  const token = useTokenStore((state) => state.token);

  const [audiobooksState, setAudiobooksState] = useState({
    page: 0,
    limit: 5,
    detailModal: false,
    detailModalAudiobook: null,
    error: null,
  });

  const handleScroll = () => {
    console.log(audiobooksState.page);
    // console.log(props.state.page)
    // if (audiobooksState.page + 1 <= audiobooks.maxPage) {
      setTimeout(() => {
      setAudiobooksState({
        ...audiobooksState,
        page: audiobooksState.page + 1,
      });
    }, 1000);
    // }
  };

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
          <div className="card position-relative p-3 mb-5  bg-dark shadow">
            <UserNavBar />
            <BottomScrollListener onBottom={handleScroll}>
            <div />
            </BottomScrollListener>
              <GetAudiobooksProviders
                audiobooksState={audiobooksState}
                setAudiobooksState={setAudiobooksState}
                token={token}
                t={t}
              />
         

            <AudiobookDetailModal
              audiobooksState={audiobooksState}
              setAudiobooksState={setAudiobooksState}
              token={token}
              t={t}
            />
            <div className="p-5">
              <div className="p-3"></div>
            </div>
          </div>
        </div>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
