import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useMutation } from '@tanstack/react-query';

const AdminSystemRolesContext = createContext(null);

export const AdminSystemRolesProvider = ({ children, token, setState, i18n }) => {
  const { mutate: addUserRole } = useMutation({
    mutationFn: (data) => {
      HandleFetch(
        '/admin/user/role/add',
        'PATCH',
        {
          userId: data.userId,
          role: data.role,
        },
        token,
        i18n.language,
      );
    },
    onSuccess: () => {
      // e.target.classList.remove('disabled');
      // let newUserSelectedRoles = props.state.editUserElement.roles;
      // newUserSelectedRoles.push(element.type);
      // const newSelcetedUser = {
      //   active: props.state.editUserElement.active,
      //   banned: props.state.editUserElement.banned,
      //   dateCreated: props.state.editUserElement.dateCreated,
      //   email: props.state.editUserElement.email,
      //   firstname: props.state.editUserElement.firstname,
      //   id: props.state.editUserElement.id,
      //   lastname: props.state.editUserElement.lastname,
      //   roles: newUserSelectedRoles,
      // };
      // props.setState((prev) => ({
      //   ...prev,
      //   editUserElement: newSelcetedUser,
      // }));
    },
    onError: (e) => {
      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const { mutate: removerUserRole } = useMutation({
    mutationFn: (data) => {
      HandleFetch(
        '/admin/user/role/remove',
        'PATCH',
        {
          userId: data.userId,
          role: data.role,
        },
        token,
        i18n.language,
      );
    },
    onSuccess: () => {
      // e.target.classList.remove('disabled');
      // let newUserSelectedRoles = props.state.editUserElement.roles.filter(
      //   (item) => item !== element.type,
      // );
      // const newSelcetedUser = {
      //   active: props.state.editUserElement.active,
      //   banned: props.state.editUserElement.banned,
      //   dateCreated: props.state.editUserElement.dateCreated,
      //   email: props.state.editUserElement.email,
      //   firstname: props.state.editUserElement.firstname,
      //   id: props.state.editUserElement.id,
      //   lastname: props.state.editUserElement.lastname,
      //   roles: newUserSelectedRoles,
      // };
      // props.setState((prev) => ({
      //   ...prev,
      //   editUserElement: newSelcetedUser,
      // }));
    },
    onError: (e) => {
      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const { data: dataAdminUsersRoles = null } = useQuery({
    queryKey: ['dataAdminUsersRoles'],
    queryFn: () => HandleFetch('/admin/user/system/roles', 'GET', null, token, i18n.language),
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
    onError: (e) => {
      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const value = [dataAdminUsersRoles, removerUserRole, addUserRole];

  return (
    <AdminSystemRolesContext.Provider value={value}>{children}</AdminSystemRolesContext.Provider>
  );
};

export const useAdminSystemRoles = () => useContext(AdminSystemRolesContext);
