import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';

const UserAudiobookSearchContext = createContext(null);

export const UserAudiobookSearchProvider = ({
  children,
  allowed,
  token,
  title,
  categoryKey,
  i18n,
}) => {
  const {
    data: dataAudiobookUserSearch = null,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['dataAudiobookUserSearch' + title + categoryKey],
    queryFn: () =>
      HandleFetch(
        '/user/audiobooks/search',
        'POST',
        {
          title: title,
          categoryKey: categoryKey,
        },
        token,
        i18n.language,
      ),
    retryDelay: 500,
    refetchOnWindowFocus: false,
    enabled: allowed,
  });

  const value = [dataAudiobookUserSearch, refetch, isLoading];

  return (
    <UserAudiobookSearchContext.Provider value={value}>
      {children}
    </UserAudiobookSearchContext.Provider>
  );
};

export const useUserAudiobookSearch = () => useContext(UserAudiobookSearchContext);
