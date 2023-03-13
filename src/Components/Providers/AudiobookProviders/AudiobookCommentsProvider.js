import React, { createContext, useState, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { HandleFetch } from "../../HandleFetch";

const AudiobookCommentsContext = createContext(null);

export const AudiobookCommentsProvider = ({
  children,
  token,
  audiobookId,
  categoryKey,
}) => {
  const [audiobookComments, setAudiobookComments] = useState(null);
  const [refetchState, setRefetchState] = useState(false);

  const {
    isLoading: isLoadingAudiobookComments,
    error: errorAudiobookComments,
    data: dataAudiobookComments,
    isFetching: isFetchingAudiobookComments,
    refetch: refetchAudiobookComments,
  } = useQuery(
    "dataAudiobookComments",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/audiobook/comment/get",
        "POST",
        {
          audiobookId: audiobookId,
          categoryKey: categoryKey,
        },
        token
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {},
      onSuccess: (data) => {
        setAudiobookComments(data);
      },
    }
  );

  useEffect(() => {
    if (!refetchState) {
      refetchAudiobookComments();
      setRefetchState(!refetchState);
    }
  }, [refetchState]);

  const value = [audiobookComments, setAudiobookComments, setRefetchState];
  return (
    <AudiobookCommentsContext.Provider value={value}>
      {children}
    </AudiobookCommentsContext.Provider>
  );
};

export const useAudiobookComments = () => useContext(AudiobookCommentsContext);
