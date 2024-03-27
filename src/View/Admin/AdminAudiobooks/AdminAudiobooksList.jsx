import React, { useEffect, useState } from 'react';
import AdminNavBarProviders from '../AdminNavBar/AdminNavBarProviders';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import AdminJsonModal from '../AdminJsonModal/AdminJsonModal';
import AudiobookCommentsModal from '../Common/AudiobookCommentsModal';
import AdminAudiobooksAudiobookAddModal from './AdminAudiobooksAudiobookAddModal';
import { AdminAudiobookCommentsProvider } from 'Providers/Admin/AdminAudiobookCommentsProvider';
import AdminAudiobooksRenderList from './AdminAudiobooksRenderList';
import AdminRenderPageSwitches from '../Common/AdminRenderPageSwitches';
import AdminAudiobooksSearchOffCanvas from './AdminAudiobooksSearchOffCanvas';
import { useAdminAudiobooksData } from 'Providers/Admin/AdminAudiobooksProvider';
import { useAdminCategoriesListData } from 'Providers/Admin/AdminCategoriesListProvider';

export default function AdminAudiobooksList(props) {
  const { t, i18n } = useTranslation();

  const [state, setState] = useState({
    jsonModal: false,
    json: null,
    addAudiobookModal: false,
    addAudiobookParent: null,
    detailCommentsAudiobookModal: false,
    detailAudiobookElement: null,
    searchModal: false,
    refresh: false,
    addAudiobook: false,
    addAudiobookSeconds: 3000,
    error: null,
  });

  const [categoriesState, setCategories] = useState([]);

  const [audiobooks, refetch] = useAdminAudiobooksData();
  const [categories] = useAdminCategoriesListData();

  const openAddModal = () => {
    this.setState((prev) => ({
      ...prev,
      addAudiobookModal: !this.state.addAudiobookModal,
    }));
  };

  const openSearchModal = () => {
    this.setState((prev) => ({
      ...prev,
      searchModal: !this.state.searchModal,
    }));
  };

  useEffect(() => {
    if (state.addAudiobook) {
      setState((prev) => ({
        ...prev,
        addAudiobook: !state.addAudiobook,
      }));

      setTimeout(function () {
        refetch();
      }, state.addAudiobookSeconds);
    }
  }, [state.addAudiobook]);

  useEffect(() => {
    if (props.audiobooksState.error != null) {
      throw props.audiobooksState.error;
    }
  }, [props.audiobooksState.error]);

  return (
    <div className='container-fluid main-container mt-3'>
      <div className='card position-relative p-3 mb-5  shadow'>
        <AdminNavBarProviders token={props.token} />
        <hr className='line' />
        <div className='table-title my-2'>
          <div className='d-flex justify-content-end '>
            <div className='p-2 bd-highlight'>
              <h2>{t('filters')}</h2>
            </div>
            <div className='p-2 bd-highlight'>
              <Button
                variant='dark'
                size='sm'
                color='dark'
                className=' btn button mt-2'
                onClick={() => openSearchModal()}
              >
                {t('search')}
              </Button>
            </div>
          </div>
          <AdminAudiobooksRenderList
            state={state}
            setState={setState}
            audiobooks={audiobooks}
            t={t}
            i18n={i18n}
            token={props.token}
          />
          {audiobooks != null && audiobooks.maxPage > 1 ? (
            <AdminRenderPageSwitches
              page={props.audiobooksState.page}
              maxPage={audiobooks.maxPage}
              setPageState={props.setAudiobooksState}
            />
          ) : null}
        </div>
        <div className='row justify-content-md-center'>
          <div className='col-3 d-flex justify-content-center'>
            <Button
              variant='dark'
              size='lg'
              color='dark'
              className=' btn button mt-2'
              onClick={() => openAddModal()}
            >
              {t('addAudiobook')}
            </Button>
          </div>
          <div className='col-3 d-flex justify-content-center'>
            <Button
              variant='dark'
              size='lg'
              color='dark'
              className=' btn button mt-2'
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  jsonModal: !state.jsonModal,
                }))
              }
            >
              {t('jsonData')}
            </Button>
          </div>
        </div>

        {state.addAudiobookModal && categoriesState.length != 0 ? (
          <AdminAudiobooksAudiobookAddModal
            state={state}
            setState={setState}
            audiobooksState={props.audiobooksState}
            setAudiobooksState={props.setAudiobooksState}
            categories={categories}
            t={t}
            i18n={i18n}
            token={props.token}
            categoriesState={categoriesState}
            setCategories={setCategories}
            resetSearchStates={props.adminService.resetSearchStates}
          />
        ) : null}

        {state.searchModal && categoriesState.length != 0 ? (
          <AdminAudiobooksSearchOffCanvas
            state={state}
            setState={setState}
            audiobooksState={props.audiobooksState}
            setAudiobooksState={props.setAudiobooksState}
            categories={categories}
            // searchState={searchState}
            // setSearchState={setSearchState}
            t={t}
            i18n={i18n}
            token={props.token}
            categoriesState={categoriesState}
            setCategories={setCategories}
            // pageState={pageState}
            // setPageState={setPageState}
            resetSearchStates={props.adminService.resetSearchStates}
          />
        ) : null}
        {state.detailCommentsAudiobookModal && state.detailAudiobookElement != null ? (
          <AdminAudiobookCommentsProvider
            setState={props.setAudiobooksState}
            token={props.token}
            audiobookId={state.detailAudiobookElement.id}
            t={props.t}
            i18n={props.i18n}
          >
            <AudiobookCommentsModal
              state={state}
              setState={setState}
              t={t}
              i18n={i18n}
              token={props.token}
              audiobooksState={props.audiobooksState}
              setAudiobooksState={props.setAudiobooksState}
            />
          </AdminAudiobookCommentsProvider>
        ) : null}
        {audiobooks !== null ? (
          <AdminJsonModal state={state} setState={setState} json={audiobooks} t={t} />
        ) : null}
      </div>
    </div>
  );
}
