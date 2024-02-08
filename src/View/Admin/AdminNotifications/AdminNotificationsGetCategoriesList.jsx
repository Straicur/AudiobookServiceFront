import React, { useEffect } from 'react';
import { HandleFetch } from 'Util/HandleFetch';
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';

export default function GetCategoriesList(props) {
  const createTable = () => {
    let renderArray = [];

    props.categoriesState.categories.forEach((element) => {
      renderArray.push(createColumn(element));
    });

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
                actionId: element.categoryKey,
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

  useEffect(() => {
    if (!props.categoriesState.fetched) {
      HandleFetch('/admin/categories', 'GET', null, props.token, props.i18n.language)
        .then((data) => {
          props.setCategoriesState((prev) => ({
            ...prev,
            categories: data.categories,
            fetch: !props.categoriesState.fetch,
            fetched: !props.categoriesState.fetched,
          }));
        })
        .catch((e) => {
          props.setNotificationsState((prev) => ({
            ...prev,
            error: e,
          }));
        });
    }
  }, [props]);

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
