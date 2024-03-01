import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';

const UserAudiobookDetailContext = createContext(null);

export const UserAudiobookDetailProvider = ({
  children,
  token,
  audiobookId,
  categoryKey,
  setState,
  i18n,
}) => {
  const qc = useQueryClient();

  const setAudiobookDetail = (variables) => {
    let copy = dataAudiobookDetail;

    for (var key in variables) {
      copy[key] = variables[key];
    }

    qc.setQueryData(['dataAudiobookDetail'], copy);
  };

  const setRefetch = () => {
    qc.invalidateQueries(['dataAudiobookDetail']);
  };

  const { data: dataAudiobookDetail = null } = useQuery({
    queryKey: ['dataAudiobookDetail'],
    queryFn: () => {
      return HandleFetch(
        '/user/audiobook/details',
        'POST',
        {
          audiobookId: audiobookId,
          categoryKey: categoryKey,
        },
        token,
        i18n.language,
      );
    },
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

  const value = [dataAudiobookDetail, setAudiobookDetail, setRefetch];

  return (
    <UserAudiobookDetailContext.Provider value={value}>
      {children}
    </UserAudiobookDetailContext.Provider>
  );
};

export const useUserAudiobookDetail = () => useContext(UserAudiobookDetailContext);
