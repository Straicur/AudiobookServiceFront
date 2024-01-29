import React, { useEffect, useState } from 'react';
import { AdminNavBar } from 'AdminNavBar/AdminNavBar';
import { useQuery } from 'react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import AdminJsonModal from 'AdminJsonModal/AdminJsonModal';
import AudiobookCommentsModal from 'AdminCategory/AudiobookCommentsModal';
import AdminAudiobooksAudiobookAddModal from './AdminAudiobooksAudiobookAddModal';
import AdminAudiobooksRenderList from './AdminAudiobooksRenderList';
import AdminRenderPageSwitches from 'Common/AdminRenderPageSwitches';
import AdminAudiobooksSearchOffCanvas from './AdminAudiobooksSearchOffCanvas';
import { useCategoryListStore } from 'Store/store';

export default function AdminAudiobooksList(props) {
  const { t, i18n } = useTranslation();

  const categoriesStore = useCategoryListStore();

  const categories = useCategoryListStore((state) => state.categories);
  const dateUpdate = useCategoryListStore((state) => state.dateUpdate);

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

  const [searchState, setSearchState] = useState({
    sort: 0,
    categories: [],
    title: '',
    author: '',
    album: '',
    parts: 0,
    age: 0,
    year: 0,
    duration: 0,
  });

  const [pageState, setPageState] = useState({
    page: 0,
    limit: 15,
    maxPage: 0,
  });

  const [categoriesState, setCategories] = useState([]);

  const resetSearchStates = () => {
    setSearchState({
      sort: 0,
      categories: [],
      title: '',
      author: '',
      album: '',
      parts: 0,
      age: 0,
      year: 0,
      duration: 0,
    });
  };

  const createSearchData = () => {
    let searchJson = {};

    if (searchState.sort != 0) {
      searchJson.order = parseInt(searchState.sort);
    }
    if (searchState.categories.length != 0) {
      searchJson.categories = searchState.categories;
    }
    if (searchState.title != '') {
      searchJson.title = searchState.title;
    }
    if (searchState.author != '') {
      searchJson.author = searchState.author;
    }
    if (searchState.album != '') {
      searchJson.album = searchState.album;
    }
    if (searchState.parts != 0) {
      searchJson.parts = parseInt(searchState.parts);
    }
    if (searchState.age != 0) {
      searchJson.age = parseInt(searchState.age);
    }
    if (searchState.year != 0) {
      let date = new Date(searchState.year);
      searchJson.year = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
    }
    if (searchState.duration != 0) {
      searchJson.duration = parseInt(searchState.duration);
    }

    return searchJson;
  };

  const { refetch } = useQuery(
    'data',
    () =>
      HandleFetch(
        '/admin/audiobooks',
        'POST',
        {
          page: pageState.page,
          limit: pageState.limit,
          searchData: createSearchData(),
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
        setState({ ...state, json: data });
        setPageState({ ...pageState, maxPage: data.maxPage });
      },
    },
  );

  const fetchCategoriesList = () => {
    if (dateUpdate > Date.now() && dateUpdate != 0) {
      setCategories(categories);
    } else {
      HandleFetch('/admin/categories', 'GET', null, props.token, i18n.language)
        .then((data) => {
          categoriesStore.removeCategories();
          for (const category of data.categories) {
            categoriesStore.addCategory(category);
          }

          setCategories(data.categories);
        })
        .catch((e) => {
          props.setAudiobooksState({
            ...props.audiobooksState,
            error: e,
          });
        });
    }
  };

  const openAddModal = () => {
    fetchCategoriesList();

    setState({
      ...state,
      addAudiobookModal: !state.addAudiobookModal,
    });
  };

  const openSearchModal = () => {
    fetchCategoriesList();

    setState({
      ...state,
      searchModal: !state.searchModal,
    });
  };

  useEffect(() => {
    if (state.refresh) {
      setState({ ...state, refresh: !state.refresh });
      refetch();
    }
  }, [state.refresh]);

  useEffect(() => {
    if (state.addAudiobook) {
      setState({ ...state, addAudiobook: !state.addAudiobook });

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
        <AdminNavBar />
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
            t={t}
            i18n={i18n}
            token={props.token}
            pageState={pageState}
            setPageState={setPageState}
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
              onClick={() => setState({ ...state, jsonModal: !state.jsonModal })}
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
            t={t}
            i18n={i18n}
            token={props.token}
            categoriesState={categoriesState}
            setCategories={setCategories}
            resetSearchStates={resetSearchStates}
          />
        ) : null}

        {state.searchModal && categoriesState.length != 0 ? (
          <AdminAudiobooksSearchOffCanvas
            state={state}
            setState={setState}
            audiobooksState={props.audiobooksState}
            setAudiobooksState={props.setAudiobooksState}
            searchState={searchState}
            setSearchState={setSearchState}
            t={t}
            i18n={i18n}
            token={props.token}
            categoriesState={categoriesState}
            setCategories={setCategories}
            pageState={pageState}
            setPageState={setPageState}
            resetSearchStates={resetSearchStates}
          />
        ) : null}
        {state.detailCommentsAudiobookModal && state.detailAudiobookElement != null ? (
          <AudiobookCommentsModal
            state={state}
            setState={setState}
            t={t}
            i18n={i18n}
            token={props.token}
            audiobooksState={props.audiobooksState}
            setAudiobooksState={props.setAudiobooksState}
          />
        ) : null}
        {state.jsonModal ? <AdminJsonModal state={state} setState={setState} t={t} /> : null}
      </div>
    </div>
  );
}
