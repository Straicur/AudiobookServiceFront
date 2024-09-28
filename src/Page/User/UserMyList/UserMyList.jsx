import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTokenStore } from 'Store/store';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import UserNavBarProviders from '../../../View/User/UserNavBar/UserNavBarProviders';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import UserMyListGet from 'View/User/UserMyList/UserMyListGet';
import { UserFooter } from 'View/User/Common/UserFooter';
import UserMyListAudiobookDetailProviders from 'View/User/UserMyList/UserMyListAudiobookDetailProviders';
import { NetworkErrorBoundry } from 'Errors/NetworkErrorBoundry';
import { NetworkErrorBoundryModal } from 'Errors/NetworkErrorBoundryModal';
import './UserMyList.css';

export default function UserMyList() {
  const { t, i18n } = useTranslation();

  const token = useTokenStore((state) => state.token);

  const [myListState, setMyListState] = useState({
    detailModal: false,
    reportDescModal: false,
    reportCommentId: null,
    detailModalAudiobook: null,
    detailModalCover: null,
    detailModalCategory: null,
  });

  return (
    <NetworkErrorBoundry FallbackComponent={NetworkErrorBoundryModal}>
      <ErrorBoundary
        FallbackComponent={ErrorHandlerModal}
        onReset={() => {
          setMyListState((prev) => ({
            ...prev,
            detailModal: false,
            detailModalAudiobook: null,
            detailModalCover: null,
          }));
        }}
      >
        <HelmetProvider>
          <Helmet>
            <style>{'body { background-color: black; }'}</style>
          </Helmet>
          <div className='container-fluid main-container mt-3'>
            <div className='card position-relative p-3 bg-dark shadow'>
              <UserNavBarProviders token={token} t={t} i18n={i18n} />
              <hr className='text-white line' />
              <div className='row text-white'>
                <div className='fw-bold fs-1 ms-3 mt-2'>
                  <h1> {t('myList')}</h1>
                </div>
              </div>
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
    </NetworkErrorBoundry>
  );
}
