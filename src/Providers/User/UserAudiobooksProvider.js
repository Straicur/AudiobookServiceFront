import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';

const UserAudiobooksContext = createContext(null);

export const UserAudiobooksProvider = ({ children, token, page, limit, setState, i18n }) => {
  const qc = useQueryClient();

  const setRefetch = () => {
    qc.invalidateQueries(['dataAdminAudiobooks']);
  };

  const { data: dataUserAudiooboks = null, isLoading } = useQuery({
    queryKey: ['dataUserAudiooboks' + page],
    queryFn: () =>
      HandleFetch(
        '/user/audiobooks',
        'POST',
        {
          page: page,
          limit: limit,
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

  const value = [dataUserAudiooboks, setRefetch, isLoading];

  return <UserAudiobooksContext.Provider value={value}>{children}</UserAudiobooksContext.Provider>;
};

export const useUserAudiobookData = () => useContext(UserAudiobooksContext);
