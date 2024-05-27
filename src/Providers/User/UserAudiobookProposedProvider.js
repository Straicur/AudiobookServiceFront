import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';

const UserAudiobookProposedContext = createContext(null);

export const UserAudiobookProposedProvider = ({ children, token, i18n }) => {
  const qc = useQueryClient();

  const setRefetch = () => {
    qc.invalidateQueries(['dataAdminAudiobooks']);
  };

  const { data: dataAudiobookUserProposed = null, isLoading } = useQuery({
    queryKey: ['dataAudiobookUserProposed'],
    queryFn: () => HandleFetch('/user/proposed/audiobooks', 'GET', null, token, i18n.language),
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
  });

  const value = [dataAudiobookUserProposed, setRefetch, isLoading];

  return (
    <UserAudiobookProposedContext.Provider value={value}>
      {children}
    </UserAudiobookProposedContext.Provider>
  );
};

export const useUserAudiobookProposed = () => useContext(UserAudiobookProposedContext);
