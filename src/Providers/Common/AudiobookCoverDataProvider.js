import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';

const AudiobookCoverContext = createContext(null);

export const AudiobookCoverDataProvider = ({ children, token, audiobookId, setState, i18n }) => {
  const qc = useQueryClient();

  const setRefetch = () => {
    qc.invalidateQueries(['dataAudiobookAdminData' + audiobookId]);
  };

  const { data: dataAudiobookCover } = useQuery({
    queryKey: ['dataAudiobookCover' + audiobookId],
    queryFn: () =>
      HandleFetch(
        '/audiobook/covers',
        'POST',
        {
          audiobooks: [audiobookId],
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

  const value = [dataAudiobookCover, setRefetch];

  return <AudiobookCoverContext.Provider value={value}>{children}</AudiobookCoverContext.Provider>;
};

export const useAudiobookCover = () => useContext(AudiobookCoverContext);
