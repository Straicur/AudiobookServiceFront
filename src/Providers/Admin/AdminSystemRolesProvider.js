import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useMutation } from '@tanstack/react-query';

const AdminSystemRolesContext = createContext(null);

export const AdminSystemRolesProvider = ({ children, token, setState, i18n }) => {
  const { mutate: addUserRole } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
        '/admin/user/role/add',
        'PATCH',
        {
          userId: data.userId,
          role: data.element.type,
        },
        token,
        i18n.language,
      );
    },
    onSuccess: (data, variables) => {
      data = [];
      variables.e.target.classList.remove('disabled');

      let newUserSelectedRoles = variables.state.editUserElement.roles;

      newUserSelectedRoles.push(variables.element.type);

      const newSelcetedUser = {
        active: variables.state.editUserElement.active,
        banned: variables.state.editUserElement.banned,
        dateCreated: variables.state.editUserElement.dateCreated,
        email: variables.state.editUserElement.email,
        firstname: variables.state.editUserElement.firstname,
        id: variables.state.editUserElement.id,
        lastname: variables.state.editUserElement.lastname,
        roles: newUserSelectedRoles,
      };
      variables.setState((prev) => ({
        ...prev,
        editUserElement: newSelcetedUser,
      }));
    },
    onError: (e) => {
      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const { mutate: removeUserRole } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
        '/admin/user/role/remove',
        'PATCH',
        {
          userId: data.userId,
          role: data.element.type,
        },
        token,
        i18n.language,
      );
    },
    onSuccess: (data, variables) => {
      data = [];
      variables.e.target.classList.remove('disabled');

      let newUserSelectedRoles = variables.state.editUserElement.roles.filter(
        (item) => item !== variables.element.type,
      );

      const newSelcetedUser = {
        active: variables.state.editUserElement.active,
        banned: variables.state.editUserElement.banned,
        dateCreated: variables.state.editUserElement.dateCreated,
        email: variables.state.editUserElement.email,
        firstname: variables.state.editUserElement.firstname,
        id: variables.state.editUserElement.id,
        lastname: variables.state.editUserElement.lastname,
        roles: newUserSelectedRoles,
      };
      variables.setState((prev) => ({
        ...prev,
        editUserElement: newSelcetedUser,
      }));
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
    gcTime: 21600000,
    onError: (e) => {
      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const value = [dataAdminUsersRoles, removeUserRole, addUserRole];

  return (
    <AdminSystemRolesContext.Provider value={value}>{children}</AdminSystemRolesContext.Provider>
  );
};

export const useAdminSystemRoles = () => useContext(AdminSystemRolesContext);
