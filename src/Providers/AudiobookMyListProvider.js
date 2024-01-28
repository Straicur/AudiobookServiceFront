import React, { createContext, useState, useContext, useEffect } from 'react';
import { HandleFetch } from 'Util/HandleFetch';

const AudiobookMyContext = createContext(null);

export const AudiobookMyListProvider = ({ children, token, state, setState, i18n }) => {
  const [audiobooks, setAudiobooks] = useState(null);
  const [refetchState, setRefetchState] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    HandleFetch('/user/myList/audiobooks', 'GET', null, token, i18n.language)
      .then((data) => {
        setLoading(false);
        setAudiobooks(data.audiobooks);
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
  }, []);

  const value = [audiobooks, loading, setAudiobooks, setRefetchState];

  return <AudiobookMyContext.Provider value={value}>{children}</AudiobookMyContext.Provider>;
};

export const useAudiobookMy = () => useContext(AudiobookMyContext);
