import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function AudiobookPlayer(props) {
  const nextPart = () => {
    let nextPart = props.state.detailAudiobookElementPart + 1;

    if (nextPart < props.state.detailAudiobookElement.parts) {
      props.setState({ ...props.state, detailAudiobookElementPart: nextPart });
    }
  };
  const prevPart = () => {
    let prevPart = props.state.detailAudiobookElementPart - 1;

    if (prevPart >= 0) {
      props.setState({ ...props.state, detailAudiobookElementPart: prevPart });
    }
  };

  return (
    <AudioPlayer
    header={
      <div className="row  justify-content-center">
        <div className="col-2 fs-5 text-center">
          {props.t("part")}: {props.state.detailAudiobookElementPart+1}
        </div>
      </div>
    }
      autoPlay={false}
      src={window.URL.createObjectURL(new Blob([props.audiobookPart]))}
      autoPlayAfterSrcChange={false}
      showSkipControls={true}
      onClickPrevious={prevPart}
      onClickNext={nextPart}
    />
  );
}