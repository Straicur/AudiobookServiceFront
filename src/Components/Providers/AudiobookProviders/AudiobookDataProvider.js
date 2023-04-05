import React, { createContext, useState, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { HandleFetch } from "../../HandleFetch";

const AudiobookDataContext = createContext(null);

export const AudiobookDataProvider = ({ children, token, audiobookId }) => {
  const [audiobookDetail, setAudiobookDetail] = useState(null);
  const [refetchState, setRefetchState] = useState(false);

  const {
    isLoading: isLoadingAudiobookData,
    error: errorAudiobookData,
    data: dataAudiobookData,
    isFetching: isFetchingAudiobookData,
    refetch: refetchAudiobookData,
  } = useQuery(
    "dataAudiobookData",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/admin/audiobook/details",
        "POST",
        {
          audiobookId: audiobookId,
        },
        token
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {},
      onSuccess: (data) => {
        setAudiobookDetail(data);
      },
    }
  );

  useEffect(() => {
    if (refetchState) {
      refetchAudiobookData();
      setRefetchState(!refetchState);
    }
  }, [refetchState]);

  const value = [audiobookDetail, setAudiobookDetail, setRefetchState];

  return (
    <AudiobookDataContext.Provider value={value}>
      {children}
    </AudiobookDataContext.Provider>
  );
};

export const useAudiobookData = () => useContext(AudiobookDataContext);
