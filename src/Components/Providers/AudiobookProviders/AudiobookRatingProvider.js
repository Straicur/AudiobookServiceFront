import React, { createContext, useState, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { HandleFetch } from "../../HandleFetch";

const AudiobookRatingContext = createContext(null);

export const AudiobookRatingProvider = ({
  children,
  token,
  audiobookId,
  categoryKey,
  state,
  setState,
}) => {
  const [audiobookRating, setAudiobookRating] = useState(null);
  const [refetchState, setRefetchState] = useState(false);

  const {
    isLoading: isLoadingAudiobookData,
    error: errorAudiobookData,
    data: dataAudiobookData,
    isFetching: isFetchingAudiobookData,
    refetch: refetchAudiobookData,
  } = useQuery(
    "dataAudiobookRating",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/user/audiobook/rating/get",
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
        setAudiobookRating(data.ratingPercent);
      },
    }
  );

  useEffect(() => {
    if (refetchState) {
      refetchAudiobookData();
      setRefetchState(!refetchState);
    }
  }, [refetchState]);

  const value = [audiobookRating, setAudiobookRating, setRefetchState];

  return (
    <AudiobookRatingContext.Provider value={value}>
      {children}
    </AudiobookRatingContext.Provider>
  );
};

export const useAudiobookRating = () => useContext(AudiobookRatingContext);
