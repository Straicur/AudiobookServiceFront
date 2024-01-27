import React, { createContext, useState, useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { HandleFetch } from '../Util/HandleFetch';

const AudiobookCoverContext = createContext(null);

export const AudiobookCoverDataProvider = ({
  children,
  token,
  audiobookId,
  state,
  setState,
  i18n,
}) => {
  const [audiobookCover, setAudiobookCover] = useState(null);
  const [refetchState, setRefetchState] = useState(false);

  const {
    isLoading: isLoadingAudiobookCover,
    error: errorAudiobookCover,
    data: dataAudiobookCover,
    isFetching: isFetchingAudiobookCover,
    refetch: refetchAudiobookCover,
  } = useQuery(
    'dataAudiobookCover',
    () =>
      HandleFetch(
        '/audiobook/covers',
        'POST',
        {
          audiobooks: [audiobookId],
        },
        token,
        i18n.language
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {
        setState({ ...state, error: e });
      },
      onSuccess: (data) => {
        if (data.audiobookCoversModels != undefined) {
          setAudiobookCover(data.audiobookCoversModels[0]);
        }
      },
    }
  );

  useEffect(() => {
    if (refetchState) {
      refetchAudiobookCover();
      setRefetchState(!refetchState);
    }
  }, [refetchState]);

  const value = [audiobookCover, setAudiobookCover, setRefetchState];

  return (
    <AudiobookCoverContext.Provider value={value}>
      {children}
    </AudiobookCoverContext.Provider>
  );
};

export const useAudiobookCover = () => useContext(AudiobookCoverContext);
