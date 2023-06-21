import React, { createContext, useState, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { HandleFetch } from "../../HandleFetch";

const AudiobookUserCommentsContext = createContext(null);

export const AudiobookUserCommentsProvider = ({
  children,
  token,
  audiobookId,
  categoryKey,
  state,
  setState,
}) => {
  const [audiobookUserComments, setAudiobookUserComments] = useState(null);
  const [refetchState, setAudiobookCommnetsRefetchState] = useState(false);

  const {
    isLoading: isLoadingAudiobookUserComments,
    error: errorAudiobookUserComments,
    data: dataAudiobookUserComments,
    isFetching: isFetchingAudiobookUserComments,
    refetch: refetchAudiobookUserComments,
  } = useQuery(
    "dataAudiobookUserComments",
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
      onError: (e) => {
        setState({ ...state, error: e });
      },
      onSuccess: (data) => {
        setAudiobookUserComments(data.comments);
      },
    }
  );

  useEffect(() => {
    if (refetchState) {
      refetchAudiobookUserComments();
      setAudiobookCommnetsRefetchState(!refetchState);
    }
  }, [refetchState]);

  const value = [
    audiobookUserComments,
    setAudiobookUserComments,
    setAudiobookCommnetsRefetchState,
  ];

  return (
    <AudiobookUserCommentsContext.Provider value={value}>
      {children}
    </AudiobookUserCommentsContext.Provider>
  );
};

export const useAudiobookUserComments = () =>
  useContext(AudiobookUserCommentsContext);
