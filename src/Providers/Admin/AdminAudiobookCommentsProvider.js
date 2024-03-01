import React, { createContext, useState, useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';

const AdminAudiobookCommentsContext = createContext(null);

export const AdminAudiobookCommentsProvider = ({
  children,
  token,
  audiobookId,
  setState,
  i18n,
}) => {
  const [audiobookComments, setAudiobookComments] = useState(null);
  const [refetchState, setAudiobookCommnetsRefetchState] = useState(false);

  const { refetch: refetchAudiobookComments } = useQuery({
    queryKey: ['dataAudiobookComments'],
    queryFn: () =>
      HandleFetch(
        '/admin/audiobook/comment/get',
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
      setAudiobookComments(data);
    },
  });

  useEffect(() => {
    if (refetchState) {
      refetchAudiobookComments();
      setAudiobookCommnetsRefetchState(!refetchState);
    }
  }, [refetchState]);

  const value = [audiobookComments, setAudiobookComments, setAudiobookCommnetsRefetchState];

  return (
    <AdminAudiobookCommentsContext.Provider value={value}>
      {children}
    </AdminAudiobookCommentsContext.Provider>
  );
};

export const useAdminAudiobookComments = () => useContext(AdminAudiobookCommentsContext);
