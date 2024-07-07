import React from 'react';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid';

export default function AdminUsersRoles(props) {
  const deleteRole = (e, element) => {
    e.target.classList.add('disabled');
    props.removeUserRole({
      userId: props.state.editUserElement.id,
      element: element,
      e: e,
      state: props.state,
      setState: props.setState,
    });
  };

  const addRole = (e, element) => {
    e.target.classList.add('disabled');
    props.addUserRole({
      userId: props.state.editUserElement.id,
      element: element,
      e: e,
      state: props.state,
      setState: props.setState,
    });
  };

  const generateUserRolesList = () => {
    let roles = [];
    if (props.userRoles != null) {
      props.userRoles.roles.forEach((element) => {
        let hasRole = props.state.editUserElement.roles.filter((x) => x === element.type);

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
