import React, { useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function AudiobookPlayer(props) {
  const player = useRef(null);
  const timeAudio = useRef(0);

  const nextPart = () => {
    let nextPart = props.audiobookState.part + 1;

    if (nextPart < props.audiobookDetail.parts) {
      timeAudio.current = 0;
      props.setAudiobookState({ ...props.audiobookState, part: nextPart });
    }
  };

  const timeCur = (audio) => {
    timeAudio.current = parseInt(audio.target.currentTime);
  };

  const prevPart = () => {
    let prevPart = props.audiobookState.part - 1;

    if (prevPart >= 0) {
      timeAudio.current = 0;
      props.setAudiobookState({ ...props.audiobookState, part: prevPart });
    }
  };
 
  useEffect(() => {
    if (player.current && timeAudio.current) {
      player.current.audio.current.currentTime = timeAudio.current;
    }
  }, [props]);
 
  return (
    <AudioPlayer
      header={
        <div className="row  justify-content-center">
          <div className="col-2 fs-5 text-center">
            {props.t("part")}: {props.audiobookState.part + 1}
          </div>
        </div>
      }
      autoPlay={false}
      src={props.audiobookPart}
      onListen={(e) => timeCur(e)}
      autoPlayAfterSrcChange={false}
      showSkipControls={true}
      onClickPrevious={prevPart}
      onClickNext={nextPart}
      ref={player}
    />
  );
}
