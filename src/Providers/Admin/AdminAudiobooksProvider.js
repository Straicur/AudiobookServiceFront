import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';
// import { useMutation } from '@tanstack/react-query';

const AdminAudiobooksContext = createContext(null);

export const AdminAudiobooksProvider = ({ children, token, page, searchData, setState, i18n }) => {
  const qc = useQueryClient();

  const setRefetch = () => {
    qc.invalidateQueries(['dataAdminAudiobooks' + page]);
  };

  const { data: dataAdminAudiobooks = null } = useQuery({
    queryKey: ['dataAdminAudiobooks' + page],
    queryFn: () =>
      HandleFetch(
        '/admin/audiobooks',
        'POST',
        {
          page: page,
          limit: 15,
          searchData: searchData,
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

  const value = [dataAdminAudiobooks, setRefetch];

  return (
    <AdminAudiobooksContext.Provider value={value}>{children}</AdminAudiobooksContext.Provider>
  );
};

export const useAdminAudiobooksData = () => useContext(AdminAudiobooksContext);
