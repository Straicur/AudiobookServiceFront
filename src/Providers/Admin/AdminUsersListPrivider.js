import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import md5 from 'md5';
import AdminUsersSearchService from 'Service/Admin/AdminUsersSearchService';

const AdminUsersListContext = createContext(null);

export const AdminUsersListPrivider = ({ children, page, token, searchState, setState, i18n }) => {
  const qc = useQueryClient();

  const { mutate: changeUserPassword } = useMutation({
    mutationFn: (data) => {
      HandleFetch(
        '/admin/user/change/password',
        'PATCH',
        {
          userId: data.userId,
          newPassword: md5(data.passwordState.password),
        },
        token,
        i18n.language,
      );
    },
    onSuccess: (data, variables) => {
      data = [];

      variables.setPasswordState((prev) => ({
        ...prev,
        sure: !variables.passwordState.sure,
      }));
    },
    onError: (e) => {
      qc.invalidateQueries(['dataAdminUsersList' + page]);

      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const { mutate: changeUserPhone } = useMutation({
    mutationFn: (data) => {
      HandleFetch(
        '/admin/user/change/phone',
        'PATCH',
        {
          userId: data.userId,
          newPhone: data.phoneNumberState.phoneNumber,
        },
        token,
        i18n.language,
      );
    },
    onSuccess: (data, variables) => {
      data = [];

      variables.setPhoneNumberState((prev) => ({
        ...prev,
        sure: !variables.phoneNumberState.sure,
      }));
    },
    onError: (e) => {
      qc.invalidateQueries(['dataAdminUsersList' + page]);

      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const { mutate: activateUser } = useMutation({
    mutationFn: (data) => {
      HandleFetch(
        '/admin/user/activate',
        'PATCH',
        {
          userId: data.state.editUserElement.id,
        },
        token,
        i18n.language,
      );
    },
    onSuccess: (data, variables) => {
      data = [];

      const newSelcetedUser = {
        active: !variables.state.editUserElement.active,
        banned: variables.state.editUserElement.banned,
        dateCreated: variables.state.editUserElement.dateCreated,
        email: variables.state.editUserElement.email,
        firstname: variables.state.editUserElement.firstname,
        id: variables.state.editUserElement.id,
        lastname: variables.state.editUserElement.lastname,
        roles: variables.state.editUserElement.roles,
      };

      variables.setState((prev) => ({
        ...prev,
        editUserElement: newSelcetedUser,
      }));
    },
    onError: (e) => {
      qc.invalidateQueries(['dataAdminUsersList' + page]);

      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const { mutate: banUser } = useMutation({
    mutationFn: (data) => {
      HandleFetch(
        '/admin/user/ban',
        'PATCH',
        {
          userId: data.state.editUserElement.id,
          banned: !data.state.editUserElement.banned,
        },
        token,
        i18n.language,
      );
    },
    onSuccess: (data, variables) => {
      data = [];
      variables.e.target.classList.remove('disabled');

      const newSelcetedUser = {
        active: variables.state.editUserElement.active,
        banned: !variables.state.editUserElement.banned,
        dateCreated: variables.state.editUserElement.dateCreated,
        email: variables.state.editUserElement.email,
        firstname: variables.state.editUserElement.firstname,
        id: variables.state.editUserElement.id,
        lastname: variables.state.editUserElement.lastname,
        roles: variables.state.editUserElement.roles,
      };

      variables.setState((prev) => ({
        ...prev,
        editUserElement: newSelcetedUser,
      }));
    },
    onError: (e) => {
      qc.invalidateQueries(['dataAdminUsersList' + page]);

      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const { mutate: deleteUser } = useMutation({
    mutationFn: (data) => {
      HandleFetch(
        '/admin/user/delete',
        'DELETE',
        {
          userId: data.userId,
        },
        token,
        i18n.language,
      );
    },
    onSuccess: (data, variables) => {
      data = [];
      variables.element.target.classList.remove('disabled');
      qc.invalidateQueries(['dataAdminUsersList']);
    },
    onError: (e) => {
      qc.invalidateQueries(['dataAdminUsersList' + page]);

      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const setRefetch = () => {
    qc.invalidateQueries(['dataAdminUsersList']);
  };

  const { data: dataAdminStatistics = null, refetch } = useQuery({
    queryKey: ['dataAdminUsersList' + page],
    queryFn: () =>
      HandleFetch(
        '/admin/users',
        'POST',
        {
          page: page,
          limit: 15,
          searchData: AdminUsersSearchService.createSearchData(searchState),
        },
        token,
        i18n.language,
      ),
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

  const value = [
    dataAdminStatistics,
    setRefetch,
    refetch,
    deleteUser,
    banUser,
    activateUser,
    changeUserPassword,
    changeUserPhone,
  ];

  return <AdminUsersListContext.Provider value={value}>{children}</AdminUsersListContext.Provider>;
};

export const useAdminUsersListData = () => useContext(AdminUsersListContext);
