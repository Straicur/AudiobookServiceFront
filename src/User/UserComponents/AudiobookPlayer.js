import React, { useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function AudiobookPlayer(props) {
  const player = useRef(null);

  const nextPart = () => {
    let nextPart = props.audiobookState.part + 1;

    if (nextPart < props.state.detailModalAudiobook.parts) {
      props.addInfo();
      props.timeAudio.current = 0;
      props.setAudiobookState({ ...props.audiobookState, part: nextPart });
    }
  };
  const prevPart = () => {
    let prevPart = props.audiobookState.part - 1;

    if (prevPart >= 0) {
      props.setAudiobookState({ ...props.audiobookState, part: prevPart });
      props.timeAudio.current = 0;
    }
  };

  const timeCur = (audio) => {
    props.timeAudio.current = parseInt(audio.target.currentTime);
  };

  useEffect(() => {
    if (player.current && props.audiobookState.datailEndedTime != null && !props.timeAudio.current) {
      player.current.audio.current.currentTime =
        props.audiobookState.datailEndedTime;
    }
  }, []);
 
  useEffect(() => {
    if (player.current && props.timeAudio.current) {
      player.current.audio.current.currentTime = props.timeAudio.current;
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
      src={window.URL.createObjectURL(new Blob([props.audiobookPart]))}
      onListen={(e) => timeCur(e)}
      autoPlayAfterSrcChange={false}
      showSkipControls={true}
      onClickPrevious={prevPart}
      onClickNext={nextPart}
      volume={0.5}
      ref={player}
    />
  );
}
