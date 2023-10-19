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
  i18n,
}) => {
  const [audiobooks, setAudiobooks] = useState(null);
  const [refetchState, setRefetchState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const fetchData = () => {
    setLoading(true);
    HandleFetch(
      "/user/audiobooks",
      "POST",
      {
        page: page,
        limit: limit,
      },
      token,
      i18n.language
    )
      .then((data) => {
        setHasMore(data.maxPage > page + 1);
        setLoading(false);

        if (audiobooks == null) {
          setAudiobooks(data);
        } else if (audiobooks.categories != undefined) {
          setAudiobooks({
            ...audiobooks,
            categories: [
              ...audiobooks.categories,
              ...data.categories.map((category) => category),
            ],
            page: data.page,
          });
        }
      })
      .catch((e) => {
        setState({
          ...state,
          error: e,
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [page, refetchState]);

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
