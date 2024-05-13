import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useUserAudiobookMyList } from 'Providers/User/UserAudiobookMyListProvider';

export default function UserMyListRender(props) {
  const [audiobooks, loading] = useUserAudiobookMyList();

  const showAudiobookModal = (audiobook, imgUrl) => {
    props.setState((prev) => ({
      ...prev,
      detailModal: !props.state.detailModal,
      detailModalAudiobook: audiobook,
      detailModalCover: imgUrl,
      detailModalCategory: audiobook.categories[0],
    }));
  };

  const returnAudioboks = () => {
    let audiobooksArray = [];

    audiobooksArray.push(
      audiobooks.audiobooks.map((audiobook) => {
        let imgUrl =
          audiobook.imgFile === null
            ? '/noImg.jpg'
            : process.env.REACT_APP_API_URL + audiobook.imgFile;
        return (
          <div className='col-2' key={uuidv4()}>
            <div
              className='card m-3 carousel-search-card'
              onClick={() => {
                showAudiobookModal(audiobook, imgUrl);
              }}
            >
              <div
                className={
                  audiobook.title.length > 17
                    ? audiobook.title.length > 46
                      ? 'card-img-sm-ext-lg-title '
                      : 'card-img-sm-lg-title'
                    : 'card-img-sm-sm-title'
                }
              >
                <img src={imgUrl == null ? '/noImg.jpg' : imgUrl} className='card-img-top' />
              </div>

              <div className='card-body'>
                {audiobook.title.length > 17 ? (
                  <h6 className='card-title'>{audiobook.title}</h6>
                ) : (
                  <h5 className='card-title'>{audiobook.title}</h5>
                )}
                <p className='card-text'>{audiobook.author}</p>
              </div>
            </div>
          </div>
        );
      }),
    );
    return audiobooksArray;
  };

  return (
    <div key={uuidv4()} className='row min_container_height'>
      {loading ? (
        <div className='text-center'>
          <div className='spinner-border text-info spinner my-5' role='status'></div>
        </div>
      ) : audiobooks !== null && audiobooks.audiobooks.length > 0 ? (
        <div className='my-5 row'>{returnAudioboks()}</div>
      ) : (
        <div className='text-white center_text fs-2'>{props.t('emptyMyList')}</div>
      )}
    </div>
  );
}
