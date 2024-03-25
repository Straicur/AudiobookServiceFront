import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
// import { useQueryClient } from '@tanstack/react-query';

const AdminCategoriesListContext = createContext(null);

export const AdminCategoriesListProvider = ({ children, token, setState, i18n }) => {
  //   const qc = useQueryClient();

  //   const setRefetch = () => {
  //     qc.invalidateQueries(['dataAdminCategoriesList']);
  //   };

  const { data: dataAdminCategoriesList = null } = useQuery({
    queryKey: ['dataAdminCategoriesList'],
    queryFn: () => HandleFetch('/admin/categories', 'GET', null, token, i18n.language),
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

  const value = [dataAdminCategoriesList];

  return (
    <AdminCategoriesListContext.Provider value={value}>
      {children}
    </AdminCategoriesListContext.Provider>
  );
};

export const useAdminCategoriesListData = () => useContext(AdminCategoriesListContext);
