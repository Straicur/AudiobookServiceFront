import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';

const AdminCategoryDetailContext = createContext(null);

export const AdminCategoryDetailProfider = ({ children, categoryKey, token, setState, i18n }) => {
  const qc = useQueryClient();

  const setRefetch = () => {
    qc.invalidateQueries(['dataAdminCategoryDetail']);
  };

  const { data: dataAdminCategoryDetail = null } = useQuery({
    queryKey: ['dataAdminCategoryDetail'],
    queryFn: () =>
      HandleFetch(
        '/admin/category/detail',
        'POST',
        {
          categoryKey: categoryKey,
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

  const value = [dataAdminCategoryDetail, setRefetch];

  return (
    <AdminCategoryDetailContext.Provider value={value}>
      {children}
    </AdminCategoryDetailContext.Provider>
  );
};

export const useAdminCategoryDetail = () => useContext(AdminCategoryDetailContext);
