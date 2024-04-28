import React, { useLayoutEffect } from 'react';
import UserMainRenderAudiobooksList from './UserMainRenderAudiobooksList';
import { useUserAudiobookData } from 'Providers/User/UserAudiobooksProvider';
import UserMainRenderProposedList from './UserMainRenderProposedList';
import { useUserAudiobookProposed } from 'Providers/User/UserAudiobookProposedProvider';

export default function GetAllAudiobooks(props) {
  const [audiobooks, refreshAudiooks, loadingAudiobooks] = useUserAudiobookData();
  const [audiobookProposed, refreshProposed, loadingProposed] = useUserAudiobookProposed();

  useLayoutEffect(() => {
    if (props.state.refresh) {
      props.setState((prev) => ({
        ...prev,
        refresh: true,
      }));

      refreshAudiooks();
    }
  }, [props.state.refresh]);

  return (
    <div>
      {loadingAudiobooks || loadingProposed ? (
        <div className='text-center'>
          <div className='spinner-border text-info spinner my-5' role='status'></div>
        </div>
      ) : (
        <div>
          <UserMainRenderProposedList
            state={props.state}
            setState={props.setState}
            token={props.token}
            t={props.t}
            audiobookProposed={audiobookProposed}
            refresh={refreshProposed}
          />
          <UserMainRenderAudiobooksList
            state={props.state}
            setState={props.setState}
            token={props.token}
            t={props.t}
            audiobooks={audiobooks}
            audiobookProposed={audiobookProposed}
            refresh={refreshAudiooks}
          />
        </div>
      )}
    </div>
  );
}
