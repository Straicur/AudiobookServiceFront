import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import UserNavBarPrividers from 'View/User/UserNavBar/UserNavBarPrividers';
import { useTokenStore } from 'Store/store';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import { useTranslation } from 'react-i18next';
import UserMainGetAudiobooksProviders from 'View/User/UserMain/UserMainGetAudiobooksProviders';
import UserMainAudiobookDetailProviders from 'View/User/UserMain/UserMainAudiobookDetailProviders';
import { UserAudiobookInfoProvider } from 'Providers/User/UserAudiobookInfoProvider';
import UserMainSearchAudiobooks from 'View/User/UserMain/UserMainSearchAudiobooks';
import UserMainRenderAudiobookSearch from 'View/User/UserMain/UserMainRenderAudiobookSearch';
import { UserFooter } from 'View/User/Common/UserFooter';
import './UserMain.css';

export default function Main() {
  const { t, i18n } = useTranslation();

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
    searchText: '',
    error: null,
  });

  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerModal}
      onReset={() => {
        setAudiobooksState((prev) => ({
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
            {/* Tu do poprawy jest UserNavBar też */}
            <UserMainSearchAudiobooks
              audiobooksState={audiobooksState}
              setAudiobooksState={setAudiobooksState}
              token={token}
              t={t}
              i18n={i18n}
            />
            {/* Tu w obu przerób najpierw pobieranie coverów */}
            {audiobooksState.search ? (
              <UserMainRenderAudiobookSearch
                audiobooksState={audiobooksState}
                setAudiobooksState={setAudiobooksState}
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
              <UserAudiobookInfoProvider
                state={audiobooksState}
                setState={setAudiobooksState}
                token={token}
                audiobookId={audiobooksState.detailModalAudiobook.id}
                categoryKey={audiobooksState.detailModalCategory.categoryKey}
                i18n={i18n}
              >
                <UserMainAudiobookDetailProviders
                  state={audiobooksState}
                  setState={setAudiobooksState}
                  token={token}
                  t={t}
                  i18n={i18n}
                />
              </UserAudiobookInfoProvider>
            ) : null}
          </div>
        </div>
        <UserFooter />
      </HelmetProvider>
    </ErrorBoundary>
  );
}
