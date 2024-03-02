import React, { useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default function UserAudiobookPlayer(props) {
  const player = useRef(null);
  const duration = useRef(0);

  const nextPart = () => {
    let nextPart = props.audiobookState.part + 1;

    if (nextPart < props.state.detailModalAudiobook.parts) {
      props.addInfo();
      props.timeAudio.current = 0;
      props.setAudiobookState((prev) => ({
        ...prev,
        part: nextPart,
      }));
    }
  };
  const prevPart = () => {
    let prevPart = props.audiobookState.part - 1;

    if (prevPart >= 0) {
      props.setAudiobookState((prev) => ({
        ...prev,
        part: prevPart,
      }));
      props.timeAudio.current = 0;
    }
  };

  const timeCur = (audio) => {
    props.timeAudio.current = parseInt(audio.target.currentTime);
    if (duration.current == 0) {
      duration.current = audio.target.duration;
    }
  };

  const setDuration = (event) => {
    props.audioDuration.current = parseInt(event.target.duration);
  };

  useEffect(() => {
    if (
      player.current &&
      props.audiobookInfo &&
      props.audiobookInfo.endedTime != null &&
      !props.timeAudio.current &&
      !props.audiobookState.newPart
    ) {
      player.current.audio.current.currentTime = props.audiobookInfo.endedTime;
    }
  }, []);

  //TODO to jest do przetestowania i znalezienia błędu jeszcze

  useEffect(() => {
    if (
      player.current &&
      props.timeAudio.current &&
      !props.audiobookState.newPart &&
      props.audiobookState.renderAudiobookPlayer
    ) {
      let procent = ((props.timeAudio.current / duration.current) * 100).toFixed(2) + '%';
      console.log(procent);
      player.current.progressBar.current.setAttribute('aria-valuenow', procent);
      player.current.progressBar.current.childNodes[0].childNodes[0].style.left = procent;
      player.current.progressBar.current.childNodes[0].childNodes[1].style.width = procent;

      player.current.audio.current.currentTime = props.timeAudio.current;

      props.setAudiobookState((prev) => ({
        ...prev,
        renderAudiobookPlayer: false,
      }));
    }
  }, [props.audiobookState.renderAudiobookPlayer]);

  useEffect(() => {
    if (
      props.audiobookState.newPart &&
      player.current &&
      (props.audiobookInfo || props.audiobookInfo.endedTime == null)
    ) {
      player.current.progressBar.current.setAttribute('aria-valuenow', '0%');
      player.current.progressBar.current.childNodes[0].childNodes[0].style.left = '0%';
      player.current.progressBar.current.childNodes[0].childNodes[1].style.width = '0%';

      props.setAudiobookState((prev) => ({
        ...prev,
        newPart: false,
      }));
    }
  }, [props.audiobookState.newPart]);

  return (
    <AudioPlayer
      header={
        <div className='row  justify-content-center'>
          <div className='col-2 fs-5 text-center'>
            {props.t('part')}: {props.audiobookState.part + 1}
          </div>
        </div>
      }
      autoPlay={false}
      src={
        props.audiobookPart != null ? process.env.REACT_APP_API_URL + props.audiobookPart.url : ''
      }
      onListen={(e) => timeCur(e)}
      onLoadedMetaData={(e) => setDuration(e)}
      autoPlayAfterSrcChange={false}
      showSkipControls={true}
      onClickPrevious={prevPart}
      onClickNext={nextPart}
      volume={0.5}
      ref={player}
    />
  );
}
