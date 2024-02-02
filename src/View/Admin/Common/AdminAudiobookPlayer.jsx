import React, { useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default function AdminAudiobookPlayer(props) {
  console.log(props);
  const player = useRef(null);
  const timeAudio = useRef(0);

  const nextPart = () => {
    let nextPart = props.part + 1;

    if (nextPart < props.parts) {
      timeAudio.current = 0;
      props.setState({ ...props.state, part: nextPart });
    }
  };

  const timeCur = (audio) => {
    timeAudio.current = parseInt(audio.target.currentTime);
  };

  const prevPart = () => {
    let prevPart = props.state.part - 1;

    if (prevPart >= 0) {
      timeAudio.current = 0;
      props.setState({ ...props.state, part: prevPart });
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
        <div className='row  justify-content-center'>
          <div className='col-2 fs-5 text-center'>
            {props.t('part')}: {props.part + 1}
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
      volume={0.5}
      ref={player}
    />
  );
}
