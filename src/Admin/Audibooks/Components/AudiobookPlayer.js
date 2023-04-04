import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function AudiobookPlayer(props) {

  const nextPart = () => {
    let nextPart = props.audiobookState.part + 1;

    if (nextPart < props.audiobookDetail.parts) {
      props.setAudiobookState({ ...props.audiobookState, part: nextPart });
    }
  };
  const prevPart = () => {
    let prevPart = props.audiobookState.part  - 1;

    if (prevPart >= 0) {
      props.setAudiobookState({ ...props.audiobookState, part: prevPart });
    }
  };

  return (
    <AudioPlayer
      autoPlay={false}
      src={window.URL.createObjectURL(new Blob([props.audiobookPart]))}
      autoPlayAfterSrcChange={false}
      showSkipControls={true}
      onClickPrevious={prevPart}
      onClickNext={nextPart}
    />
  );
}