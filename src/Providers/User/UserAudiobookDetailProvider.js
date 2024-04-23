import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

const UserAudiobookDetailContext = createContext(null);

export const UserAudiobookDetailProvider = ({
  children,
  token,
  audiobookId,
  categoryKey,
  setState,
  i18n,
}) => {
  const qc = useQueryClient();

  const { mutate: addToMyList } = useMutation({
    mutationFn: (data) => {
      HandleFetch(
        '/user/audiobook/like',
        'PATCH',
        {
          audiobookId: data.props.state.detailModalAudiobook.id,
          categoryKey: data.props.state.detailModalCategory.categoryKey,
        },
        token,
        i18n.language,
      );
    },
    onSuccess: (data, variables) => {
      data = [];

      variables.setAudiobookDetail({ inList: !variables.audiobookDetail.inList });

      variables.props.setAudiobookState((prev) => ({
        ...prev,
        renderAudiobookPlayer: true,
      }));

      variables.element.target.classList.remove('disabled');

      qc.invalidateQueries(['dataMyAudiobooksUserData']);
    },
    onError: (e) => {
      qc.invalidateQueries(['dataAudiobookUserDetail' + audiobookId]);

      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const setAudiobookDetail = (variables) => {
    let copy = dataAudiobookDetail;

    for (var key in variables) {
      copy[key] = variables[key];
    }

    qc.setQueryData(['dataAudiobookUserDetail' + audiobookId], copy);
  };

  const setRefetch = () => {
    qc.invalidateQueries(['dataAudiobookUserDetail' + audiobookId]);
  };

  const { data: dataAudiobookDetail = null } = useQuery({
    queryKey: ['dataAudiobookUserDetail' + audiobookId],
    queryFn: () => {
      return HandleFetch(
        '/user/audiobook/details',
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

  const value = [dataAudiobookDetail, setAudiobookDetail, addToMyList, setRefetch];

  return (
    <UserAudiobookDetailContext.Provider value={value}>
      {children}
    </UserAudiobookDetailContext.Provider>
  );
};

export const useUserAudiobookDetail = () => useContext(UserAudiobookDetailContext);
