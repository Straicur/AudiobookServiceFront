import React, { useEffect, useState } from 'react';
import AdminNavBarProviders from '../AdminNavBar/AdminNavBarProviders';

import Button from 'react-bootstrap/Button';
import AdminJsonModal from '../AdminJsonModal/AdminJsonModal';
import AdminCategoryAudiobookAddModal from './AdminCategoryAudiobookAddModal';
import AdminCategoryRenderAudiobooksList from './AdminCategoryRenderAudiobooksList';
import AdminCategoryDetailProviders from './AdminCategoryDetailProviders';
import AdminCategoryAudiobookCommentsModal from './AdminCategoryAudiobookCommentsModal';
import AdminRenderPageSwitches from '../Common/AdminRenderPageSwitches';
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

  const [categoryDetail] = useAdminCategoryDetail(); //refetchDetail
  const [categoryAudiobooks, refetchAudiobooks] = useAdminCategoryAudiobooks();

  // onSuccess: (data) => {
  //   setState((prev) => ({
  //     ...prev,
  //     json: data.audiobooks,
  //   }));
  //   setPageState((prev) => ({
  //     ...prev,
  //     maxPage: data.maxPage,
  //   }));

  //   setState((prev) => ({
  //     ...prev,
  //     category: {
  //       id: dataSecond.id,
  //       name: dataSecond.name,
  //       active: dataSecond.active,
  //       parentCategoryName: dataSecond.parentCategoryName,
  //       parentCategoryId: dataSecond.parentCategoryId,
  //     },

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
    if (props.audiobooksState.page != 0) {
      refetchAudiobooks();
    }
  }, [props.audiobooksState.page]);

  // useEffect(() => {
  //   if (state.refresh) {
  //     setState((prev) => ({
  //       ...prev,
  //       refresh: !state.refresh,
  //     }));
  //     // refetchFirst();
  //   }
  // }, [state.refresh]);
  console.log(categoryDetail);
  console.log(categoryAudiobooks);
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
            t={props.t}
            i18n={props.i18n}
            token={props.token}
          />
          {state.json != null && props.audiobooksState.maxPage > 1 ? (
            <AdminRenderPageSwitches
              pageState={props.audiobooksState}
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
            categoryID={state.category.id}
            parentCategoryId={
              state.category.parentCategoryId != null ? state.category.parentCategoryId : null
            }
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
            categoryKey={props.categoryKey}
            setAudiobooksState={props.setAudiobooksState}
            audiobooksState={props.audiobooksState}
          />
        ) : null}
        {state.detailCommentsAudiobookModal && state.detailAudiobookElement != null ? (
          <AdminCategoryAudiobookCommentsModal
            state={state}
            setState={setState}
            t={props.t}
            i18n={props.i18n}
            token={props.token}
            setAudiobooksState={props.setAudiobooksState}
            audiobooksState={props.audiobooksState}
          />
        ) : null}
        {state.jsonModal ? <AdminJsonModal state={state} setState={setState} t={props.t} /> : null}
      </div>
    </div>
  );
}
