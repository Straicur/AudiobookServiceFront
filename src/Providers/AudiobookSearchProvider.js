import React, { createContext, useState, useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { HandleFetch } from 'Util/HandleFetch';

const AudiobookSearchContext = createContext(null);

export const AudiobookSearchProvider = ({ children, token, title, state, setState, i18n }) => {
  const [audiobookSearch, setAudiobookSearch] = useState(null);
  const [refetchState, setRefetchState] = useState(false);
  const [loading, setLoading] = useState(true);

  const { refetch: refetchAudiobookData } = useQuery(
    'dataAudiobookSearch',
    () =>
      HandleFetch(
        '/user/audiobooks/search',
        'POST',
        {
          title: title,
        },
        token,
        i18n.language,
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {
        setState({ ...state, error: e });
      },
      onSuccess: (data) => {
        setAudiobookSearch(data.audiobooks);
        setLoading(false);
      },
    },
  );

  useEffect(() => {
    if (refetchState) {
      refetchAudiobookData();
      setRefetchState(!refetchState);
    }
  }, [refetchState]);

  const value = [audiobookSearch, loading, setAudiobookSearch, setRefetchState];

  return (
    <AudiobookSearchContext.Provider value={value}>{children}</AudiobookSearchContext.Provider>
  );
};

export const useAudiobookSearch = () => useContext(AudiobookSearchContext);
