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
    let prevPart = props.audiobookState.part - 1;

    if (prevPart >= 0) {
      props.setAudiobookState({ ...props.audiobookState, part: prevPart });
    }
  };
  //todo tu musze ustawiać state ale to w jakiejś stałej i jeśli mi odświerzy to ustawiać go i autoPlay na true 
  // Przy zmianie parta powinno się zerować (W tych metodach w ifach na 0 to ustawić)
  // To będzie trzymać tylko przy rerenderze więc to może zostać 
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
      autoPlayAfterSrcChange={false}
      showSkipControls={true}
      onClickPrevious={prevPart}
      onClickNext={nextPart}
    />
  );
}
