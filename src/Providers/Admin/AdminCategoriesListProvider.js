import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';

const AdminCategoriesListContext = createContext(null);

export const AdminCategoriesListProvider = ({ children, token, i18n }) => {
  const { data: dataAdminCategoriesList = null } = useQuery({
    queryKey: ['dataAdminCategoriesList'],
    queryFn: () => HandleFetch('/admin/categories', 'GET', null, token, i18n.language),
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
  });

  const value = [dataAdminCategoriesList];

  return (
    <AdminCategoriesListContext.Provider value={value}>
      {children}
    </AdminCategoriesListContext.Provider>
  );
};

export const useAdminCategoriesListData = () => useContext(AdminCategoriesListContext);
