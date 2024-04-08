import React from 'react';
import { HandleFetch } from 'Util/HandleFetch';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid';

export default function AdminUsersRoles(props) {
  const deleteRole = (e, element) => {
    e.target.classList.add('disabled');
    HandleFetch(
      '/admin/user/role/remove',
      'PATCH',
      {
        userId: props.state.editUserElement.id,
        role: element.type,
      },
      props.token,
      props.i18n.language,
    )
      .then(() => {
        e.target.classList.remove('disabled');

        let newUserSelectedRoles = props.state.editUserElement.roles.filter(
          (item) => item !== element.type,
        );

        const newSelcetedUser = {
          active: props.state.editUserElement.active,
          banned: props.state.editUserElement.banned,
          dateCreated: props.state.editUserElement.dateCreated,
          email: props.state.editUserElement.email,
          firstname: props.state.editUserElement.firstname,
          id: props.state.editUserElement.id,
          lastname: props.state.editUserElement.lastname,
          roles: newUserSelectedRoles,
        };

        props.setState((prev) => ({
          ...prev,
          editUserElement: newSelcetedUser,
        }));
      })
      .catch((e) => {
        props.setState((prev) => ({
          ...prev,
          error: e,
        }));
      });
  };

  const addRole = (e, element) => {
    e.target.classList.add('disabled');
    HandleFetch(
      '/admin/user/role/add',
      'PATCH',
      {
        userId: props.state.editUserElement.id,
        role: element.type,
      },
      props.token,
      props.i18n.language,
    )
      .then(() => {
        e.target.classList.remove('disabled');

        let newUserSelectedRoles = props.state.editUserElement.roles;

        newUserSelectedRoles.push(element.type);

        const newSelcetedUser = {
          active: props.state.editUserElement.active,
          banned: props.state.editUserElement.banned,
          dateCreated: props.state.editUserElement.dateCreated,
          email: props.state.editUserElement.email,
          firstname: props.state.editUserElement.firstname,
          id: props.state.editUserElement.id,
          lastname: props.state.editUserElement.lastname,
          roles: newUserSelectedRoles,
        };

        props.setState((prev) => ({
          ...prev,
          editUserElement: newSelcetedUser,
        }));
      })
      .catch((e) => {
        props.setState((prev) => ({
          ...prev,
          error: e,
        }));
      });
  };

  const generateUserRolesList = () => {
    console.log(props.state);
    let roles = [];
    if (props.userRoles != null) {
      props.userRoles.roles.forEach((element) => {
        let hasRole = props.state.editUserElement.roles.filter((x) => x == element.type);

        roles.push(
          <div className='row align-items-center mt-2' key={uuidv4()}>
            <div className='col-4 align-self-center'>{element.name}</div>
            <div className='col-8 align-self-center'>
              <Button
                variant={hasRole.length > 0 ? 'danger' : 'success'}
                size='sm'
                color='dark'
                className=' btn button text-light edit_user_btn'
                onClick={(e) => {
                  hasRole.length > 0 ? deleteRole(e, element) : addRole(e, element);
                }}
              >
                {hasRole.length > 0 ? props.t('deleteRole') : props.t('addRole')}
              </Button>
            </div>
          </div>,
        );
      });
    }

    return roles;
  };

  return (
    <div className='row'>
      <div className='row'>
        <h3>{props.t('roles')}</h3>
      </div>
      <div className='row'>{generateUserRolesList()}</div>
    </div>
  );
}
