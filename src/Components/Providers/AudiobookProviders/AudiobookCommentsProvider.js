import React, { createContext, useState, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { HandleFetch } from "../../HandleFetch";

const AudiobookCommentsContext = createContext(null);

export const AudiobookCommentsProvider = ({
  children,
  token,
  audiobookId,
  state,
  setState,
  i18n,
}) => {
  const [audiobookComments, setAudiobookComments] = useState(null);
  const [refetchState, setAudiobookCommnetsRefetchState] = useState(false);

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
        "/admin/audiobook/comment/get",
        "POST",
        {
          audiobookId: audiobookId,
        },
        token,
        i18n.language
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {
        setState({ ...state, error: e });
      },
      onSuccess: (data) => {
        setAudiobookComments(data);
      },
    }
  );

  useEffect(() => {
    if (refetchState) {
      refetchAudiobookComments();
      setAudiobookCommnetsRefetchState(!refetchState);
    }
  }, [refetchState]);

  const value = [
    audiobookComments,
    setAudiobookComments,
    setAudiobookCommnetsRefetchState,
  ];

  return (
    <AudiobookCommentsContext.Provider value={value}>
      {children}
    </AudiobookCommentsContext.Provider>
  );
};

export const useAudiobookComments = () => useContext(AudiobookCommentsContext);
