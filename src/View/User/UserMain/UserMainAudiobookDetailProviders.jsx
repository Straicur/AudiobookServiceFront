import React, { useState, useEffect } from 'react';
import { UserAudiobookDetailProvider } from 'Providers/User/UserAudiobookDetailProvider';
import { AudiobookPartProvider } from 'Providers/Common/AudiobookPartProvider';
import { UserAudiobookRatingProvider } from 'Providers/User/UserAudiobookRatingProvider';
import { UserAudiobookCommentsProvider } from 'Providers/User/UserAudiobookCommentsProvider';
import { useUserAudiobookInfo } from 'Providers/User/UserAudiobookInfoProvider';
import { UserAudiobookInfoProvider } from 'Providers/User/UserAudiobookInfoProvider';
import UserMainAudiobookDetailModal from './UserMainAudiobookDetailModal';

export default function UserMainAudiobookDetailProviders(props) {
  const [audiobookInfo] = useUserAudiobookInfo();
  const [audiobookState, setAudiobookState] = useState({
    part: 0,
    renderAudiobookPlayer: false,
    myListChanged: false,
    newPart: false,
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
          <AudiobookPartProvider
            state={props.state}
            setState={props.setState}
            token={props.token}
            audiobookId={props.state.detailModalAudiobook.id}
            audiobookState={audiobookState}
            setAudiobookState={setAudiobookState}
            audiobookInfo={audiobookInfo}
            part={audiobookState.part}
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
                <UserMainAudiobookDetailModal
                  state={props.state}
                  setState={props.setState}
                  audiobookState={audiobookState}
                  setAudiobookState={setAudiobookState}
                  t={props.t}
                  token={props.token}
                  i18n={props.i18n}
                />
              </UserAudiobookCommentsProvider>
            </UserAudiobookRatingProvider>
          </AudiobookPartProvider>
        </UserAudiobookDetailProvider>
      </UserAudiobookInfoProvider>
    </div>
  );
}
