import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { QueryClient } from '@tanstack/react-query';

const AudiobookUserDetailContext = createContext(null);

export const AudiobookUserDetailProvider = ({
  children,
  token,
  audiobookId,
  categoryKey,
  setState,
  i18n,
}) => {
  const qc = new QueryClient();

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

  const { data: dataAudiobookDetail = null } = useQuery(
    ['dataAudiobookDetail'],
    () => {
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
    },
  );

  const value = [dataAudiobookDetail, setAudiobookDetail, setRefetch];

  return (
    <AudiobookUserDetailContext.Provider value={value}>
      {children}
    </AudiobookUserDetailContext.Provider>
  );
};

export const useAudiobookDetail = () => useContext(AudiobookUserDetailContext);
