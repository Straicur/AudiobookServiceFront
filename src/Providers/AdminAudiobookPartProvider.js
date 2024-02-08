import React, { createContext, useEffect, useState, useContext } from 'react';
import { useQuery } from 'react-query';
import { HandleFetch } from 'Util/HandleFetch';

const AudiobookPartContext = createContext(null);

export const AdminAudiobookPartProvider = ({
  children,
  token,
  audiobookId,
  part,
  setState,
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
    'dataAudiobookPart',
    () => HandleFetch('/audiobook/part', 'POST', createContext(), token, i18n.language),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (data) => {
        setAudiobookPart(process.env.REACT_APP_API_URL + data.url);
      },
      onError: (e) => {
        setState((prev) => ({
          ...prev,
          errorPart: e.data,
        }));
      },
    },
  );

  useEffect(() => {
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
