import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';

const UserAudiobookInfoContext = createContext(null);

export const UserAudiobookInfoProvider = ({ children, token, audiobookId, categoryKey, i18n }) => {
  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => {
      console.log({
        audiobookId: data.props.state.detailModalAudiobook.id,
        categoryKey: data.props.state.detailModalCategory.categoryKey,
        part: data.props.audiobookState.part + 1,
        endedTime: data.timeAudio.current,
        watched: data.watched,
      });
      return HandleFetch(
        '/user/audiobook/info/add',
        'PUT',
        {
          audiobookId: data.props.state.detailModalAudiobook.id,
          categoryKey: data.props.state.detailModalCategory.categoryKey,
          part: data.props.audiobookState.part + 1,
          endedTime: data.timeAudio.current,
          watched: data.watched,
        },
        data.props.token,
        data.props.i18n.language,
      );
    },
    onMutate: (variables) => {
      refetch();

      variables.timeAudio.current = 0;
      variables.audioDuration.current = 0;
    },
    onError: () => {
      qc.invalidateQueries(['dataAudiobookUserInfo' + audiobookId]);
    },
  });

  const { data: dataAudiobookUserInfo = null, refetch } = useQuery({
    queryKey: ['dataAudiobookUserInfo' + audiobookId],
    queryFn: () => {
      return HandleFetch(
        '/user/audiobook/info',
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
    gcTime: 1000,
  });
  const value = [dataAudiobookUserInfo, mutate];

  return (
    <UserAudiobookInfoContext.Provider value={value}>{children}</UserAudiobookInfoContext.Provider>
  );
};

export const useUserAudiobookInfo = () => useContext(UserAudiobookInfoContext);
