import React, { createContext,useEffect, useState, useContext } from "react";
import { useQuery } from "react-query";
import { HandleFetch } from "../../HandleFetch";

const AudiobookPartContext = createContext(null);

export const AudiobookPartProvider = ({
  children,
  token,
  audiobookId,
  part,
}) => {
  const [audiobookPart, setAudiobookPart] = useState(null);
  const {
    isLoading: isLoadingAudiobookPart,
    error: errorAudiobookPart,
    data: dataAudiobookPart,
    isFetching: isFetchingAudiobookPart,
    refetch: refetchAudiobookPart,
  } = useQuery(
    "dataAudiobookPart",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/audiobook/part",
        "POST",
        {
          audiobookId: audiobookId,
          part: part,
        },
        token
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {},
      onSuccess: (data) => {
        setAudiobookPart(data);
      },
    }
    );
    const value = [audiobookPart, setAudiobookPart]

  useEffect(() => {
    refetchAudiobookPart()
  },[part]);

  return (
    <AudiobookPartContext.Provider value={value}>
      {children}
    </AudiobookPartContext.Provider>
  );
};

export const useAudiobookPart = () => useContext(AudiobookPartContext);
