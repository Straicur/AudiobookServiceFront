import React, { useEffect, useState } from 'react';
import AdminNavBarProviders from '../AdminNavBar/AdminNavBarProviders';
import Button from 'react-bootstrap/Button';
import AdminCategoriesRenderList from './AdminCategoriesRenderList';
import AdminJsonModal from '../AdminJsonModal/AdminJsonModal';
import AdminCategoriesAddModal from './AdminCategoriesAddModal';
import AdminCategoriesEditModal from './AdminCategoriesEditModal';
import { useAdminCategoriesTree } from 'Providers/Admin/AdminCategoriesTreeProvider';

export default function AdminCategoriesList(props) {
  const [state, setState] = useState({
    jsonModal: false,
    addCategoryModal: false,
    addCategoryParent: null,
    editCategoryModal: false,
    editCategoryElement: null,
    error: null,
  });

  const [categoriesData, refetch, categoryChange, categoryActivate, categoryAdd] =
    useAdminCategoriesTree();

  useEffect(() => {
    if (props.categoriesState.error != null) {
      throw props.categoriesState.error;
    }
  }, [props.categoriesState.error]);

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
          categories={categoriesData}
          categoriesState={props.categoriesState}
          setCategoriesState={props.setCategoriesState}
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
            <AdminJsonModal state={state} setState={setState} json={categoriesData} t={props.t} />
          ) : null}
          {state.editCategoryModal && state.editCategoryElement != null ? (
            <AdminCategoriesEditModal
              state={state}
              setState={setState}
              refetch={refetch}
              categoryChange={categoryChange}
              categoryActivate={categoryActivate}
              setCategoriesState={props.setCategoriesState}
              t={props.t}
              i18n={props.i18n}
              token={props.token}
            />
          ) : null}
          {state.addCategoryModal ? (
            <AdminCategoriesAddModal
              state={state}
              setState={setState}
              refetch={refetch}
              categoryAdd={categoryAdd}
              setCategoriesState={props.setCategoriesState}
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
