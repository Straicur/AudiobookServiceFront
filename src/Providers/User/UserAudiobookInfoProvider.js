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
      return HandleFetch(
        '/user/audiobook/info/add',
        'PUT',
        {
          audiobookId: data.props.state.detailModalAudiobook.id,
          categoryKey: data.props.state.detailModalCategory.categoryKey,
          part: data.props.audiobookState.part,
          endedTime: data.timeAudio.current,
          watched: data.watched,
        },
        data.props.token,
        data.props.i18n.language,
      );
    },
    onMutate: (variables) => {
      qc.setQueryData(['dataAudiobookUserInfo' + audiobookId], {
        part: variables.props.audiobookState.part,
        endedTime: variables.timeAudio.current,
        watchingDate: null,
      });
    },
    onError: () => {
      qc.invalidateQueries(['dataAudiobookUserInfo' + audiobookId]);
    },
    throwOnError: true,
  });

  const { data: dataAudiobookUserInfo = null } = useQuery({
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
    throwOnError: true,
  });
  const value = [dataAudiobookUserInfo, mutate];

  return (
    <UserAudiobookInfoContext.Provider value={value}>{children}</UserAudiobookInfoContext.Provider>
  );
};

export const useUserAudiobookInfo = () => useContext(UserAudiobookInfoContext);
