import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTokenStore } from 'Store/store';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { UserNavBar } from 'View/User/UserNavBar/UserNavBar';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import UserMyListGet from 'View/User/UserMyList/UserMyListGet';
import { UserFooter } from 'View/User/Common/UserFooter';
import './UserMyList.css';

export default function MyList() {
  const { t, i18n } = useTranslation();

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
        setMyListState((prev) => ({
          ...prev,
          detailModal: false,
          detailModalAudiobook: null,
          detailModalCover: null,
          error: null,
        }));
      }}
    >
      <HelmetProvider>
        <Helmet>
          <style>{'body { background-color: black; }'}</style>
        </Helmet>
        <div className='container-fluid main-container mt-3'>
          <div className='card position-relative p-3 bg-dark shadow'>
            <UserNavBar />
            <UserMyListGet
              myListState={myListState}
              setMyListState={setMyListState}
              token={token}
              t={t}
              i18n={i18n}
            />
            <div className='p-5'>
              <div className='p-3'></div>
            </div>
          </div>
        </div>
        <UserFooter />
      </HelmetProvider>
    </ErrorBoundary>
  );
}
