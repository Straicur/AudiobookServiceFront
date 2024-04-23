import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';

const UserAudiobookSearchContext = createContext(null);

export const UserAudiobookSearchProvider = ({ children, token, title, setState, i18n }) => {
  const qc = useQueryClient();

  const setRefetch = () => {
    qc.invalidateQueries(['dataAudiobookUserSearch']);
  };

  const { data: dataAudiobookUserSearch = null, isLoading } = useQuery({
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
    onError: (e) => {
      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const value = [dataAudiobookUserSearch, setRefetch, isLoading];

  return (
    <UserAudiobookSearchContext.Provider value={value}>
      {children}
    </UserAudiobookSearchContext.Provider>
  );
};

export const useUserAudiobookSearch = () => useContext(UserAudiobookSearchContext);
