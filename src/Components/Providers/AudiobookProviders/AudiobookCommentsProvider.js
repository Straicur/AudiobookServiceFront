import React, {createContext, useState ,useContext} from "react";
import { useQuery } from "react-query";
import { HandleFetch } from "../../HandleFetch";

const AudiobookCommentsContext = createContext(null);

export const AudiobookCommentsProvider = ({ children,token,audiobookId, categoryKey }) => {

  const [audiobookComments, setAudiobookComments] = useState(null);
  console.log(categoryKey)
  console.log(audiobookId)
  const {  isLoading: isLoadingAudiobookComments,
    error: errorAudiobookComments,
    data: dataAudiobookComments,
    isFetching: isFetchingAudiobookComments,
    refetch: refetchAudiobookComments} = useQuery(
    "dataAudiobookComments",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/audiobook/comment/get",
        "POST",
        {
          audiobookId:audiobookId,
          categoryKey:categoryKey
        },
        token
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {
      },
      onSuccess: (data) => {
        setAudiobookComments(data);
      },
    }
  );

  return (
    <AudiobookCommentsContext.Provider value={audiobookComments}>
      {children}
    </AudiobookCommentsContext.Provider>
  )
}

export const useAudiobookComments = () => useContext(AudiobookCommentsContext);