import React, { createContext, useState, useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { HandleFetch } from 'Util/HandleFetch';

const AudiobookMyContext = createContext(null);

export const AudiobookMyListProvider = ({ children, token, state, setState, i18n }) => {
  const [audiobooks, setAudiobooks] = useState(null);
  const [refetchState, setRefetchState] = useState(false);

  const { refetch: refetchMyListData, isLoading: isLoadingMyList } = useQuery(
    'dataAudiobookData',
    () => HandleFetch('/user/myList/audiobooks', 'GET', null, token, i18n.language),
    {
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
        setAudiobooks(data.audiobooks);
      },
    },
  );

  useEffect(() => {
    if (refetchState) {
      refetchMyListData();
      setRefetchState(!refetchState);
    }
  }, [refetchState]);

  const value = [audiobooks, isLoadingMyList, setAudiobooks, setRefetchState];

  return <AudiobookMyContext.Provider value={value}>{children}</AudiobookMyContext.Provider>;
};

export const useAudiobookMy = () => useContext(AudiobookMyContext);
