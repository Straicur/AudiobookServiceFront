import React, { createContext, useState, useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { HandleFetch } from 'Util/HandleFetch';
import CreateUtil from 'Util/CreateUtil';

const AudiobookUserDetailContext = createContext(null);

export const AudiobookUserDetailProvider = ({
  children,
  token,
  audiobookId,
  categoryKey,
  state,
  setState,
  i18n,
}) => {
  const [audiobookDetail, setAudiobookDetail] = useState(null);
  const [refetchState, setRefetchState] = useState(false);

  const { refetch: refetchAudiobookData } = useQuery(
    'dataAudiobookDetail',
    () =>
      HandleFetch(
        '/user/audiobook/details',
        'POST',
        {
          audiobookId: audiobookId,
          categoryKey: categoryKey,
        },
        token,
        i18n.language,
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {
        setState({ ...state, error: e });
      },
      onSuccess: (data) => {
        setAudiobookDetail({
          age: data.age,
          album: data.album,
          author: data.author,
          categories: data.categories,
          comments: data.comments,
          description: data.description,
          duration: CreateUtil.createTime(data.duration),
          id: data.id,
          inList: data.inList,
          parts: data.parts,
          title: data.title,
          version: data.version,
          year: CreateUtil.createDate(data.year),
          canRate: data.canRate,
          canComment: data.canComment,
          ratingAmount: data.ratingAmount,
        });
      },
    },
  );

  useEffect(() => {
    if (refetchState) {
      refetchAudiobookData();
      setRefetchState(!refetchState);
    }
  }, [refetchState]);

  const value = [audiobookDetail, setAudiobookDetail, setRefetchState];

  return (
    <AudiobookUserDetailContext.Provider value={value}>
      {children}
    </AudiobookUserDetailContext.Provider>
  );
};

export const useAudiobookDetail = () => useContext(AudiobookUserDetailContext);
