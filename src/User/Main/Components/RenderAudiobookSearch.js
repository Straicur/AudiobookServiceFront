import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { HandleFetch } from "../../../Components/HandleFetch";

export default function RenderAudiobookSearch(props) {
  const { isLoading, error, data, isFetching, refetch } = useQuery(
    "data",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/user/audiobooks/search",
        "POST",
        {
          page: 0,
          limit: 10,
          title: props.audiobooksState.searchText,
        },
        props.token
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {
        props.setAudiobooksState({
          ...props.audiobooksState,
          error: e,
        });
      },
      onSuccess: (data) => {
        console.log(data.audiobooks);
        // props.setAudiobooksState({
        //   ...props.audiobooksState,
        //   searchAudiobooks: data.users,
        // });
      },
    }
  );

  useEffect(() => {
    if (props.audiobooksState.error != null) {
      throw props.audiobooksState.error;
    }
  }, [props.audiobooksState.error]);

  
  useEffect(() => {
    refetch()
  }, [props.audiobooksState.searchText]);

  return <div></div>;
}
