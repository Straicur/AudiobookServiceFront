import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';

const AdminCategoriesTreeContext = createContext(null);

export const AdminCategoriesTreeProvider = ({ children, token, setState, i18n }) => {
  const qc = useQueryClient();

  const setRefetch = () => {
    qc.invalidateQueries(['dataAdminCategoriesTree']);
  };

  const { data: dataAdminCategoriesTree = null } = useQuery({
    queryKey: ['dataAdminCategoriesTree'],
    queryFn: () => HandleFetch('/admin/categories/tree', 'GET', null, token, i18n.language),
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

  const value = [dataAdminCategoriesTree, setRefetch];

  return (
    <AdminCategoriesTreeContext.Provider value={value}>
      {children}
    </AdminCategoriesTreeContext.Provider>
  );
};

export const useAdminCategoriesTree = () => useContext(AdminCategoriesTreeContext);
