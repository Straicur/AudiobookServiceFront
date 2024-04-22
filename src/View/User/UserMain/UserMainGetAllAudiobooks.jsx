import React from 'react';
import UserMainRenderAudiobooksList from './UserMainRenderAudiobooksList';
import { useUserAudiobookData } from 'Providers/User/UserAudiobookDataProvider';
import UserMainRenderProposedList from './UserMainRenderProposedList';
import { useUserAudiobookProposed } from 'Providers/User/UserAudiobookProposedProvider';

export default function GetAllAudiobooks(props) {
  const [audiobooks, refreshAudiooks, loadingAudiobooks, hasMore] = useUserAudiobookData();
  const [audiobookProposed, refreshProposed, loadingProposed] = useUserAudiobookProposed();

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
            hasMore={hasMore}
          />
          <UserMainRenderAudiobooksList
            state={props.state}
            setState={props.setState}
            token={props.token}
            t={props.t}
            audiobooks={audiobooks}
            audiobookProposed={audiobookProposed}
            refresh={refreshAudiooks}
            hasMore={hasMore}
          />
        </div>
      )}
    </div>
  );
}
