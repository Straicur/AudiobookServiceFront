import React, { useLayoutEffect } from 'react';
import { useUserAudiobookSearch } from 'Providers/User/UserAudiobookSearchProvider';
import UserMainRenderSearchAudiobooksList from './UserMainRenderSearchAudiobooksList';

export default function UserMainGetAllSearchAudiobooks(props) {
  const [audiobooks, setRefetchState, loading] = useUserAudiobookSearch();

  useLayoutEffect(() => {
    if (props.state.search) {
      setRefetchState();
    }
  }, [props.state.searching]);

  return (
    <div>
      {loading ? (
        <div className='text-center'>
          <div className='spinner-border text-info spinner my-5' role='status'></div>
        </div>
      ) : (
        <UserMainRenderSearchAudiobooksList
          state={props.state}
          setState={props.setState}
          token={props.token}
          t={props.t}
          audiobooks={audiobooks}
          loading={loading}
        />
      )}
    </div>
  );
}
