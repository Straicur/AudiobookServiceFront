import React, { createContext, useState, useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import CreateUtil from 'Util/CreateUtil';

const AdminAudiobookDataContext = createContext(null);

export const AdminAudiobookDataProvider = ({ children, token, audiobookId, setState, i18n }) => {
  const [audiobookDetail, setAudiobookDetail] = useState(null);
  const [refetchState, setRefetchState] = useState(false);

  const { refetch: refetchAudiobookData } = useQuery({
    queryKey: ['dataAudiobookData' + audiobookId],
    queryFn: () =>
      HandleFetch(
        '/admin/audiobook/details',
        'POST',
        {
          audiobookId: audiobookId,
        },
        token,
        i18n.language,
      ),
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
    onError: (e) => {
      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
    onSuccess: (data) => {
      setAudiobookDetail({
        active: data.active,
        age: data.age,
        album: data.album,
        author: data.author,
        avgRating: data.avgRating,
        categories: data.categories,
        description: data.description,
        duration: CreateUtil.createTime(data.duration),
        encoded: data.encoded,
        id: data.id,
        parts: data.parts,
        size: data.size,
        title: data.title,
        version: data.version,
        year: CreateUtil.createDate(data.year),
        ratingAmount: data.ratingAmount,
      });
    },
  });

  useEffect(() => {
    if (refetchState) {
      refetchAudiobookData();
      setRefetchState(!refetchState);
    }
  }, [refetchState]);

  const value = [audiobookDetail, setAudiobookDetail, setRefetchState];

  return (
    <AdminAudiobookDataContext.Provider value={value}>
      {children}
    </AdminAudiobookDataContext.Provider>
  );
};

export const useAdminAudiobookData = () => useContext(AdminAudiobookDataContext);
