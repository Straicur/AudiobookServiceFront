import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';

const UserAudiobookMyListContext = createContext(null);

export const UserAudiobookMyListProvider = ({ children, token, i18n }) => {
  const qc = useQueryClient();

  const setRefetch = () => {
    qc.invalidateQueries(['dataMyAudiobooksUserData']);
  };

  const { data: dataMyAudiobooksUserData = null, isLoading } = useQuery({
    queryKey: ['dataMyAudiobooksUserData'],
    queryFn: () => HandleFetch('/user/myList/audiobooks', 'GET', null, token, i18n.language),
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
  });

  const value = [dataMyAudiobooksUserData, isLoading, setRefetch];

  return (
    <UserAudiobookMyListContext.Provider value={value}>
      {children}
    </UserAudiobookMyListContext.Provider>
  );
};

export const useUserAudiobookMyList = () => useContext(UserAudiobookMyListContext);
