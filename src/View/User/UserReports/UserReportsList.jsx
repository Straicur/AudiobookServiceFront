import React from 'react';
import UserNavBarProviders from '../UserNavBar/UserNavBarProviders';
import { useUserReportsData } from '../../../Providers/User/UserReportsProvider';
import { v4 as uuidv4 } from 'uuid';
import CreateUtil from '../../../Util/CreateUtil';
import Button from 'react-bootstrap/Button';
import UserRenderPageSwitches from '../Common/UserRenderPageSwitchers';

export default function UserRenderCategoriesList(props) {
  const [reports] = useUserReportsData();

  const openDetailReportModal = (element) => {
    props.setReportsState((prev) => ({
      ...prev,
      detailReportModal: !props.reportsState.detailReportModal,
      report: element,
    }));
  };

  const createTable = () => {
    let renderArray = [];
    if (reports != null) {
      reports.reports.forEach((report) => {
        renderArray.push(createColumn(report));
      });

      return renderArray;
    }
  };

  const createReportType = (element) => {
    switch (element) {
      case 1: {
        return props.t('reportTypeComment');
      }
      case 2: {
        return props.t('reportTypeAudiobook');
      }
      case 3: {
        return props.t('reportTypeCategory');
      }
      case 4: {
        return props.t('reportTypeSystem');
      }
      case 5: {
        return props.t('reportTypeUser');
      }
      case 6: {
        return props.t('reportTypeSettings');
      }
      case 7: {
        return props.t('reportTypeRecruitment');
      }
      case 8: {
        return props.t('reportTypeOther');
      }
    }
  };

  const createColumn = (element) => {
    return (
      <tr className='border border-2 border-light' key={uuidv4()}>
        <th scope='row'>{CreateUtil.createDateTime(element.dateAdd)}</th>
        <td>
          {element.accepted ? (
            <i className='bi bi-bookmark-check-fill'></i>
          ) : (
            <i className='bi bi-bookmark-dash'></i>
          )}
        </td>
        <td>
          {element.denied ? (
            <i className='bi bi-bookmark-check-fill'></i>
          ) : (
            <i className='bi bi-bookmark-dash'></i>
          )}
        </td>
        <td>{createReportType(element.type)}</td>
        <td>
          <div className='d-grid gap-2 d-md-block'>
            <Button
              name='en'
              variant='warning'
              size='sm'
              className='btn button mx-2'
              onClick={() => openDetailReportModal(element)}
            >
              {props.t('details')}
            </Button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className='container-fluid main-container mt-3'>
      <div className='card position-relative p-3 bg-dark shadow'>
        <UserNavBarProviders token={props.token} t={props.t} i18n={props.i18n} />
        <hr className='text-white line' />
        <table className='table table-dark'>
          <thead className=''>
            <tr>
              <th scope='col'>{props.t('dateAdd')}</th>
              <th scope='col'>{props.t('accepted')}</th>
              <th scope='col'>{props.t('denied')}</th>
              <th scope='col'>{props.t('type')}</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>{createTable()}</tbody>
        </table>
        {reports != null && reports.maxPage > 1 ? (
          <UserRenderPageSwitches
            page={props.reportsState.page}
            maxPage={reports.maxPage}
            setPageState={props.setReportsState}
          />
        ) : null}
      </div>
    </div>
  );
}
