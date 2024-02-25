import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { QueryClient } from '@tanstack/react-query';

const AudiobookUserDetailContext = createContext(null);

export const AudiobookUserDetailProvider = ({
  children,
  token,
  audiobookId,
  categoryKey,
  setState,
  i18n,
}) => {
  const qc = new QueryClient();

  const setAudiobookDetail = (variables) => {
    let copy = dataAudiobookDetail;

    for (var key in variables) {
      copy[key] = variables[key];
    }

    qc.setQueryData(['dataAudiobookDetail'], copy);
  };

  const setRefetch = () => {
    qc.invalidateQueries(['dataAudiobookDetail']);
  };

  const { data: dataAudiobookDetail = null } = useQuery(
    ['dataAudiobookDetail'],
    () => {
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
      //   setAudiobookDetail({
      //     age: data.age,
      //     album: data.album,
      //     author: data.author,
      //     categories: data.categories,
      //     comments: data.comments,
      //     description: data.description,
      //     duration: CreateUtil.createTime(data.duration),
      //     id: data.id,
      //     inList: data.inList,
      //     parts: data.parts,
      //     title: data.title,
      //     version: data.version,
      //     year: CreateUtil.createDate(data.year),
      //     canRate: data.canRate,
      //     canComment: data.canComment,
      //     ratingAmount: data.ratingAmount,
      //   });
      // },
    },
  );

  const value = [dataAudiobookDetail, setAudiobookDetail, setRefetch];

  return (
    <AudiobookUserDetailContext.Provider value={value}>
      {children}
    </AudiobookUserDetailContext.Provider>
  );
};

export const useAudiobookDetail = () => useContext(AudiobookUserDetailContext);
