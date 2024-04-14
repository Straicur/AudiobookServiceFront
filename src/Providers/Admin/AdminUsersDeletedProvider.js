import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';
// import { useMutation } from '@tanstack/react-query';

const AdminUsersDeletedContext = createContext(null);

export const AdminUsersDeletedProvider = ({ children, page, token, setState, i18n }) => {
  const qc = useQueryClient();

  const setRefetch = () => {
    qc.invalidateQueries(['dataAdminUsersDeleted']);
  };

  const { data: dataAdminUsersDeleted = null } = useQuery({
    queryKey: ['dataAdminUsersDeleted' + page],
    queryFn: () =>
      HandleFetch(
        '/admin/user/delete/list',
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

  const value = [dataAdminUsersDeleted, setRefetch];

  return (
    <AdminUsersDeletedContext.Provider value={value}>{children}</AdminUsersDeletedContext.Provider>
  );
};

export const useAdminUsersDeletedData = () => useContext(AdminUsersDeletedContext);
