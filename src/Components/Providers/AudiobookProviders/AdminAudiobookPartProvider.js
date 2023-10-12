import React, { createContext, useEffect, useState, useContext, useMemo } from "react";
import { useQuery } from "react-query";
import { HandleFetch } from "../../HandleFetch";

const AudiobookPartContext = createContext(null);

export const AdminAudiobookPartProvider = ({
  children,
  token,
  audiobookId,
  part,
  state,
  setState,
  i18n,
}) => {
  const [refetchState, setRefetchState] = useState(false);

  const createContext = () => {
    let json = {
      audiobookId: audiobookId,
    };

    if (part == undefined || part == NaN) {
      json.part = 0;
    } else {
      json.part = part;
    }
    return json;
  };

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
        "/audiobook/part",
        "POST",
        createContext(),
        token,
        i18n.language
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      enabled: false,
      onError: (e) => {
        setState({ ...state, errorPart: e.data });
      },
    }
  );

  useEffect(() => {
    refetchAudiobookPart();
  }, [part]);

  useEffect(() => {
    if (refetchState) {
      refetchAudiobookPart();
      setRefetchState(!refetchState);
    }
  }, [refetchState]);

  const memoizedAudiobookPart = useMemo(() => dataAudiobookPart, [dataAudiobookPart]);

  const value = [memoizedAudiobookPart, setRefetchState];

  return (
    <AudiobookPartContext.Provider value={value}>
      {children}
    </AudiobookPartContext.Provider>
  );
};

export const useAudiobookPart = () => useContext(AudiobookPartContext);
