import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';

const UserAudiobookSearchContext = createContext(null);

export const UserAudiobookSearchProvider = ({ children, token, title, i18n }) => {
  const {
    data: dataAudiobookUserSearch = null,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['dataAudiobookUserSearch'],
    queryFn: () =>
      HandleFetch(
        '/user/audiobooks/search',
        'POST',
        {
          title: title,
        },
        token,
        i18n.language,
      ),
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
  });

  const value = [dataAudiobookUserSearch, refetch, isLoading];

  return (
    <UserAudiobookSearchContext.Provider value={value}>
      {children}
    </UserAudiobookSearchContext.Provider>
  );
};

export const useUserAudiobookSearch = () => useContext(UserAudiobookSearchContext);
