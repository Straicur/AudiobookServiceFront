import React, { useState } from 'react';
import AdminNavBarProviders from '../AdminNavBar/AdminNavBarProviders';
import Button from 'react-bootstrap/Button';
import AdminJsonModal from '../AdminJsonModal/AdminJsonModal';
import AdminReportsService from 'Service/Admin/AdminReportsService';
import { useAdminReportsData } from 'Providers/Admin/AdminReportsProvider';
import AdminRenderPageSwitches from '../Common/AdminRenderPageSwitches';
import AdminReportsRenderList from './AdminReportsRenderList';
import AdminReportsSearchOffCanvas from './AdminReportsSearchOffCanvas';
import AdminReportDetailModal from './AdminReportDetailModal';

export default function AdminReportsContainer(props) {
  const [state, setState] = useState({
    jsonModal: false,
    searchModal: false,
  });

  const [reportState, setReportState] = useState({
    id: '',
    email: '',
    accepted: false,
    actionId: '',
    dateAdd: 0,
    denaied: false,
    description: '',
    answer: '',
    user: null,
    userBan: null,
    comment: null,
    ip: '',
    type: 0,
    sure: false,
    detailReportModal: false,
  });

  const [reports, refetch, acceptReport, rejectReport] = useAdminReportsData();

  const adminService = new AdminReportsService(
    props,
    props.searchState,
    props.setSearchState,
    state,
    setState,
  );

  return (
    <div className='container-fluid main-container mt-3'>
      <div className='card position-relative p-3 mb-5  shadow'>
        <AdminNavBarProviders token={props.token} t={props.t} i18n={props.i18n} />
        <hr className='line' />
        <div className='table-title my-2'>
          <div className='d-flex justify-content-end '>
            <div className='p-2 bd-highlight'>
              <h2>{props.t('filters')}</h2>
            </div>
            <div className='p-2 bd-highlight'>
              <Button
                variant='dark'
                size='sm'
                color='dark'
                className=' btn button mt-2'
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    searchModal: !state.searchModal,
                  }))
                }
              >
                {props.t('search')}
              </Button>
            </div>
          </div>
          <AdminReportsRenderList
            state={state}
            setState={setState}
            t={props.t}
            token={props.token}
            reports={reports}
            reportsState={props.reportsState}
            setReportsState={props.setReportsState}
            reportState={reportState}
            setReportState={setReportState}
          />
          {reports != null && reports.maxPage > 1 ? (
            <AdminRenderPageSwitches
              page={props.reportsState.page}
              maxPage={reports.maxPage}
              setPageState={props.setReportsState}
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
                  jsonModal: !state.jsonModal,
                }))
              }
            >
              {props.t('jsonData')}
            </Button>
          </div>
        </div>

        {state.searchModal ? (
          <AdminReportsSearchOffCanvas
            state={state}
            setState={setState}
            refetch={refetch}
            reportsState={props.reportsState}
            setReportsState={props.setReportsState}
            searchState={props.searchState}
            setSearchState={props.setSearchState}
            t={props.t}
            token={props.token}
            resetSearchStates={adminService.resetSearchStates}
          />
        ) : null}
        {reportState.detailReportModal ? (
          <AdminReportDetailModal
            state={state}
            setState={setState}
            t={props.t}
            i18n={props.i18n}
            token={props.token}
            reportState={reportState}
            setReportState={setReportState}
            acceptReport={acceptReport}
            rejectReport={rejectReport}
            reportsState={props.reportsState}
            setReportsState={props.setReportsState}
          />
        ) : null}
        {state.jsonModal ? (
          <AdminJsonModal state={state} setState={setState} json={reports} t={props.t} />
        ) : null}
      </div>
    </div>
  );
}
