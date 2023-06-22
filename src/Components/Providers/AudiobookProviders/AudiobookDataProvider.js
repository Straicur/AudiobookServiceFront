import React, { createContext, useState, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { HandleFetch } from "../../HandleFetch";
import { CreateDate } from "../../../Components/CrateDate";
import { CreateTime } from "../../../Components/CreateTime";

const AudiobookDataContext = createContext(null);

export const AudiobookDataProvider = ({
  children,
  token,
  audiobookId,
  state,
  setState,
  i18n
}) => {
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
        setAudiobookDetail({
          active: data.active,
          age: data.age,
          album: data.album,
          author: data.author,
          avgRating: data.avgRating,
          categories: data.categories,
          description: data.description,
          duration: CreateTime(data.duration),
          encoded: data.encoded,
          id: data.id,
          parts: data.parts,
          size: data.size,
          title: data.title,
          version: data.version,
          year: CreateDate(data.year),
        });
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
