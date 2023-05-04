import React, { createContext, useState, useContext, useEffect } from "react";
import { useAudiobookUserData } from "./AudiobookUserDataProvider";
import { HandleFetch } from "../../HandleFetch";
import { useAudiobookCoverListStore } from "../../../store";

const UserAudiobooksContext = createContext(null);

export const AudiobooksImagesProvider = ({
  children,
  token,
  state,
  setState,
}) => {
  const [audiobooksCovers, setAudiobooksCovers] = useState(null);
  const [userAudiobooks, setUserAudiobooks, setRefetchUserAudiobooksState] =
    useAudiobookUserData();

  const audiobookCoverListStore = useAudiobookCoverListStore();

  const audiobooks = useAudiobookCoverListStore((state) => state.audiobooks);
  const dateUpdate = useAudiobookCoverListStore((state) => state.dateUpdate);

  const getAudiobooksImages = () => {
    let copy = userAudiobooks;
    copy.categories.forEach((category) => {
      category.audiobooks.map((audiobook) => {
        HandleFetch(
          "http://127.0.0.1:8000/api/audiobook/cover/" + audiobook.id,
          "GET",
          null,
          token
        )
          .then((data) => {
            if (dateUpdate < Date.now()) {
              audiobookCoverListStore.removeCover(audiobook.id);
              audiobookCoverListStore.addCover({
                audiobook: audiobook.id,
                url:
                  data != null
                    ? window.URL.createObjectURL(new Blob([data]))
                    : null,
              });
            }
          })
          .catch((e) => {
            setState({
              ...state,
              error: e,
            });
          });
      });
    });
    setAudiobooksCovers(audiobooks);
  };

  useEffect(() => {
    if (userAudiobooks != null) {
      getAudiobooksImages();
    }
  }, [userAudiobooks]);

  const value = [audiobooksCovers, setAudiobooksCovers];

  return (
    <UserAudiobooksContext.Provider value={value}>
      {children}
    </UserAudiobooksContext.Provider>
  );
};

export const useUserAudiobooks = () => useContext(UserAudiobooksContext);
