import React, {useContext, useState } from "react";
import { useQuery } from "react-query";
import { HandleFetch } from "../../HandleFetch";

const Context = React.createContext(null);

export const AudiobookDataProvider = ({ children,token,audiobookId }) => {

  const [audiobookDetail, setAudiobookDetail] = useState(null);

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    "data",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/admin/audiobook/details",
        "POST",
        {
          audiobookId:audiobookId
        },
        token
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {
        // props.setCategoiesState({
        //   ...props.categoiesState,
        //   error: e,
        // });
      },
      onSuccess: (data) => {
        setAudiobookDetail(data);
      },
    }
  );

  return (
    <Context.Provider value={audiobookDetail}>
      {children}
    </Context.Provider>
  )
}

export const useAudiobookDetail = () => useContext(Context);