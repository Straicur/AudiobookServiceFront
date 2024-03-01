import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';

const UserAudiobookRatingContext = createContext(null);

export const UserAudiobookRatingProvider = ({
  children,
  token,
  audiobookId,
  categoryKey,
  setState,
  i18n,
}) => {
  const qc = useQueryClient();

  const setAudiobookRating = (variables) => {
    let copy = dataAudiobookRating;

    for (var key in variables) {
      copy[key] = variables[key];
    }

    qc.setQueryData(['dataAudiobookRating'], copy);
  };

  const setRefetch = () => {
    qc.invalidateQueries(['dataAudiobookRating']);
  };

  const { data: dataAudiobookRating = null } = useQuery({
    queryKey: ['dataAudiobookRating'],
    queryFn: () => {
      return HandleFetch(
        '/user/audiobook/rating/get',
        'POST',
        {
          audiobookId: audiobookId,
          categoryKey: categoryKey,
        },
        token,
        i18n.language,
      );
    },
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

  const value = [dataAudiobookRating, setAudiobookRating, setRefetch];

  return (
    <UserAudiobookRatingContext.Provider value={value}>
      {children}
    </UserAudiobookRatingContext.Provider>
  );
};

export const useUserAudiobookRating = () => useContext(UserAudiobookRatingContext);