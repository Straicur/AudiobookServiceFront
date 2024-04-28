import React, { useState, useEffect } from 'react';
import { HandleFetch } from '../../../Util/HandleFetch';
import { UserAudiobookDetailProvider } from '../../../Providers/User/UserAudiobookDetailProvider';
import { AudiobookPartProvider } from '../../../Providers/Common/AudiobookPartProvider'; // '../../../Providers/Common/AudiobookPartProvider'
import { UserAudiobookRatingProvider } from '../../../Providers/User/UserAudiobookRatingProvider';
import { UserAudiobookCommentsProvider } from '../../../Providers/User/UserAudiobookCommentsProvider';
import { UserAudiobookInfoProvider } from 'Providers/User/UserAudiobookInfoProvider';
import UserMyListAudiobookDetailModal from './UserMyListAudiobookDetailModal';

export default function UserMyListAudiobookDetailProviders(props) {
  const [audiobookState, setAudiobookState] = useState({
    part: 0,
    detailWatchingDate: null,
    datailEndedTime: null,
    renderAudiobookPlayer: false,
    newPart: false,
    myListChanged: false,
    info: false,
  });

  const fetchData = () => {
    HandleFetch(
      '/user/audiobook/info',
      'POST',
      {
        audiobookId: props.state.detailModalAudiobook.id,
        categoryKey: props.state.detailModalCategory.categoryKey,
      },
      props.token,
      props.i18n.language,
    )
      .then((data) => {
        setAudiobookState((prev) => ({
          ...prev,
          info: true,
          part: data.part,
          detailWatchingDate: data.watchingDate,
          datailEndedTime: data.endedTime,
        }));
      })
      .catch((e) => {
        props.setState((prev) => ({
          ...prev,
          error: e,
        }));
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (props.state.error != null) {
      throw props.state.error;
    }
  }, [props.state.error]);

  return (
    <div>
      {audiobookState.info ? (
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
            </AudiobookPartProvider>
          </UserAudiobookDetailProvider>
        </UserAudiobookInfoProvider>
      ) : null}
    </div>
  );
}
