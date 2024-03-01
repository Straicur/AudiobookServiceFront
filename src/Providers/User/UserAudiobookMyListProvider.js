import React, { createContext, useState, useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';

const UserAudiobookMyListContext = createContext(null);

export const UserAudiobookMyListProvider = ({ children, token, setState, i18n }) => {
  const [audiobooks, setAudiobooks] = useState(null);
  const [refetchState, setRefetchState] = useState(false);

  const { refetch: refetchMyListData, isLoading: isLoadingMyList } = useQuery({
    queryKey: ['dataMyAudiobooksData'],
    queryFn: () => HandleFetch('/user/myList/audiobooks', 'GET', null, token, i18n.language),
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
  });

  useEffect(() => {
    if (refetchState) {
      refetchMyListData();
      setRefetchState(!refetchState);
    }
  }, [refetchState]);

  const value = [audiobooks, isLoadingMyList, setAudiobooks, setRefetchState];

  return (
    <UserAudiobookMyListContext.Provider value={value}>
      {children}
    </UserAudiobookMyListContext.Provider>
  );
};

export const useUserAudiobookMyList = () => useContext(UserAudiobookMyListContext);
