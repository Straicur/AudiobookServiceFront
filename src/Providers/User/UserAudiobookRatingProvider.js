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
    let copy = dataAudiobookUserRating;

    for (var key in variables) {
      copy[key] = variables[key];
    }

    qc.setQueryData(['dataAudiobookUserRating' + audiobookId], copy);
  };

  const setRefetch = () => {
    qc.invalidateQueries(['dataAudiobookUserRating' + audiobookId]);
  };

  const { data: dataAudiobookUserRating = null } = useQuery({
    queryKey: ['dataAudiobookUserRating' + audiobookId],
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
