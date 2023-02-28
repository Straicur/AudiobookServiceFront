import React, {createContext,useEffect, useState } from "react";
import { useQuery } from "react-query";
import { HandleFetch } from "../../HandleFetch";
import {AudiobookDataContext} from "../AudiobookProviders/AudiobookDataContext"

export const AudiobookDataProvider = ({ children,token,audiobookId }) => {

  const [audiobookDetail, setAudiobookDetail] = useState(null);

  // const {  isLoading: isLoadingThird,
  //   error: errorThird,
  //   data: dataThird,
  //   isFetching: isFetchingThird,
  //   refetch: refetchThird} = useQuery(
  //   "dataThird",
  //   () =>
  //     HandleFetch(
  //       "http://127.0.0.1:8000/api/admin/audiobook/details",
  //       "POST",
  //       {
  //         audiobookId:audiobookId
  //       },
  //       token
  //     ),
  //   {
  //     retry: 1,
  //     retryDelay: 500,
  //     refetchOnWindowFocus: false,
  //     onError: (e) => {
  //       // props.setCategoiesState({
  //       //   ...props.categoiesState,
  //       //   error: e,
  //       // });
  //     },
  //     onSuccess: (data) => {
  //       setAudiobookDetail(data);
  //     },
  //   }
  // );

  useEffect(() => {
    HandleFetch(
      "http://127.0.0.1:8000/api/admin/audiobook/details",
      "POST",
      {
        audiobookId:audiobookId
      },
      token
    )
      .then((data) => {

     setAudiobookDetail(data)
      })
      .catch((e) => {
      });
  }, [])

  return (
    <AudiobookDataContext.Provider value={audiobookDetail}>
      {children}
    </AudiobookDataContext.Provider>
  )
}

