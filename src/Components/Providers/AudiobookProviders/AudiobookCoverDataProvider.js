import React, { createContext, useState, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { HandleFetch } from "../../HandleFetch";

const AudiobookCoverContext = createContext(null);

export const AudiobookCoverDataProvider = ({
  children,
  token,
  audiobookId,
}) => {
  const [audiobookCover, setAudiobookCover] = useState(null);
  const [refetchState, setRefetchState] = useState(false);

  const {
    isLoading: isLoadingAudiobookCover,
    error: errorAudiobookCover,
    data: dataAudiobookCover,
    isFetching: isFetchingAudiobookCover,
    refetch: refetchAudiobookCover,
  } = useQuery(
    "dataAudiobookCover",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/audiobook/cover/" + audiobookId,
        "GET",
        null,
        token
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {},
      onSuccess: (data) => {
        setAudiobookCover(data);
      },
    }
  );

  useEffect(() => {
    if (refetchState) {
      refetchAudiobookCover();
      setRefetchState(!refetchState);
    }
  }, [refetchState]);

  const value = [audiobookCover, setAudiobookCover, setRefetchState];

  return (
    <AudiobookCoverContext.Provider value={value}>
      {children}
    </AudiobookCoverContext.Provider>
  );
};

export const useAudiobookCover = () => useContext(AudiobookCoverContext);
