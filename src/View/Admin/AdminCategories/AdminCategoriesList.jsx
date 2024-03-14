import React, { useEffect, useState } from 'react';
import AdminNavBarProviders from '../AdminNavBar/AdminNavBarProviders';
import Button from 'react-bootstrap/Button';
import { useCategoryTreeListStore } from 'Store/store';
import AdminCategoriesRenderList from './AdminCategoriesRenderList';
import AdminJsonModal from '../AdminJsonModal/AdminJsonModal';
import AdminCategoriesAddModal from './AdminCategoriesAddModal';
import AdminCategoriesEditModal from './AdminCategoriesEditModal';
import { useAdminCategoriesTree } from 'Providers/Admin/AdminCategoriesTreeProvider';

export default function AdminCategoriesList(props) {
  const [state, setState] = useState({
    jsonModal: false,
    json: null,
    addCategoryModal: false,
    addCategoryParent: null,
    editCategoryModal: false,
    editCategoryElement: null,
    refresh: false,
    error: null,
  });

  // const categoriesStore = useCategoryTreeListStore();

  const categories = useCategoryTreeListStore((state) => state.categories);
  const dateUpdate = useCategoryTreeListStore((state) => state.dateUpdate);

  const [categoriesData] = useAdminCategoriesTree();

  const getCategories = () => {
    if (dateUpdate < Date.now()) {
      //TODO tu teraz podmieniam dane kategorii w store
      return categoriesData.categories;
    }

    return categories;
  };

  // const fetchCategories = () => {
  //   HandleFetch('/admin/categories/tree', 'GET', null, props.token, props.i18n.language)
  //     .then((data) => {
  //       setState((prev) => ({
  //         ...prev,
  //         json: data.categories,
  //       }));

  //       categoriesStore.removeCategories();

  //       for (const category of data.categories) {
  //         categoriesStore.addCategory(category);
  //       }
  //       if (state.refresh) {
  //         setState((prev) => ({
  //           ...prev,
  //           refresh: !state.refresh,
  //         }));
  //       }
  //     })
  //     .catch((e) => {
  //       props.setCategoiesState((prev) => ({
  //         ...prev,
  //         error: e,
  //       }));
  //     });
  // };

  // useEffect(() => {
  //   setState((prev) => ({
  //     ...prev,
  //     json: categories,
  //   }));

  //   if (dateUpdate < Date.now() || state.refresh) {
  //     fetchCategories();
  //   }
  // }, []);

  // useEffect(() => {
  //   if (state.refresh) {
  //     fetchCategories();
  //   }
  // }, [state.refresh]);

  useEffect(() => {
    if (props.categoiesState.error != null) {
      throw props.categoiesState.error;
    }
  }, [props.categoiesState.error]);

  return (
    <div className='container-fluid main-container mt-3'>
      <div className='card position-relative p-3 mb-5  shadow'>
        <AdminNavBarProviders token={props.token} />
        <hr className='line' />
        <div className='table-title my-2'>
          <h1>{props.t('categories')}</h1>
        </div>
        <AdminCategoriesRenderList
          state={state}
          setState={setState}
          categories={getCategories()}
          categoriesState={props.categoriesState}
          setCategoriesState={props.setCategoiesState}
          t={props.t}
        />
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
                  addCategoryModal: !state.addCategoryModal,
                }))
              }
            >
              {props.t('addMainCategory')}
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
              {props.t('jsonData')}
            </Button>
          </div>
          {state.jsonModal ? (
            <AdminJsonModal state={state} setState={setState} t={props.t} />
          ) : null}
          {state.editCategoryModal && state.editCategoryElement != null ? (
            <AdminCategoriesEditModal
              state={state}
              setState={setState}
              t={props.t}
              i18n={props.i18n}
              token={props.token}
            />
          ) : null}
          {state.addCategoryModal ? (
            <AdminCategoriesAddModal
              state={state}
              setState={setState}
              t={props.t}
              i18n={props.i18n}
              token={props.token}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
