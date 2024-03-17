import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';

const AdminCategoryAudiobooksContext = createContext(null);

export const AdminCategoryAudiobooksProvider = ({
  children,
  categoryKey,
  pageState,
  token,
  setState,
  i18n,
}) => {
  const qc = useQueryClient();

  const setRefetch = () => {
    qc.invalidateQueries(['dataAdminCategoryAudiobooks']);
  };

  const { data: dataAdminCategoryAudiobooks = null } = useQuery({
    queryKey: ['dataAdminCategoryAudiobooks' + categoryKey],
    queryFn: () =>
      HandleFetch(
        '/admin/category/audiobooks',
        'POST',
        {
          categoryKey: categoryKey,
          page: pageState.page,
          limit: pageState.limit,
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

  const value = [dataAdminCategoryAudiobooks, setRefetch];

  return (
    <AdminCategoryAudiobooksContext.Provider value={value}>
      {children}
    </AdminCategoryAudiobooksContext.Provider>
  );
};

export const useAdminCategoriesTree = () => useContext(AdminCategoryAudiobooksContext);
