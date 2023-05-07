import React, { useState, useEffect } from "react";
import RenderAudiobooksList from "./RenderAudiobooksList";
import { useAudiobookUserData } from "../../../Components/Providers/AudiobookProviders/AudiobookUserDataProvider";
import { HandleFetch } from "../../../Components/HandleFetch";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

const ChildMemo = React.memo(RenderAudiobooksList);

export default function GetAllAudiobooks(props) {
  const [audiobooks, setAudiobooks, setRefetchState] = useAudiobookUserData();

  const [coversState, setCoversState] = useState([]);

  const handleScroll = () => {
    console.log("SCROLL");
    // if (props.state.page + 1 <= audiobooks.maxPage) {
    //   props.setState({
    //     ...props.state,
    //     page: props.state.page + 1,
    //   });
    // }
  };
  useBottomScrollListener(handleScroll);

  const getAudiobooksImages = () => {
    let covers = [];

    if (audiobooks != null) {
      setCoversState([]);

      let copy = audiobooks;

      copy.categories.forEach((category) => {
        category.audiobooks.map((audiobook) => {
          HandleFetch(
            "http://127.0.0.1:8000/api/audiobook/cover/" + audiobook.id,
            "GET",
            null,
            props.token
          )
            .then((data) => {
              if (!covers.some((el) => el.audiobook == audiobook.id)) {
                covers.push({
                  audiobook: audiobook.id,
                  url:
                    data != null
                      ? window.URL.createObjectURL(new Blob([data]))
                      : null,
                });
                setCoversState((coversState) => [
                  ...coversState,
                  {
                    audiobook: audiobook.id,
                    url:
                      data != null
                        ? window.URL.createObjectURL(new Blob([data]))
                        : null,
                  },
                ]);
              }
            })
            .catch(() => {
              setCoversState((coversState) => [
                ...coversState,
                {
                  audiobook: audiobook.id,
                  url: null,
                },
              ]);
            });
        });
      });
    }
  };
  console.log(props.state.page)
  // useEffect(() => {
  //   setRefetchState(true);
  // }, [props.state.page]);

  useEffect(() => {
    if (audiobooks != null) {
      getAudiobooksImages();
    }
  }, [audiobooks]);

  return (
    <ChildMemo
      state={props.state}
      setState={props.setState}
      token={props.token}
      t={props.t}
      coversState={coversState}
      audiobooks={audiobooks}
    />
  );
}
