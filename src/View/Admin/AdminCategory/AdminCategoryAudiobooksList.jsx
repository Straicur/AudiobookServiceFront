import React, { useEffect, useState } from 'react';
import { AdminNavBar } from 'AdminNavBar/AdminNavBar';
import { useQuery } from 'react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import AdminJsonModal from 'AdminJsonModal/AdminJsonModal';
import AdminCategoryAudiobookAddModal from 'Category/AdminCategoryAudiobookAddModal';
import AdminCategoryRenderAudiobooksList from 'Category/AdminCategoryRenderAudiobooksList';
import AdminCategoryDetailProviders from 'Category/AdminCategoryDetailProviders';
import AdminCategoryAudiobookCommentsModal from './AdminCategoryAudiobookCommentsModal';
import AdminRenderPageSwitches from 'Common/AdminRenderPageSwitches';

export default function AdminCategoryAudiobooksList(props) {
  const { t, i18n } = useTranslation();

  const [state, setState] = useState({
    jsonModal: false,
    json: null,
    category: null,
    addAudiobookModal: false,
    addAudiobookParent: null,
    detailAudiobookModal: false,
    detailAudiobookElement: null,
    detailCommentsAudiobookModal: false,
    detailAudiobookElementPart: 0,
    addAudiobook: false,
    addAudiobookSeconds: 3000,
    refresh: false,
  });

  const [pageState, setPageState] = useState({
    page: 0,
    limit: 15,
    maxPage: 0,
  });

  const {
    isLoading: isLoadingFirst,
    error: errorFirst,
    data: dataFirst,
    isFetching: isFetchingFirst,
    refetch: refetchFirst,
  } = useQuery(
    'dataFirst',
    () =>
      HandleFetch(
        '/admin/category/audiobooks',
        'POST',
        {
          categoryKey: props.categoryKey,
          page: pageState.page,
          limit: pageState.limit,
        },
        props.token,
        i18n.language,
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {
        props.setAudiobooksState({
          ...props.audiobooksState,
          error: e,
        });
      },
      onSuccess: (data) => {
        setState({ ...state, json: data.audiobooks });
        setPageState({ ...pageState, maxPage: data.maxPage });
      },
    },
  );

  const {
    isLoading: isLoadingSecond,
    error: errorSecond,
    data: dataSecond,
    isFetching: isFetchingSecond,
    refetch: refetchSecond,
  } = useQuery(
    'dataSecond',
    () =>
      HandleFetch(
        '/admin/category/detail',
        'POST',
        {
          categoryKey: props.categoryKey,
        },
        props.token,
        i18n.language,
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {
        props.setAudiobooksState({
          ...props.audiobooksState,
          error: e,
        });
      },
      onSuccess: (dataSecond) => {
        setState({
          ...state,
          category: {
            id: dataSecond.id,
            name: dataSecond.name,
            active: dataSecond.active,
            parentCategoryName: dataSecond.parentCategoryName,
            parentCategoryId: dataSecond.parentCategoryId,
          },
        });
      },
    },
  );

  useEffect(() => {
    if (state.addAudiobook) {
      setState({ ...state, addAudiobook: !state.addAudiobook });
      setTimeout(function () {
        refetchFirst();
      }, state.addAudiobookSeconds);
    }
  }, [state.addAudiobook]);

  useEffect(() => {
    if (state.refresh) {
      setState({ ...state, refresh: !state.refresh });
      refetchFirst();
    }
  }, [state.refresh]);

  useEffect(() => {
    if (props.audiobooksState.error != null) {
      throw props.audiobooksState.error;
    }
  }, [props.audiobooksState.error]);

  return (
    <div className='container-fluid main-container mt-3'>
      <div className='card position-relative p-3 mb-5  shadow'>
        <AdminNavBar />
        <hr className='line' />
        <div className='table-title my-2'>
          <h1>{state.category == null ? null : state.category.name}</h1>
          <AdminCategoryRenderAudiobooksList
            state={state}
            setState={setState}
            setAudiobooksState={props.setAudiobooksState}
            audiobooksState={props.audiobooksState}
            t={t}
            i18n={i18n}
            token={props.token}
          />
          {state.json != null && pageState.maxPage > 1 ? (
            <AdminRenderPageSwitches
              state={state}
              setState={setState}
              pageState={pageState}
              setPageState={setPageState}
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
                setState({
                  ...state,
                  addAudiobookModal: !state.addAudiobookModal,
                })
              }
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
              onClick={() => setState({ ...state, jsonModal: !state.jsonModal })}
            >
              {t('jsonData')}
            </Button>
          </div>
        </div>
        {state.addAudiobookModal ? (
          <AdminCategoryAudiobookAddModal
            state={state}
            setState={setState}
            t={t}
            i18n={i18n}
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
            t={t}
            i18n={i18n}
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
            t={t}
            i18n={i18n}
            token={props.token}
            setAudiobooksState={props.setAudiobooksState}
            audiobooksState={props.audiobooksState}
          />
        ) : null}
        {state.jsonModal ? <AdminJsonModal state={state} setState={setState} t={t} /> : null}
      </div>
    </div>
  );
}
