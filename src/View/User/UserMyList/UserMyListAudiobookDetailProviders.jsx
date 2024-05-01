import React, { useState, useEffect } from 'react';
import { UserAudiobookDetailProvider } from 'Providers/User/UserAudiobookDetailProvider';
import { UserAudiobookPartProvider } from 'Providers/User/UserAudiobookPartProvider';
import { UserAudiobookRatingProvider } from 'Providers/User/UserAudiobookRatingProvider';
import { UserAudiobookCommentsProvider } from 'Providers/User/UserAudiobookCommentsProvider';
import { UserAudiobookInfoProvider } from 'Providers/User/UserAudiobookInfoProvider';
import UserMyListAudiobookDetailModal from './UserMyListAudiobookDetailModal';

export default function UserMyListAudiobookDetailProviders(props) {
  const [audiobookState, setAudiobookState] = useState({
    part: 0,
    renderAudiobookPlayer: false,
    newPart: false,
    myListChanged: false,
  });

  useEffect(() => {
    if (props.state.error != null) {
      throw props.state.error;
    }
  }, [props.state.error]);

  return (
    <div>
      <UserAudiobookInfoProvider
        state={props.state}
        setState={props.setState}
        token={props.token}
        audiobookId={props.state.detailModalAudiobook.id}
        categoryKey={props.state.detailModalCategory.categoryKey}
        i18n={props.i18n}
      >
        <UserAudiobookDetailProvider
          state={props.state}
          setState={props.setState}
          token={props.token}
          audiobookId={props.state.detailModalAudiobook.id}
          categoryKey={props.state.detailModalCategory.categoryKey}
          i18n={props.i18n}
        >
          <UserAudiobookPartProvider
            state={props.state}
            setState={props.setState}
            token={props.token}
            audiobookId={props.state.detailModalAudiobook.id}
            part={audiobookState.part}
            setAudiobookState={setAudiobookState}
            audiobookState={audiobookState}
            i18n={props.i18n}
          >
            <UserAudiobookRatingProvider
              state={props.state}
              setState={props.setState}
              token={props.token}
              audiobookId={props.state.detailModalAudiobook.id}
              categoryKey={props.state.detailModalCategory.categoryKey}
              i18n={props.i18n}
            >
              <UserAudiobookCommentsProvider
                state={props.state}
                setState={props.setState}
                token={props.token}
                audiobookId={props.state.detailModalAudiobook.id}
                categoryKey={props.state.detailModalCategory.categoryKey}
                i18n={props.i18n}
              >
                <UserMyListAudiobookDetailModal
                  state={props.state}
                  setState={props.setState}
                  audiobookState={audiobookState}
                  setAudiobookState={setAudiobookState}
                  t={props.t}
                  i18n={props.i18n}
                  token={props.token}
                />
              </UserAudiobookCommentsProvider>
            </UserAudiobookRatingProvider>
          </UserAudiobookPartProvider>
        </UserAudiobookDetailProvider>
      </UserAudiobookInfoProvider>
    </div>
  );
}
