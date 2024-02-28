import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';

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
  const qc = useQueryClient();

  const setAudiobookPart = (variables) => {
    let copy = dataAudiobookPart;

    for (var key in variables) {
      copy[key] = variables[key];
    }

    qc.setQueryData(['dataAudiobookDetail'], copy);
  };

  const setRefetch = () => {
    setAudiobookState({
      ...audiobookState,
      newPart: true,
      detailWatchingDate: null,
      datailEndedTime: null,
    });

    qc.invalidateQueries(['dataAudiobookDetail']);
  };

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

  const { data: dataAudiobookPart = null } = useQuery(
    ['dataAudiobookPart'],
    () => {
      return HandleFetch('/audiobook/part', 'POST', createContext(), token, i18n.language);
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
      // onSuccess: (data) => {
      //   setAudiobookPart(process.env.REACT_APP_API_URL + data.url);
      // },
    },
  );

  const value = [dataAudiobookPart, setAudiobookPart, setRefetch];

  return <AudiobookPartContext.Provider value={value}>{children}</AudiobookPartContext.Provider>;
};

export const useAudiobookPart = () => useContext(AudiobookPartContext);
