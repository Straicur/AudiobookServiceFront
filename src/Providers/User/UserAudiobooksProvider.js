import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';

const UserAudiobooksContext = createContext(null);

export const UserAudiobooksProvider = ({ children, token, page, limit, i18n }) => {
  const {
    data: dataUserAudiobooks = null,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['dataUserAudiobooks' + page],
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
  });

  const value = [dataUserAudiobooks, refetch, isLoading];

  return <UserAudiobooksContext.Provider value={value}>{children}</UserAudiobooksContext.Provider>;
};

export const useUserAudiobookData = () => useContext(UserAudiobooksContext);
