import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTokenStore } from "../../store";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { UserNavBar } from "../../Components/NavBars/UserNavBar";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../Errors/ErrorHandlerModal";
import GetMyList from "./Components/GetMyList";
import "./MyList.css";

export default function MyList() {
  const { t } = useTranslation();

  const token = useTokenStore((state) => state.token);

  const [myListState, setMyListState] = useState({
    page: 0,
    limit: 10,
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
            <GetMyList
              myListState={myListState}
              setMyListState={setMyListState}
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
