import React, { createContext, useState, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { HandleFetch } from "../../HandleFetch";

const AudiobookUserDataContext = createContext(null);

export const AudiobookUserDataProvider = ({
  children,
  token,
  page,
  limit,
  state,
  setState,
}) => {
  const [audiobooks, setAudiobooks] = useState(null);
  const [refetchState, setRefetchState] = useState(false);

  const {
    isLoading: isLoadingAudiobookUserData,
    error: errorAudiobookUserData,
    data: dataAudiobookUserData,
    isFetching: isFetchingAudiobookUserData,
    refetch: refetchAudiobookUserData,
  } = useQuery(
    "dataAudiobookUserData",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/user/audiobooks",
        "POST",
        {
            page: page,
            limit:limit
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
        setAudiobooks(data);
      },
    }
  );

  useEffect(() => {
    if (refetchState) {
      refetchAudiobookUserData();
      setRefetchState(!refetchState);
    }
  }, [refetchState]);

  const value = [audiobooks, setAudiobooks, setRefetchState];

  return (
    <AudiobookUserDataContext.Provider value={value}>
      {children}
    </AudiobookUserDataContext.Provider>
  );
};

export const useAudiobookUserData = () => useContext(AudiobookUserDataContext);
