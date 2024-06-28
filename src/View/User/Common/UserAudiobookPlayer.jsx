import React, { useLayoutEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default function UserAudiobookPlayer(props) {
  const player = useRef(null);
  const duration = useRef(0);

  const nextPart = () => {
    let nextPart = props.part + 1;

    if (nextPart < props.parts) {
      props.addInfo();
      props.timeAudio.current = 0;
      props.setState((prev) => ({
        ...prev,
        part: nextPart,
      }));
    }
  };
  const prevPart = () => {
    let prevPart = props.part - 1;

    if (prevPart >= 0) {
      props.setState((prev) => ({
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

  useLayoutEffect(() => {
    if (
      player.current &&
      props.audiobookInfo &&
      props.audiobookInfo.endedTime != null &&
      props.timeAudio.current &&
      props.audiobookState.firstRenderAudiobookInfo
    ) {
      player.current.audio.current.currentTime = props.timeAudio.current;
    }
  }, [props.audiobookState.firstRenderAudiobookInfo]);

  //TODO to jest do przetestowania i znalezienia błędu jeszcze

  useLayoutEffect(() => {
    if (
      player.current &&
      props.timeAudio.current &&
      props.audiobookState.firstRenderAudiobookInfo &&
      props.audiobookState.renderAudiobookPlayer
    ) {
      let procent = ((props.timeAudio.current / duration.current) * 100).toFixed(2) + '%';

      player.current.progressBar.current.setAttribute('aria-valuenow', procent);
      player.current.progressBar.current.childNodes[0].childNodes[0].style.left = procent;
      player.current.progressBar.current.childNodes[0].childNodes[1].style.width = procent;

      player.current.audio.current.currentTime = props.timeAudio.current;

      props.setState((prev) => ({
        ...prev,
        renderAudiobookPlayer: false,
      }));
    }
  }, [props.audiobookState.renderAudiobookPlayer]);

  // useLayoutEffect(() => {
  //   if (
  //     props.newPart &&
  //     player.current &&
  //     (props.audiobookInfo || props.audiobookInfo.endedTime == null)
  //   ) {
  //     player.current.progressBar.current.setAttribute('aria-valuenow', '0%');
  //     player.current.progressBar.current.childNodes[0].childNodes[0].style.left = '0%';
  //     player.current.progressBar.current.childNodes[0].childNodes[1].style.width = '0%';

  //     props.setState((prev) => ({
  //       ...prev,
  //       newPart: false,
  //     }));
  //   }
  // }, [props.newPart]);
  console.log(props.timeAudio.current);
  console.log(props.audiobookInfo);
  return (
    <AudioPlayer
      header={
        <div className='row  justify-content-center'>
          <div className='col-2 fs-5 text-center'>
            {props.t('part')}: {props.part + 1}
          </div>
        </div>
      }
      autoPlay={false}
      src={process.env.REACT_APP_API_URL + props.audiobookPart.url}
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
