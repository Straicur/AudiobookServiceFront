import React, { useLayoutEffect, useRef } from 'react';
import UserMainRenderAudiobooksList from './UserMainRenderAudiobooksList';
import { useUserAudiobookData } from 'Providers/User/UserAudiobooksProvider';
import UserMainRenderProposedList from './UserMainRenderProposedList';
import { useUserAudiobookProposed } from 'Providers/User/UserAudiobookProposedProvider';
import { useUserAudiobooksListStore } from 'Store/store';

export default function GetAllAudiobooks(props) {
  const [audiobooks, refreshAudiobooks, loadingAudiobooks] = useUserAudiobookData();
  const [audiobooksProposed, refreshProposed, loadingProposed] = useUserAudiobookProposed();

  const audiobooksListStore = useUserAudiobooksListStore();
  const dateUpdates = useUserAudiobooksListStore((state) => state.dateUpdate);
  const maxPage = useUserAudiobooksListStore((state) => state.maxPage);

  const audiobooksList = useRef(useUserAudiobooksListStore((state) => state.audiobooks));

  useLayoutEffect(() => {
    if (props.state.refresh) {
      props.setState((prev) => ({
        ...prev,
        refresh: true,
      }));

      refreshAudiobooks();
    }
  }, [props.state.refresh]);

  useLayoutEffect(() => {
    if (
      audiobooks !== null &&
      (dateUpdates[props.state.page] === undefined || dateUpdates[props.state.page] <= Date.now())
    ) {
      audiobooksListStore.removePageAudiobooks(props.state.page);
      audiobooksListStore.addAudiobooks(props.state.page, audiobooks);
    }
  }, [audiobooks]);

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
            audiobooksProposed={audiobooksProposed}
            refresh={refreshProposed}
          />
          <UserMainRenderAudiobooksList
            state={props.state}
            setState={props.setState}
            token={props.token}
            t={props.t}
            audiobooksList={audiobooksList}
            maxPage={maxPage}
            refresh={refreshAudiobooks}
          />
        </div>
      )}
    </div>
  );
}
