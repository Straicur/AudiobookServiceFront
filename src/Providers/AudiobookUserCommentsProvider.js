import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { QueryClient } from '@tanstack/react-query';

const AudiobookUserCommentsContext = createContext(null);

export const AudiobookUserCommentsProvider = ({
  children,
  token,
  audiobookId,
  categoryKey,
  setState,
  i18n,
}) => {
  const qc = new QueryClient();

  const setAudiobookUserComments = (variables) => {
    let copy = dataAudiobookUserComments;

    for (var key in variables) {
      copy[key] = variables[key];
    }

    qc.setQueryData(['dataAudiobookUserComments'], copy);
  };

  const setRefetch = () => {
    qc.invalidateQueries(['dataAudiobookUserComments']);
  };

  const { data: dataAudiobookUserComments = null } = useQuery(
    ['dataAudiobookUserComments'],
    () => {
      return HandleFetch(
        '/user/audiobook/comment/get',
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

  const value = [dataAudiobookUserComments, setAudiobookUserComments, setRefetch];

  return (
    <AudiobookUserCommentsContext.Provider value={value}>
      {children}
    </AudiobookUserCommentsContext.Provider>
  );
};

export const useAudiobookUserComments = () => useContext(AudiobookUserCommentsContext);
