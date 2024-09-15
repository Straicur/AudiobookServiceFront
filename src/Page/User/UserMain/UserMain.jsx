import React, { useState, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import UserNavBarPrividers from 'View/User/UserNavBar/UserNavBarPrividers';
import { useTokenStore } from 'Store/store';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import { useTranslation } from 'react-i18next';
import UserMainGetAudiobooksProviders from 'View/User/UserMain/UserMainGetAudiobooksProviders';
import UserMainAudiobookDetailProviders from 'View/User/UserMain/UserMainAudiobookDetailProviders';
import UserMainSearchAudiobooks from 'View/User/UserMain/UserMainSearchAudiobooks';
import UserMainRenderAudiobookSearch from 'View/User/UserMain/UserMainRenderAudiobookSearch';
import { NetworkErrorBoundry } from 'Errors/NetworkErrorBoundry';
import { NetworkErrorBoundryModal } from 'Errors/NetworkErrorBoundryModal';
import { UserFooter } from 'View/User/Common/UserFooter';
import './UserMain.css';

export default function UserMain() {
  const { t, i18n } = useTranslation();

  const token = useTokenStore((state) => state.token);

  const [audiobooksState, setAudiobooksState] = useState({
    page: 0,
    limit: 3,
    refresh: false,
    detailModal: false,
    reportDescModal: false,
    reportCommentId: null,
    detailModalAudiobook: null,
    detailModalCover: null,
    detailModalCategory: null,
    search: false,
    searching: false,
    searchText: '',
    categoryKey: '',
  });

  const searchAllowed = useRef(true);

  return (
    <NetworkErrorBoundry FallbackComponent={NetworkErrorBoundryModal}>
      <ErrorBoundary
        FallbackComponent={ErrorHandlerModal}
        onReset={() => {
          setAudiobooksState((prev) => ({
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
              <UserNavBarPrividers token={token} t={t} i18n={i18n} />
              <hr className='text-white line' />
              <UserMainSearchAudiobooks
                audiobooksState={audiobooksState}
                setAudiobooksState={setAudiobooksState}
                token={token}
                t={t}
                i18n={i18n}
                searchAllowed={searchAllowed}
              />
              {audiobooksState.search ? (
                <UserMainRenderAudiobookSearch
                  audiobooksState={audiobooksState}
                  setAudiobooksState={setAudiobooksState}
                  serchAllowed={searchAllowed.current}
                  token={token}
                  t={t}
                  i18n={i18n}
                />
              ) : (
                <UserMainGetAudiobooksProviders
                  audiobooksState={audiobooksState}
                  setAudiobooksState={setAudiobooksState}
                  token={token}
                  t={t}
                  i18n={i18n}
                />
              )}
              {audiobooksState.detailModal &&
              audiobooksState.detailModalAudiobook != null &&
              audiobooksState.detailModalCategory != null ? (
                <UserMainAudiobookDetailProviders
                  state={audiobooksState}
                  setState={setAudiobooksState}
                  token={token}
                  t={t}
                  i18n={i18n}
                />
              ) : null}
            </div>
          </div>
          <UserFooter />
        </HelmetProvider>
      </ErrorBoundary>
    </NetworkErrorBoundry>
  );
}
