import React from 'react';
import { Button } from 'react-bootstrap';
import CreateUtil from 'Util/CreateUtil';
import { v4 as uuidv4 } from 'uuid';

export default function AdminRenderTechnicalBreaksList(props) {
  const createTable = () => {
    let renderArray = [];

    if (props.technicalBreaks !== undefined && props.technicalBreaks !== null) {
      props.technicalBreaks.technicalBreaks.forEach((element) => {
        console.log(element);
        renderArray.push(createColumn(element));
      });
    }

    return renderArray;
  };
  const createColumn = (element) => {
    return (
      <tr key={uuidv4()}>
        <th scope='row'>{element.id}</th>
        <td>
          {element.active ? (
            <i className='bi bi-bookmark-check-fill'></i>
          ) : (
            <i className='bi bi-bookmark-dash'></i>
          )}
        </td>
        <td>{CreateUtil.createDateTime(element.dateFrom)}</td>
        <td>
          {element.dateTo === null ? (
            <i className='bi bi-x-lg'></i>
          ) : (
            CreateUtil.createDateTime(element.dateTo)
          )}
        </td>
        <th scope='row'>{element.user}</th>
        <td className='table_buttons_with'>
          <div className='d-grid gap-2 d-md-block'>
            <Button
              name='en'
              variant={!element.active ? 'dark' : 'success'}
              size='sm'
              className='btn button mx-2'
              disabled={!element.active}
              onClick={() => props.endTechnicalBreak({ technicalBreakId: element.id })}
            >
              {props.t('end')}
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
          <th scope='col'>{props.t('active')}</th>
          <th scope='col'>{props.t('dateFrom')}</th>
          <th scope='col'>{props.t('dateTo')}</th>
          <th scope='col'>{props.t('user')}</th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody>{createTable()}</tbody>
    </table>
  );
}
