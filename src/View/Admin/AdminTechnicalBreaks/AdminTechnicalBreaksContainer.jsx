import React, { useLayoutEffect, useState } from 'react';
import AdminNavBarProviders from '../AdminNavBar/AdminNavBarProviders';
import { useAdminTechnicalBreaksContextData } from 'Providers/Admin/AdminTechnicalBreaksProvider';

import Button from 'react-bootstrap/Button';
import AdminRenderPageSwitches from '../Common/AdminRenderPageSwitches';
import AdminRenderTechnicalBreaksList from './AdminRenderTechnicalBreaksList';
import AdminTechnicalBreaksSearchOffCanvas from './AdminTechnicalBreaksSearchOffCanvas';

export default function AdminTechnicalBreaksContainer(props) {
  const [state, setState] = useState({
    jsonModal: false,
    deleteUsersModal: false,
    searchModal: false,
  });

  const [technicalBreaks, forceRefetch, addTechnicalBreak, endTechnicalBreak] =
    useAdminTechnicalBreaksContextData();

  const resetSearchStates = () => {
    props.setSearchState({
      nameOrLastname: '',
      active: null,
      order: 0,
      dateFrom: 0,
      dateTo: 0,
    });
  };

  const openSearchModal = () => {
    setState((prev) => ({
      ...prev,
      searchModal: !state.searchModal,
    }));
  };

  useLayoutEffect(() => {
    if (props.technicalBreaksState.refresh) {
      props.setTechnicalBreaks((prev) => ({
        ...prev,
        refresh: !props.technicalBreaksState.refresh,
      }));
      forceRefetch();
    }
  }, [props.technicalBreaksState.refresh]);

  return (
    <div className='container-fluid main-container mt-3'>
      <div className='card position-relative p-3 mb-5  shadow'>
        <AdminNavBarProviders token={props.token} t={props.t} i18n={props.i18n} />
        <hr className='line' />
        <div className='table-title my-2'>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='p-2 bd-highlight'>
              <Button
                variant='warning'
                size='sm'
                className='btn button py-2 fs-4 px-3'
                onClick={() => addTechnicalBreak()}
              >
                {props.t('add')}
              </Button>
            </div>
            <div className='row'>
              <div className='col'>
                <h2>{props.t('filters')}</h2>
              </div>
              <div className='col'>
                <Button
                  variant='dark'
                  size='sm'
                  color='dark'
                  className=' btn button mt-2'
                  onClick={() => openSearchModal()}
                >
                  {props.t('search')}
                </Button>
              </div>
            </div>
          </div>
          <AdminRenderTechnicalBreaksList
            state={state}
            setState={setState}
            technicalBreaks={technicalBreaks}
            endTechnicalBreak={endTechnicalBreak}
            t={props.t}
            i18n={props.i18n}
            token={props.token}
            technicalBreaksState={props.technicalBreaksState}
            setTechnicalBreaks={props.setTechnicalBreaks}
          />
          {technicalBreaks != null && technicalBreaks.maxPage > 1 ? (
            <AdminRenderPageSwitches
              page={props.technicalBreaksState.page}
              maxPage={technicalBreaks.maxPage}
              setPageState={props.setTechnicalBreaks}
            />
          ) : null}
        </div>
        {state.searchModal ? (
          <AdminTechnicalBreaksSearchOffCanvas
            state={state}
            setState={setState}
            resetSearchStates={resetSearchStates}
            setTechnicalBreaks={props.setTechnicalBreaks}
            refetch={forceRefetch}
            searchState={props.searchState}
            setSearchState={props.setSearchState}
            t={props.t}
          />
        ) : null}
      </div>
    </div>
  );
}
