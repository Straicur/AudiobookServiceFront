import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';
import DataNotFoundError from 'Errors/Errors/DataNotFoundError';

const UserAudiobookInfoContext = createContext(null);

export const UserAudiobookInfoProvider = ({
  children,
  token,
  audiobookId,
  categoryKey,
  setState,
  props,
  i18n,
}) => {
  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => {
      HandleFetch(
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
      ).catch((e) => {
        data.props.setState((prev) => ({
          ...prev,
          error: e,
        }));
      });
    },
    onMutate: (variables) => {
      qc.setQueryData(['dataAudiobookUserInfo' + audiobookId], {
        part: variables.props.audiobookState.part,
        endedTime: variables.timeAudio.current,
        watchingDate: null,
      });
    },
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
        i18n,
      );
    },
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
    onError: (e) => {
      if (e instanceof DataNotFoundError) {
        setState((prev) => ({
          ...prev,
          info: true,
        }));
      } else {
        props.setState((prev) => ({
          ...prev,
          error: e,
        }));
      }
    },
  });
  const value = [dataAudiobookUserInfo, mutate];

  return (
    <UserAudiobookInfoContext.Provider value={value}>{children}</UserAudiobookInfoContext.Provider>
  );
};

export const useUserAudiobookInfo = () => useContext(UserAudiobookInfoContext);
