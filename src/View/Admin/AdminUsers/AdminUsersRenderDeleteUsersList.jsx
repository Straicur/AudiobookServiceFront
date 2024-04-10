import React from 'react';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid';
import AdminRenderPageSwitches from '../Common/AdminRenderPageSwitches';
import { useAdminUsersDeleteData } from 'Providers/Admin/AdminUsersDeleteProvider';

export default function AdminUsersRenderDeleteUsersList(props) {
  const [usersList, deleteUser, declineDeleteUser] = useAdminUsersDeleteData();

  const createTable = () => {
    let renderArray = [];

    if (usersList != null) {
      usersList.users.forEach((element) => {
        renderArray.push(createColumn(element));
      });
    }

    return renderArray;
  };

  const createColumn = (element) => {
    return (
      <tr key={uuidv4()}>
        <th scope='row'>{element.email}</th>
        <td>{element.firstname}</td>
        <td>
          {element.active ? (
            <i className='bi bi-bookmark-check-fill'></i>
          ) : (
            <i className='bi bi-bookmark-dash'></i>
          )}
        </td>
        <td>
          {element.banned ? (
            <i className='bi bi-shield-fill-exclamation'></i>
          ) : (
            <i className='bi bi-shield-fill-check'></i>
          )}
        </td>
        <td className='table_buttons_with'>
          <div className='d-grid gap-2 d-md-block'>
            <Button
              name='en'
              variant='success'
              size='sm'
              className='btn button mx-2'
              onClick={() => declineDeleteUser({ userId: element.id })}
            >
              {props.t('cancel')}
            </Button>
            <Button
              name='en'
              variant='danger'
              size='sm'
              className='btn button mx-2'
              disabled={element.deleted}
              onClick={() => {
                deleteUser({ userId: element.id });
              }}
            >
              {element.deleted ? props.t('deleted') : props.t('accept')}
            </Button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <>
      <table className='table'>
        <thead className=''>
          <tr>
            <th scope='col'>{props.t('email')}</th>
            <th scope='col'>{props.t('firstname')}</th>
            <th scope='col'>{props.t('active')}</th>
            <th scope='col'>{props.t('banned')}</th>
          </tr>
        </thead>
        <tbody>{createTable()}</tbody>
      </table>
      {usersList != null && usersList.maxPage > 1 ? (
        <AdminRenderPageSwitches
          page={props.pageState.page}
          maxPage={usersList.maxPage}
          setPageState={props.setPageState}
        />
      ) : null}
    </>
  );
}
