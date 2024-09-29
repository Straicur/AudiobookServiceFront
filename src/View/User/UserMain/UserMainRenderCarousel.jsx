import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function UserMainRenderCarousel(props, category) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };

  const showAudiobookModal = (audiobook, imgUrl) => {
    props.setState((prev) => ({
      ...prev,
      detailModal: !props.detailModal,
      detailModalAudiobook: audiobook,
      detailModalCover: imgUrl === null ? '/noImg.jpg' : imgUrl,
      detailModalCategory: category,
    }));
  };

  const returnAudiooboks = () => {
    let audiobooksArray = [];

    audiobooksArray.push(
      category.audiobooks.map((audiobook) => {
        let imgUrl =
          audiobook.imgFile === null
            ? '/noImg.jpg'
            : process.env.REACT_APP_API_URL + audiobook.imgFile;
        return (
          <div
            className='card mx-3 carousel-card'
            onClick={() => {
              showAudiobookModal(audiobook, imgUrl);
            }}
            key={uuidv4()}
          >
            <div
              className={
                audiobook.title.length > 17
                  ? audiobook.title.length > 46
                    ? 'card-img-sm-ext-lg-title '
                    : 'card-img-sm-lg-title'
                  : 'card-img-sm-sm-title'
              }
              key={uuidv4()}
            >
              <img
                src={imgUrl === null ? '/noImg.jpg' : imgUrl}
                className='card-img-top'
                alt={''}
              />
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
        );
      }),
    );
    return audiobooksArray;
  };

  const render = () => {
    return (
      <Carousel responsive={responsive} infinite={true}>
        {returnAudiooboks()}
      </Carousel>
    );
  };

  return <div key={uuidv4()}>{render()}</div>;
}
