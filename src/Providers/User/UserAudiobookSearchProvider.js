import React, { createContext, useState, useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';

const UserAudiobookSearchContext = createContext(null);

export const UserAudiobookSearchProvider = ({ children, token, title, setState, i18n }) => {
  const [audiobookSearch, setAudiobookSearch] = useState(null);
  const [refetchState, setRefetchState] = useState(false);
  const [loading, setLoading] = useState(true);

  const { refetch: refetchAudiobookData } = useQuery({
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
    onSuccess: (data) => {
      setAudiobookSearch(data.audiobooks);
      setLoading(false);
    },
  });

  useEffect(() => {
    if (refetchState) {
      refetchAudiobookData();
      setRefetchState(!refetchState);
    }
  }, [refetchState]);

  const value = [audiobookSearch, loading, setAudiobookSearch, setRefetchState];

  return (
    <UserAudiobookSearchContext.Provider value={value}>
      {children}
    </UserAudiobookSearchContext.Provider>
  );
};

export const useUserAudiobookSearch = () => useContext(UserAudiobookSearchContext);
