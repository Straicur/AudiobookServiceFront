import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTokenStore } from 'Store/store';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import UserNavBarPrividers from 'View/User/UserNavBar/UserNavBarPrividers';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import UserMyListGet from 'View/User/UserMyList/UserMyListGet';
import { UserFooter } from 'View/User/Common/UserFooter';
import UserMyListAudiobookDetailProviders from 'View/User/UserMyList/UserMyListAudiobookDetailProviders';
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
            <UserNavBarPrividers token={token} />
            <UserMyListGet
              myListState={myListState}
              setMyListState={setMyListState}
              token={token}
              t={t}
              i18n={i18n}
            />
            {myListState.detailModal &&
            myListState.detailModalAudiobook != null &&
            myListState.detailModalCategory != null ? (
              <UserMyListAudiobookDetailProviders
                state={myListState}
                setState={setMyListState}
                token={token}
                t={t}
                i18n={i18n}
              />
            ) : null}
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
