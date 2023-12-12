import React, { createContext, useEffect, useState, useContext } from "react";
import { useQuery } from "react-query";
import { HandleFetch } from "../../HandleFetch";

const AudiobookPartContext = createContext(null);

export const AudiobookPartProvider = ({
  children,
  token,
  audiobookId,
  part,
  state,
  setState,
  i18n,
}) => {
  const [audiobookPart, setAudiobookPart] = useState(null);
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
        i18n.language,
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {
        setState({ ...state, error: e });
      },
      onSuccess: (data) => {
        setAudiobookPart(process.env.REACT_APP_API_URL + data.url);
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

  const value = [audiobookPart, setAudiobookPart, setRefetchState];

  return (
    <AudiobookPartContext.Provider value={value}>
      {children}
    </AudiobookPartContext.Provider>
  );
};

export const useAudiobookPart = () => useContext(AudiobookPartContext);
