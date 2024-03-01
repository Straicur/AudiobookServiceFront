import React, { createContext, useState, useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';

const AudiobookCoverContext = createContext(null);

export const AdminAudiobookCoverDataProvider = ({
  children,
  token,
  audiobookId,
  setState,
  i18n,
}) => {
  const [audiobookCover, setAudiobookCover] = useState(null);
  const [refetchState, setRefetchState] = useState(false);

  //TODO zastanów się nad implementacją tych danych
  // isLoading: isLoadingAudiobookCover,
  // error: errorAudiobookCover,
  // data: dataAudiobookCover,
  // isFetching: isFetchingAudiobookCover,

  const { refetch: refetchAudiobookCover } = useQuery({
    queryKey: ['dataAudiobookCover'],
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
        errorCover: e.data,
      }));
    },
    onSuccess: (data) => {
      if (data.audiobookCoversModels != undefined) {
        setAudiobookCover(data.audiobookCoversModels[0]);
      }
    },
  });

  useEffect(() => {
    if (refetchState) {
      refetchAudiobookCover();
      setRefetchState(!refetchState);
    }
  }, [refetchState]);

  const value = [audiobookCover, setAudiobookCover, setRefetchState];

  return <AudiobookCoverContext.Provider value={value}>{children}</AudiobookCoverContext.Provider>;
};

export const useAudiobookCover = () => useContext(AudiobookCoverContext);
