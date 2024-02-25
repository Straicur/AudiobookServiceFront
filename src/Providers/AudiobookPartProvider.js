import React, { createContext, useEffect, useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';

const AudiobookPartContext = createContext(null);

export const AudiobookPartProvider = ({
  children,
  token,
  audiobookId,
  part,
  setState,
  audiobookState,
  setAudiobookState,
  i18n,
}) => {
  const [audiobookPart, setAudiobookPart] = useState(null);
  const [refetchState, setRefetchState] = useState(false);

  const createContext = () => {
    let json = {
      audiobookId: audiobookId,
    };

    if (part == undefined || isNaN(part)) {
      json.part = 0;
    } else {
      json.part = part;
    }
    return json;
  };

  const { refetch: refetchAudiobookPart } = useQuery(
    ['dataAudiobookPart'],
    () => HandleFetch('/audiobook/part', 'POST', createContext(), token, i18n.language),
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
        setAudiobookPart(process.env.REACT_APP_API_URL + data.url);
      },
    },
  );

  useEffect(() => {
    setAudiobookState({
      ...audiobookState,
      newPart: true,
      detailWatchingDate: null,
      datailEndedTime: null,
    });

    refetchAudiobookPart();
  }, [part]);

  useEffect(() => {
    if (refetchState) {
      refetchAudiobookPart();
      setRefetchState(!refetchState);
    }
  }, [refetchState]);

  const value = [audiobookPart, setAudiobookPart, setRefetchState];

  return <AudiobookPartContext.Provider value={value}>{children}</AudiobookPartContext.Provider>;
};

export const useAudiobookPart = () => useContext(AudiobookPartContext);
