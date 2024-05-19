import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';

export default function GetCategoriesList(props) {
  const createTable = () => {
    let renderArray = [];

    if (props.categories != null) {
      props.categories.categories.forEach((element) => {
        renderArray.push(createColumn(element));
      });
    }

    return renderArray;
  };

  const createColumn = (element) => {
    return (
      <tr key={uuidv4()}>
        <th scope='row'>{element.name}</th>
        <td>
          {element.active ? (
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
                categoryKey: element.categoryKey,
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
          <th scope='col'>{props.t('name')}</th>
          <th scope='col'>{props.t('active')}</th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody>{createTable()}</tbody>
    </table>
  );
}
