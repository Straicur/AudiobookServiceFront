import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

const AdminUsersDeleteContext = createContext(null);

export const AdminUsersDeleteProvider = ({ children, page, token, setState, i18n }) => {
  const qc = useQueryClient();

  const { mutate: declineDeleteUser } = useMutation({
    mutationFn: (data) => {
      HandleFetch(
        '/admin/user/delete/decline',
        'PATCH',
        {
          userId: data.userId,
        },
        token,
        i18n.language,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries(['dataAdminUsersDelete']);
    },
    onError: (e) => {
      qc.invalidateQueries(['dataAdminUsersDelete']);

      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const { mutate: deleteUser } = useMutation({
    mutationFn: (data) => {
      HandleFetch(
        '/admin/user/delete/accept',
        'PATCH',
        {
          userId: data.userId,
        },
        token,
        i18n.language,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries(['dataAdminUsersDelete']);
    },
    onError: (e) => {
      qc.invalidateQueries(['dataAdminUsersDelete']);

      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const { data: dataAdminUsersDelete = null } = useQuery({
    queryKey: ['dataAdminUsersDelete' + page],
    queryFn: () =>
      HandleFetch(
        '/admin/user/to/delete/list',
        'POST',
        {
          page: page,
          limit: 15,
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

  const value = [dataAdminUsersDelete, deleteUser, declineDeleteUser];

  return (
    <AdminUsersDeleteContext.Provider value={value}>{children}</AdminUsersDeleteContext.Provider>
  );
};

export const useAdminUsersDeleteData = () => useContext(AdminUsersDeleteContext);
