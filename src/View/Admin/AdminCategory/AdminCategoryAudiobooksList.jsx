import React, { useEffect, useState } from 'react';
import AdminNavBarProviders from '../AdminNavBar/AdminNavBarProviders';

import Button from 'react-bootstrap/Button';
import AdminJsonModal from '../AdminJsonModal/AdminJsonModal';
import AdminCategoryAudiobookAddModal from './AdminCategoryAudiobookAddModal';
import AdminCategoryRenderAudiobooksList from './AdminCategoryRenderAudiobooksList';
import AdminCategoryDetailProviders from './AdminCategoryDetailProviders';
import AdminCategoryAudiobookCommentsModal from './AdminCategoryAudiobookCommentsModal';
import AdminRenderPageSwitches from '../Common/AdminRenderPageSwitches';
import { AdminAudiobookCommentsProvider } from 'Providers/Admin/AdminAudiobookCommentsProvider';
import { useAdminCategoryDetail } from 'Providers/Admin/AdminCategoryDetailProfider';
import { useAdminCategoryAudiobooks } from 'Providers/Admin/AdminCategoryAudiobooksProvider';

export default function AdminCategoryAudiobooksList(props) {
  const [state, setState] = useState({
    jsonModal: false,
    json: null,
    category: null,
    addAudiobookModal: false,
    addAudiobookParent: null,
    detailAudiobookModal: false,
    detailAudiobookElement: null,
    detailCommentsAudiobookModal: false,
    part: 0,
    addAudiobook: false,
    addAudiobookSeconds: 3000,
    refresh: false,
  });

  const [categoryDetail] = useAdminCategoryDetail();
  const [
    categoryAudiobooks,
    refetchAudiobooks,
    activate,
    deleteAudiobook,
    deleteAudiobookFromCategory,
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
          <h1>{state.category == null ? null : state.category.name}</h1>
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
          {categoryAudiobooks != undefined && categoryAudiobooks.maxPage > 1 ? (
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
            setState={props.setAudiobooksState}
            token={props.token}
            audiobookId={state.detailAudiobookElement.id}
            t={props.t}
            i18n={props.i18n}
          >
            <AdminCategoryAudiobookCommentsModal
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
