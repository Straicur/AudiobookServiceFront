import React, { createContext, useState, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { HandleFetch } from "../../HandleFetch";

const AudiobookSearchContext = createContext(null);

export const AudiobookSearchProvider = ({
  children,
  token,
  page,
  limit,
  title,
  state,
  setState,
}) => {
  const [audiobookSearch, setAudiobookSearch] = useState(null);
  const [refetchState, setRefetchState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const {
    isLoading: isLoadingAudiobookData,
    error: errorAudiobookData,
    data: dataAudiobookData,
    isFetching: isFetchingAudiobookData,
    refetch: refetchAudiobookData,
  } = useQuery(
    "dataAudiobookSearch",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/user/audiobooks/search",
        "POST",
        {
          page: page,
          limit: limit,
          title: title,
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
        setAudiobookSearch(data.audiobooks);
        setHasMore(data.maxPage > page + 1);
        setLoading(false);
      },
    }
  );

  useEffect(() => {
    refetchAudiobookData();
  }, [page]);

  useEffect(() => {
    if (refetchState) {
      refetchAudiobookData();
      setRefetchState(!refetchState);
    }
  }, [refetchState]);

  const value = [
    audiobookSearch,
    loading,
    hasMore,
    setAudiobookSearch,
    setRefetchState,
  ];

  return (
    <AudiobookSearchContext.Provider value={value}>
      {children}
    </AudiobookSearchContext.Provider>
  );
};

export const useAudiobookSearch = () => useContext(AudiobookSearchContext);
