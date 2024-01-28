import React, { useState, useEffect, useRef } from 'react';
import { useAudiobookMy } from 'Providers/AudiobookMyListProvider';
import RenderMyList from './RenderMyList';
import { HandleFetch } from 'Util/HandleFetch';
import { useCoverListStore } from 'Store/store';

const ChildMemo = React.memo(RenderMyList);

export default function GetCovers(props) {
  const [audiobooks, loading, setAudiobooks, setRefetchState] = useAudiobookMy();

  const [loadstate, setLoadState] = useState(true);

  const coversStore = useCoverListStore();

  const covers = useCoverListStore((state) => state.covers);
  const dateUpdate = useCoverListStore((state) => state.dateUpdate);

  const getAudiobooksImages = () => {
    if (audiobooks != null) {
      let audiobooksIds = [];
      let copy = audiobooks;

      if (copy != undefined) {
        copy.map((audiobook) => {
          audiobooksIds.push(audiobook.id);
        });

        HandleFetch(
          '/audiobook/covers',
          'POST',
          {
            audiobooks: audiobooksIds,
          },
          props.token,
          props.i18n.language,
        )
          .then((data) => {
            if (data.audiobookCoversModels != undefined) {
              let updatedCovers = covers;

              data.audiobookCoversModels.forEach((cover) => {
                if (!covers.some((x) => x.id == cover.id)) {
                  updatedCovers.push(cover);
                } else {
                  if (dateUpdate < Date.now() && dateUpdate != 0) {
                    coversStore.updateCover(cover.id, cover.url);
                  }
                }
              });

              coversStore.addCovers(updatedCovers);
              setLoadState(false);
            } else {
              setLoadState(false);
            }
          })
          .catch((e) => {
            props.setState({
              ...props.state,
              error: e,
            });
          });
      }
    }
  };

  useEffect(() => {
    if (audiobooks != null) {
      getAudiobooksImages();
    }
  }, [audiobooks]);

  return (
    <div>
      {loadstate ? (
        <div className='text-center'>
          <div className='spinner-border text-info spinner my-5' role='status'></div>
        </div>
      ) : (
        <ChildMemo
          state={props.state}
          setState={props.setState}
          token={props.token}
          t={props.t}
          coversState={covers}
          loading={loading}
          audiobooks={audiobooks}
        />
      )}
    </div>
  );
}
