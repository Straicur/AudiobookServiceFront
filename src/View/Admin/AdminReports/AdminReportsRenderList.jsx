import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';
import CreateUtil from 'Util/CreateUtil';

export default function AdminReportsRenderList(props) {
  const openDetailReportModal = (element) => {
    props.setReportState((prev) => ({
      ...prev,
      detailReportModal: !props.reportState.detailReportModal,
      id: element.id,
      email: element.email,
      accepted: element.accepted,
      actionId: element.actionId,
      dateAdd: element.dateAdd,
      denied: element.denied,
      description: element.description,
      answer: element.answer,
      user: element.user,
      userBan: element.userBan,
      comment: element.comment,
      ip: element.ip,
      type: element.type,
    }));
  };

  const createTable = () => {
    let renderArray = [];

    if (props.reports != null) {
      props.reports.reports.forEach((element) => {
        renderArray.push(createColumn(element));
      });
    }

    return renderArray;
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
      <tr
        className={
          !element.accepted && !element.denied
            ? 'border-top-0 border-2 border-danger'
            : 'border border-2 border-light'
        }
        key={uuidv4()}
      >
        <td scope='row'>{element.id}</td>
        <td>
          {element.accepted ? (
            <i className='bi bi-bookmark-check-fill'></i>
          ) : (
            <i className='bi bi-bookmark-dash'></i>
          )}
        </td>
        <th scope='row'>{CreateUtil.createDateTime(element.dateAdd)}</th>
        <td>
          {element.denied ? (
            <i className='bi bi-bookmark-check-fill'></i>
          ) : (
            <i className='bi bi-bookmark-dash'></i>
          )}
        </td>
        <td>
          {element.user ? (
            <i className='bi bi-bookmark-check-fill'></i>
          ) : (
            <i className='bi bi-bookmark-dash'></i>
          )}
        </td>
        <td>{createReportType(element.type)}</td>
        <td scope='row overflow-auto'>{element.ip !== undefined ? element.ip : ''}</td>
        <td scope='row overflow-auto'>{element.email !== undefined ? element.email : ''}</td>
        <td className='table_buttons_with'>
          <div className='d-grid gap-2 d-md-block'>
            <Button
              name='en'
              variant='dark'
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
    <table className='table'>
      <thead className=''>
        <tr>
          <th scope='col'>{props.t('id')}</th>
          <th scope='col'>{props.t('accepted')}</th>
          <th scope='col'>{props.t('dateAdd')}</th>
          <th scope='col'>{props.t('denied')}</th>
          <th scope='col'>{props.t('systemUser')}</th>
          <th scope='col'>{props.t('type')}</th>
          <th scope='col'>{props.t('ip')}</th>
          <th scope='col'>{props.t('email')}</th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody>{createTable()}</tbody>
    </table>
  );
}
