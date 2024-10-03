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
  i18n,
}) => {
  const qc = useQueryClient();

  const { mutate: addAudiobookRating } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
        '/user/audiobook/rating/add',
        'PUT',
        {
          audiobookId: data.audiobookId,
          categoryKey: data.categoryKey,
          rating: data.rating,
        },
        token,
        i18n.language,
      );
    },
    onSuccess: (data, variables) => {
      variables.setUserRate(false);
      variables.setSure(false);

      qc.invalidateQueries(['dataAudiobookUserDetail' + audiobookId]);
    },
    onError: (e, variables) => {
      variables.doubleClickRating();
    },
  });

  const { mutate: addToMyList } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
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
      let json = {
        id: dataAudiobookUserDetail.id,
        title: dataAudiobookUserDetail.title,
        author: dataAudiobookUserDetail.author,
        version: dataAudiobookUserDetail.version,
        album: dataAudiobookUserDetail.album,
        year: dataAudiobookUserDetail.year,
        duration: dataAudiobookUserDetail.duration,
        size: dataAudiobookUserDetail.size,
        parts: dataAudiobookUserDetail.parts,
        description: dataAudiobookUserDetail.description,
        age: dataAudiobookUserDetail.age,
        categories: dataAudiobookUserDetail.categories,
        avgRating: dataAudiobookUserDetail.avgRating,
        ratingAmount: dataAudiobookUserDetail.ratingAmount,
        canComment: dataAudiobookUserDetail.canComment,
        canRate: dataAudiobookUserDetail.canRate,
        comments: dataAudiobookUserDetail.comments,
        imgFile: dataAudiobookUserDetail.imgFile,
        inList: !dataAudiobookUserDetail.inList,
      };

      const copy = Object.assign(json, data);

      qc.setQueryData(['dataAudiobookUserDetail' + audiobookId], copy);

      variables.props.setAudiobookState((prev) => ({
        ...prev,
        renderAudiobookPlayer: true,
        myListChanged: !variables.audiobookState.inList,
      }));

      variables.element.target.classList.remove('disabled');

      qc.invalidateQueries(['dataMyAudiobooksUserData']);
    },
    onError: () => {
      qc.invalidateQueries(['dataAudiobookUserDetail' + audiobookId]);
    },
  });

  const { data: dataAudiobookUserDetail = null, refetch } = useQuery({
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
  });

  const value = [dataAudiobookUserDetail, addToMyList, addAudiobookRating, refetch];

  return (
    <UserAudiobookDetailContext.Provider value={value}>
      {children}
    </UserAudiobookDetailContext.Provider>
  );
};

export const useUserAudiobookDetail = () => useContext(UserAudiobookDetailContext);
