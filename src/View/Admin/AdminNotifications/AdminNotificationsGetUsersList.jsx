import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';

export default function AdminNotificationsGetUsersList(props) {
  const createTable = () => {
    let renderArray = [];

    if (props.users != null) {
      props.users.users.forEach((element) => {
        renderArray.push(createColumn(element));
      });
    }

    return renderArray;
  };

  const createColumn = (element) => {
    return (
      <tr
        key={uuidv4()}
        className={element.id === props.state.actionId ? 'border-top-0 border border-danger' : ''}
      >
        <th scope='row'>{element.email}</th>
        <td>{element.lastname}</td>
        <td>
          {element.active ? (
            <i className='bi bi-bookmark-check-fill'></i>
          ) : (
            <i className='bi bi-bookmark-dash'></i>
          )}
        </td>
        <td>
          {element.banned ? (
            <i className='bi bi-bookmark-check-fill'></i>
          ) : (
            <i className='bi bi-bookmark-dash'></i>
          )}
        </td>
        <td>
          <Button
            name='en'
            size='sm'
            className='btn button question_button success_button'
            onClick={() => {
              props.setState((prev) => ({
                ...prev,
                actionId: element.id,
              }));
              props.goBack();
            }}
          >
            {props.t('select')}
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <table className='table'>
      <thead className=''>
        <tr>
          <th scope='col'>{props.t('email')}</th>
          <th scope='col'>{props.t('lastname')}</th>
          <th scope='col'>{props.t('active')}</th>
          <th scope='col'>{props.t('banned')}</th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody>{createTable()}</tbody>
    </table>
  );
}
