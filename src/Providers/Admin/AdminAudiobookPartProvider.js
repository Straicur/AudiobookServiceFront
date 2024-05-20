import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';

const AudiobookPartContext = createContext(null);

export const AdminAudiobookPartProvider = ({ children, token, audiobookId, part, i18n }) => {
  const qc = useQueryClient();

  const setAudiobookPart = (variables) => {
    let copy = dataAudiobookPart;

    for (var key in variables) {
      copy[key] = variables[key];
    }

    qc.setQueryData(['dataAudiobookPart' + audiobookId], copy);
  };

  const setRefetch = () => {
    qc.invalidateQueries(['dataAudiobookPart' + audiobookId]);
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

  const { data: dataAudiobookPart = null } = useQuery({
    queryKey: ['dataAudiobookPart' + audiobookId],
    queryFn: () => {
      return HandleFetch('/audiobook/part', 'POST', createContext(), token, i18n.language);
    },
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
    throwOnError: true,
  });

  const value = [dataAudiobookPart, setRefetch, setAudiobookPart];

  return <AudiobookPartContext.Provider value={value}>{children}</AudiobookPartContext.Provider>;
};

export const useAudiobookPart = () => useContext(AudiobookPartContext);
