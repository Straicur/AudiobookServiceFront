import React, { createContext, useState, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { HandleFetch } from "../../HandleFetch";
import { CreateDate } from "../../../Components/CrateDate";
import { CreateTime } from "../../../Components/CreateTime";

const AudiobookUserDetailContext = createContext(null);

export const AudiobookUserDetailProvider = ({
  children,
  token,
  audiobookId,
  categoryKey,
  state,
  setState,
  i18n,
}) => {
  const [audiobookDetail, setAudiobookDetail] = useState(null);
  const [refetchState, setRefetchState] = useState(false);

  const {
    isLoading: isLoadingAudiobookDetail,
    error: errorAudiobookDetail,
    data: dataAudiobookDetail,
    isFetching: isFetchingAudiobookDetail,
    refetch: refetchAudiobookData,
  } = useQuery(
    "dataAudiobookDetail",
    () =>
      HandleFetch(
        "/user/audiobook/details",
        "POST",
        {
          audiobookId: audiobookId,
          categoryKey: categoryKey,
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
          age: data.age,
          album: data.album,
          author: data.author,
          categories: data.categories,
          comments: data.comments,
          description: data.description,
          duration: CreateTime(data.duration),
          id: data.id,
          inList: data.inList,
          parts: data.parts,
          title: data.title,
          version: data.version,
          year: CreateDate(data.year),
          canRate: data.canRate,
          canComment: data.canComment,
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
    <AudiobookUserDetailContext.Provider value={value}>
      {children}
    </AudiobookUserDetailContext.Provider>
  );
};

export const useAudiobookDetail = () => useContext(AudiobookUserDetailContext);
