import React, { useLayoutEffect } from 'react';
import { UserAudiobookMyListProvider } from 'Providers/User/UserAudiobookMyListProvider';
import UserMyListRender from './UserMyListRender';

export default function UserMyListGet(props) {
  useLayoutEffect(() => {
    if (props.myListState.error != null) {
      throw props.myListState.error;
    }
  }, [props.myListState.error]);

  return (
    <UserAudiobookMyListProvider
      state={props.myListState}
      setState={props.setMyListState}
      token={props.token}
      i18n={props.i18n}
    >
      <UserMyListRender
        state={props.myListState}
        setState={props.setMyListState}
        token={props.token}
        t={props.t}
      />
    </UserAudiobookMyListProvider>
  );
}
