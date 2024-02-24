import React, { createContext, useState, useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';

const AudiobookUserProposedContext = createContext(null);

export const AudiobookUserProposedProvider = ({ children, token, setState, i18n }) => {
  const [audiobookProposed, setAudiobookProposed] = useState(null);
  const [refetchState, setRefetchState] = useState(false);

  const { refetch: refetchAudiobookUserProposed } = useQuery(
    'dataAudiobookUserProposed',
    () => HandleFetch('/user/proposed/audiobooks', 'GET', null, token, i18n.language),
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
        setAudiobookProposed(data);
      },
    },
  );

  useEffect(() => {
    if (refetchState) {
      refetchAudiobookUserProposed();
      setRefetchState(!refetchState);
    }
  }, [refetchState]);

  const value = [audiobookProposed, setAudiobookProposed, setRefetchState];

  return (
    <AudiobookUserProposedContext.Provider value={value}>
      {children}
    </AudiobookUserProposedContext.Provider>
  );
};

export const useAudiobookUserProposed = () => useContext(AudiobookUserProposedContext);
