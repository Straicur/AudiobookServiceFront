import React from 'react';
import CreateUtil from 'Util/CreateUtil';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid';

export default function AdminUsersRenderList(props) {
  const createTable = () => {
    let renderArray = [];

    if (props.usersList !== undefined && props.usersList != null) {
      props.usersList.users.forEach((element) => {
        renderArray.push(createColumn(element));
      });
    }

    return renderArray;
  };

  const deleteUser = (selectedUser, element) => {
    element.target.classList.add('disabled');

    props.deleteUser({
      element: element,
      userId: selectedUser.id,
    });
  };

  const createColumn = (element) => {
    return (
      <tr key={uuidv4()}>
        <th scope='row'>{element.email}</th>
        <td>{element.firstname}</td>
        <td>{element.lastname}</td>
        <td>{CreateUtil.createDate(element.dateCreated)}</td>
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
        <td className='table_buttons_with row'>
          <div className='d-grid gap-2 d-md-block'>
            <Button
              name='en'
              variant='dark'
              size='sm'
              className='btn button mx-2'
              onClick={() =>
                props.setState((prev) => ({
                  ...prev,
                  editUserModal: !props.state.editUserModal,
                  editUserElement: element,
                }))
              }
            >
              {props.t('edit')}
            </Button>
            {(props.state.sure === null || props.state.sure === false) &&
            props.state.sureUser !== element.id ? (
              <Button
                name='en'
                variant='danger'
                size='sm'
                className='btn button mx-2'
                disabled={element.deleted}
                onClick={() => {
                  props.setState((prev) => ({
                    ...prev,
                    sure: false,
                    sureUser: element.id,
                  }));
                }}
              >
                {element.deleted ? props.t('deleted') : props.t('toDelete')}
              </Button>
            ) : (
              <>
                <Button
                  name='en'
                  variant='danger'
                  size='sm'
                  className='btn button mx-2'
                  disabled={element.deleted}
                  onClick={(e) => {
                    deleteUser(element, e);
                    props.setState((prev) => ({
                      ...prev,
                      sure: null,
                      sureUser: null,
                    }));
                  }}
                >
                  {props.t('yes')}
                </Button>
                <Button
                  name='en'
                  variant='success'
                  size='sm'
                  className='btn button mx-2'
                  disabled={element.deleted}
                  onClick={() => {
                    props.setState((prev) => ({
                      ...prev,
                      sure: null,
                      sureUser: null,
                    }));
                  }}
                >
                  {props.t('no')}
                </Button>
              </>
            )}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <table className='table'>
      <thead className=''>
        <tr>
          <th scope='col'>{props.t('email')}</th>
          <th scope='col'>{props.t('firstname')}</th>
          <th scope='col'>{props.t('lastname')}</th>
          <th scope='col'>{props.t('dateRegister')}</th>
          <th scope='col'>{props.t('active')}</th>
          <th scope='col'>{props.t('banned')}</th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody>{createTable()}</tbody>
    </table>
  );
}
