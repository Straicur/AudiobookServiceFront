import React, { createContext, useState, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { HandleFetch } from "../../HandleFetch";

const AudiobookUserProposedContext = createContext(null);

export const AudiobookUserProposedProvider = ({
  children,
  token,
  state,
  setState,
  i18n
}) => {
  const [audiobookProposed, setAudiobookProposed] = useState(null);
  const [refetchState, setRefetchState] = useState(false);

  const {
    isLoading: isLoadingAudiobookUserProposed,
    error: errorAudiobookUserProposed,
    data: dataAudiobookUserProposed,
    isFetching: isFetchingAudiobookUserProposed,
    refetch: refetchAudiobookUserProposed,
  } = useQuery(
    "dataAudiobookUserProposed",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/user/proposed/audiobooks",
        "GET",
        null,
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
        setAudiobookProposed(data);
      },
    }
  );

  useEffect(() => {
    if (refetchState) {
      refetchAudiobookUserProposed();
      setRefetchState(!refetchState);
    }
  }, [refetchState]);

  const value = [audiobookProposed, setAudiobookProposed, setRefetchState];

  return (
    <AudiobookUserProposedContext.Provider value={value}>
      {children}
    </AudiobookUserProposedContext.Provider>
  );
};

export const useAudiobookUserProposed = () =>
  useContext(AudiobookUserProposedContext);
