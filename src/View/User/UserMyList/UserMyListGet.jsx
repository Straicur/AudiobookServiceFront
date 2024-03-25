import React from 'react';
import UserMyListGetCovers from './UserMyListGetCovers';
import { UserAudiobookMyListProvider } from 'Providers/User/UserAudiobookMyListProvider';
import UserMyListAudiobookDetailProviders from './UserMyListAudiobookDetailProviders';

export default function UserMyListGet(props) {
  return (
    <UserAudiobookMyListProvider
      state={props.myListState}
      setState={props.setMyListState}
      token={props.token}
      i18n={props.i18n}
    >
      <UserMyListGetCovers
        state={props.myListState}
        setState={props.setMyListState}
        token={props.token}
        t={props.t}
        i18n={props.i18n}
      />
      {props.myListState.detailModal &&
      props.myListState.detailModalAudiobook != null &&
      props.myListState.detailModalCategory != null ? (
        <UserMyListAudiobookDetailProviders
          state={props.myListState}
          setState={props.setMyListState}
          token={props.token}
          t={props.t}
          i18n={props.i18n}
        />
      ) : null}
    </UserAudiobookMyListProvider>
  );
}
