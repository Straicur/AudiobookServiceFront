import React, { createContext, useState, useContext, useEffect } from "react";
import { HandleFetch } from "../../HandleFetch";

const AudiobookUserDataContext = createContext(null);

export const AudiobookUserDataProvider = ({
  children,
  token,
  page,
  limit,
  state,
  setState,
}) => {
  const [audiobooks, setAudiobooks] = useState(null);
  const [refetchState, setRefetchState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const fetchData = () => {
    setLoading(true);
    HandleFetch(
      "http://127.0.0.1:8000/api/user/audiobooks",
      "POST",
      {
        page: page,
        limit: limit,
      },
      token
    )
      .then((data) => {
        if (audiobooks == null) {
          setAudiobooks(data);
        } else if (audiobooks.categories != undefined) {
          let newCategories = audiobooks.categories.concat(data.categories);

          setAudiobooks({
            ...audiobooks,
            categories: newCategories,
            page: data.page,
          });
        }
        setHasMore(data.maxPage > page+1);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setState({
          ...state,
          error: e,
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    fetchData();
  }, []);

  const value = [audiobooks, loading, hasMore, setAudiobooks, setRefetchState];

  return (
    <AudiobookUserDataContext.Provider value={value}>
      {children}
    </AudiobookUserDataContext.Provider>
  );
};

export const useAudiobookUserData = () => useContext(AudiobookUserDataContext);
