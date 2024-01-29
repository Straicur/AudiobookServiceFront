import React, { useEffect } from 'react';
import { HandleFetch } from 'Util/HandleFetch';
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';

export default function AdminNotificationsGetAudiobooksList(props) {
  const createTable = () => {
    let renderArray = [];

    props.audiobooksState.audiobooks.forEach((element) => {
      renderArray.push(createColumn(element));
    });

    return renderArray;
  };

  const createColumn = (element) => {
    return (
      <tr key={uuidv4()}>
        <th scope='row'>{element.title}</th>
        <td>{element.author}</td>
        <td>{element.parts}</td>
        <td>{getAge(element)}</td>
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
              props.setState({
                ...props.state,
                actionId: element.id,
              });

              props.goBack();
            }}
          >
            {props.t('select')}
          </Button>
        </td>
      </tr>
    );
  };

  const getAge = (element) => {
    switch (element.age) {
      case 1:
        return '3-7';
      case 2:
        return '7-12';
      case 3:
        return '12-16';
      case 4:
        return '16-18';
      case 5:
        return '18+';
    }
  };

  useEffect(() => {
    if (!props.audiobooksState.fetched) {
      HandleFetch(
        '/admin/audiobooks',
        'POST',
        {
          page: 0,
          limit: 30,
          searchJson: {
            order: 1,
          },
        },
        props.token,
        props.i18n.language,
      )
        .then((data) => {
          props.setAudiobooksState({
            ...props.audiobooksState,
            audiobooks: data.audiobooks,
            fetch: !props.audiobooksState.fetch,
            fetched: !props.audiobooksState.fetched,
          });
        })
        .catch((e) => {
          props.setNotificationsState({
            ...props.notificationsState,
            error: e,
          });
        });
    }
  }, [props]);

  return (
    <table className='table'>
      <thead className=''>
        <tr>
          <th scope='col'>{props.t('title')}</th>
          <th scope='col'>{props.t('author')}</th>
          <th scope='col'>{props.t('parts')}</th>
          <th scope='col'>{props.t('age')}</th>
          <th scope='col'>{props.t('active')}</th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody>{createTable()}</tbody>
    </table>
  );
}
