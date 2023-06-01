import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { HandleFetch } from "../../../Components/HandleFetch";
import RenderSearchAudiobooksList from "./RenderSearchAudiobooksList";

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
        props.setAudiobooksState({
          ...props.audiobooksState,
          searchAudiobooks: data.audiobooks,
        });
      },
    }
  );

  useEffect(() => {
    if (props.audiobooksState.error != null) {
      throw props.audiobooksState.error;
    }
  }, [props.audiobooksState.error]);

  useEffect(() => {
    if (props.audiobooksState.search) {
      refetch();
    }
  }, [props.audiobooksState.search]);

  return (
    <div>
      <RenderSearchAudiobooksList
        audiobooksState={props.audiobooksState}
        setAudiobooksState={props.setAudiobooksState}
        token={props.token}
        t={props.t}
      />
    </div>
  );
}
