import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function AdminCategoryRenderAudiobooksList(props) {
  const navigate = useNavigate();

  const createTable = () => {
    let renderArray = [];

    if (props.categoryAudiobooks != null) {
      props.categoryAudiobooks.audiobooks.forEach((element) => {
        if (element !== undefined && element !== null) {
          renderArray.push(createColumn(element));
        }
      });
    }

    return renderArray;
  };

  const activateAudiobook = (element, selectedAudiobook) => {
    element.target.classList.add('disabled');

    props.activate({
      element: element,
      selectedAudiobook: selectedAudiobook,
    });
  };

  const createColumn = (element) => {
    return (
      <tr key={uuidv4()}>
        <th scope='row'>{element.title}</th>
        <td>{element.author}</td>
        <td>
          {element.active ? (
            <i className='bi bi-bookmark-check-fill'></i>
          ) : (
            <i className='bi bi-bookmark-dash'></i>
          )}
        </td>
        <td className='table_buttons_with'>
          <div className='d-grid gap-2 d-md-block'>
            <Button
              name='en'
              variant='dark'
              size='sm'
              className='btn button mx-2'
              onClick={() => navigate('/admin/audiobook/' + element.id)}
            >
              {props.t('fullEdit')}
            </Button>

            <Button
              name='en'
              variant='dark'
              size='sm'
              className='btn button mx-2'
              onClick={() =>
                props.setState((prev) => ({
                  ...prev,
                  detailAudiobookModal: !props.state.detailAudiobookModal,
                  detailAudiobookElement: element,
                }))
              }
            >
              {props.t('details')}
            </Button>

            <Button
              name='en'
              variant='dark'
              size='sm'
              className='btn button mx-2'
              onClick={() =>
                props.setState((prev) => ({
                  ...prev,
                  detailCommentsAudiobookModal: !props.state.detailCommentsAudiobookModal,
                  detailAudiobookElement: element,
                }))
              }
            >
              {props.t('comments')}
            </Button>

            <Button
              name='en'
              variant={element.active ? 'danger' : 'success'}
              size='sm'
              className='btn button mx-2'
              onClick={(e) => {
                activateAudiobook(e, element);
              }}
            >
              {element.active ? props.t('deActivate') : props.t('activate')}
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
          <th scope='col'>{props.t('title')}</th>
          <th scope='col'>{props.t('author')}</th>
          <th scope='col'>{props.t('active')}</th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody>{createTable()}</tbody>
    </table>
  );
}
