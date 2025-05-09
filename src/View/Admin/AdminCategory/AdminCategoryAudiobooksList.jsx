import React, { useEffect, useState } from 'react';
import AdminNavBarProviders from '../AdminNavBar/AdminNavBarProviders';
import Button from 'react-bootstrap/Button';
import AdminJsonModal from '../AdminJsonModal/AdminJsonModal';
import AdminCategoryAudiobookAddModal from './AdminCategoryAudiobookAddModal';
import AdminCategoryRenderAudiobooksList from './AdminCategoryRenderAudiobooksList';
import AdminCategoryDetailProviders from './AdminCategoryDetailProviders';
import AudiobookCommentsModal from '../Common/AudiobookCommentsModal';
import AdminRenderPageSwitches from '../Common/AdminRenderPageSwitches';
import { AdminAudiobookCommentsProvider } from 'Providers/Admin/AdminAudiobookCommentsProvider';
import { useAdminCategoryDetail } from '../../../Providers/Admin/AdminCategoryDetailProvider';
import { useAdminCategoryAudiobooks } from 'Providers/Admin/AdminCategoryAudiobooksProvider';

export default function AdminCategoryAudiobooksList(props) {
  const [state, setState] = useState({
    jsonModal: false,
    category: null,
    addAudiobookModal: false,
    addAudiobookParent: null,
    detailAudiobookModal: false,
    detailAudiobookElement: null,
    detailCommentsAudiobookModal: false,
    part: 0,
    addAudiobook: false,
    addAudiobookSeconds: 3000,
  });

  const [categoryDetail] = useAdminCategoryDetail();

  const [
    categoryAudiobooks,
    refetchAudiobooks,
    activate,
    deleteAudiobook,
    deleteAudiobookFromCategory,
    addAudiobook,
  ] = useAdminCategoryAudiobooks();

  useEffect(() => {
    if (state.addAudiobook) {
      setState((prev) => ({
        ...prev,
        addAudiobook: !state.addAudiobook,
      }));

      setTimeout(function () {
        refetchAudiobooks();
      }, state.addAudiobookSeconds);
    }
  }, [state.addAudiobook]);

  return (
    <div className='container-fluid main-container mt-3'>
      <div className='card position-relative p-3 mb-5  shadow'>
        <AdminNavBarProviders token={props.token} t={props.t} i18n={props.i18n} />
        <hr className='line' />
        <div className='table-title my-2'>
          <h1 className='my-2'>{categoryDetail === null ? null : categoryDetail.name}</h1>
          <AdminCategoryRenderAudiobooksList
            state={state}
            setState={setState}
            setAudiobooksState={props.setAudiobooksState}
            audiobooksState={props.audiobooksState}
            categoryAudiobooks={categoryAudiobooks}
            activate={activate}
            t={props.t}
            i18n={props.i18n}
            token={props.token}
          />
          {categoryAudiobooks !== null &&
          categoryAudiobooks !== undefined &&
          categoryAudiobooks.maxPage > 1 ? (
            <AdminRenderPageSwitches
              page={props.audiobooksState.page}
              maxPage={categoryAudiobooks.maxPage}
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
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  addAudiobookModal: !state.addAudiobookModal,
                }))
              }
            >
              {props.t('addAudiobook')}
            </Button>
          </div>
          <div className='col-3 d-flex justify-content-center'>
            <Button
              variant='dark'
              size='lg'
              color='dark'
              className=' btn button mt-2'
              onClick={() => setState({ ...state, jsonModal: !state.jsonModal })}
            >
              {props.t('jsonData')}
            </Button>
          </div>
        </div>
        {state.addAudiobookModal ? (
          <AdminCategoryAudiobookAddModal
            state={state}
            setState={setState}
            t={props.t}
            i18n={props.i18n}
            token={props.token}
            categoryDetail={categoryDetail}
            addAudiobook={addAudiobook}
            setAudiobooksState={props.setAudiobooksState}
            audiobooksState={props.audiobooksState}
          />
        ) : null}
        {state.detailAudiobookModal && state.detailAudiobookElement != null ? (
          <AdminCategoryDetailProviders
            state={state}
            setState={setState}
            t={props.t}
            i18n={props.i18n}
            token={props.token}
            deleteAudiobook={deleteAudiobook}
            deleteAudiobookFromCategory={deleteAudiobookFromCategory}
            categoryDetail={categoryDetail}
            categoryKey={props.categoryKey}
            setAudiobooksState={props.setAudiobooksState}
            audiobooksState={props.audiobooksState}
          />
        ) : null}
        {state.detailCommentsAudiobookModal && state.detailAudiobookElement != null ? (
          <AdminAudiobookCommentsProvider
            token={props.token}
            audiobookId={state.detailAudiobookElement.id}
            t={props.t}
            i18n={props.i18n}
          >
            <AudiobookCommentsModal
              state={state}
              setState={setState}
              t={props.t}
              i18n={props.i18n}
              token={props.token}
              setAudiobooksState={props.setAudiobooksState}
              audiobooksState={props.audiobooksState}
            />
          </AdminAudiobookCommentsProvider>
        ) : null}
        {state.jsonModal ? (
          <AdminJsonModal state={state} setState={setState} json={categoryAudiobooks} t={props.t} />
        ) : null}
      </div>
    </div>
  );
}
