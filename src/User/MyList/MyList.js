import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTokenStore } from "../../store";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { UserNavBar } from "../../Components/NavBars/UserNavBar";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../Errors/ErrorHandlerModal";
import GetMyList from "./Components/GetMyList";
import AudiobookDetailProviders from "./Components/AudiobookDetailProviders";
import { AudiobookMyListProvider } from "../../../Components/Providers/AudiobookProviders/AudiobookMyListProvider";
import "./MyList.css";

export default function MyList() {
  const { t } = useTranslation();

  const token = useTokenStore((state) => state.token);

  const [myListState, setMyListState] = useState({
    detailModal: false,
    detailModalAudiobook: null,
    detailModalCover: null,
    detailModalCategory: null,
    error: null,
  });

  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerModal}
      onReset={() => {
        setMyListState({
          ...myListState,
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
            {/* Sprawdź czy działa takie rozwiązanie bo muszę jakoś edytować tą listę w detalach przy odkliknięciu z mojej listy i to są dwie ostatnie rzeczy z 
            tego zagadnienia  */}
            <AudiobookMyListProvider
              state={props.myListState}
              setState={props.setMyListState}
              token={props.token}
            >
              <GetMyList
                myListState={myListState}
                setMyListState={setMyListState}
                token={token}
                t={t}
              />
              {myListState.detailModal &&
              myListState.detailModalAudiobook != null &&
              myListState.detailModalCover != null &&
              myListState.detailModalCategory != null ? (
                <AudiobookDetailProviders
                  state={myListState}
                  setState={setMyListState}
                  token={token}
                  t={t}
                />
              ) : null}
            </AudiobookMyListProvider>
            <div className="p-5">
              <div className="p-3"></div>
            </div>
          </div>
        </div>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
