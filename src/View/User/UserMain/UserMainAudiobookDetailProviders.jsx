import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
// import { AudiobookUserDetailProvider } from 'Providers/AudiobookUserDetailProvider';
// import { AudiobookPartProvider } from 'Providers/AudiobookPartProvider';
// import { AudiobookRatingProvider } from 'Providers/AudiobookRatingProvider';
// import { AudiobookUserCommentsProvider } from 'Providers/AudiobookUserCommentsProvider';
import DataNotFoundError from 'Errors/Errors/DataNotFoundError';
// import UserMainAudiobookDetailModal from './UserMainAudiobookDetailModal';

export default function UserMainAudiobookDetailProviders(props) {
  const [audiobookState, setAudiobookState] = useState({
    part: 0,
    detailWatchingDate: null,
    datailEndedTime: null,
    renderAudiobookPlayer: false,
    newPart: false,
    info: false,
  });

  const { data } = useQuery(
    'dataAudiobookDetail',
    () =>
      HandleFetch(
        '/user/audiobook/info',
        'POST',
        {
          audiobookId: props.state.detailModalAudiobook.id,
          categoryKey: props.state.detailModalCategory.categoryKey,
        },
        props.token,
        props.i18n.language,
      ),
    {
      enabled: props.state != undefined,
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {
        if (e instanceof DataNotFoundError) {
          setAudiobookState((prev) => ({
            ...prev,
            info: true,
          }));
        } else {
          props.setState((prev) => ({
            ...prev,
            error: e,
          }));
        }
      },
      onSuccess: (data) => {
        setAudiobookState((prev) => ({
          ...prev,
          info: true,
          part: data.part,
          detailWatchingDate: data.watchingDate,
          datailEndedTime: data.endedTime,
        }));
        return data;
      },
    },
  );

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    if (props.state.error != null) {
      throw props.state.error;
    }
  }, [props.state.error]);

  return (
    <div>
      {console.log(data)}
      {console.log(audiobookState)}
      {/* {audiobookState.info ? (
        <AudiobookUserDetailProvider
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
            part={audiobookState.part}
            i18n={props.i18n}
          >
            <AudiobookRatingProvider
              state={props.state}
              setState={props.setState}
              token={props.token}
              audiobookId={props.state.detailModalAudiobook.id}
              categoryKey={props.state.detailModalCategory.categoryKey}
              i18n={props.i18n}
            >
              <AudiobookUserCommentsProvider
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
              </AudiobookUserCommentsProvider>
            </AudiobookRatingProvider>
          </AudiobookPartProvider>
        </AudiobookUserDetailProvider>
      ) : null} */}
    </div>
  );
}
