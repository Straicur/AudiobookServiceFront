import React, { useMemo, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid';
import { HandleFetch } from 'Util/HandleFetch';

export default function UserStarRating(props) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [userRate, setUserRate] = useState(false);
  const [sure, setSure] = useState(false);

  const doubleClickRating = () => {
    setRating(0);
    setRating(props.audiobookRating);
    setHover(props.audiobookRating);
    setSure(false);
    setUserRate(false);
  };

  const clickRating = (idx) => {
    setRating(idx);
  };

  const fetchData = () => {
    HandleFetch(
      '/user/audiobook/rating/add',
      'PUT',
      {
        audiobookId: props.audiobookDetail.id,
        categoryKey: props.categoryKey,
        rating: rating,
      },
      props.token,
      props.i18n.language,
    )
      .then(() => {
        setUserRate(false);
        setSure(false);
      })
      .catch(() => {
        doubleClickRating();
      });
  };

  const clearBoard = () => {
    setRating(0);
    setHover(0);
    setSure(true);
    setUserRate(true);
  };

  useEffect(() => {
    setRating(props.audiobookRating);
    setHover(props.audiobookRating);
  }, [props.audiobookRating]);

  const starRating = useMemo(() => {
    return Array(props.count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <button
          type='button'
          key={uuidv4()}
          className={idx <= ((rating && hover) || hover) ? 'on button-star' : 'off button-star'}
          onClick={userRate ? () => clickRating(idx) : undefined}
          onMouseEnter={userRate ? () => setHover(idx) : undefined}
          onMouseLeave={userRate ? () => setHover(rating) : undefined}
          onDoubleClick={userRate ? () => doubleClickRating() : undefined}
        >
          <span className='star'>&#9733;</span>
        </button>
      ));
  }, [rating, hover, userRate]);

  return (
    <div className='star-rating'>
      <div className='row justify-content-start m-0 p-0'>
        <div className='col-4'>{starRating}</div>
        <div className='col-2 p-0 m-0'>{props.t('rated')}</div>
        <div className='col-1 p-0 m-0'>{props.audiobookDetail.ratingAmount}</div>
        {props.audiobookDetail.canRate ? (
          !sure ? (
            <div className='col-3 align-self-center'>
              <Button onClick={() => clearBoard()} variant='success' size='sm' className='p-1'>
                {props.t('rate')}
              </Button>
            </div>
          ) : (
            <div className='col-3 '>
              <div className='row justify-content-center'>
                <div className='col-6'>
                  <Button onClick={() => fetchData()} variant='success' size='sm'>
                    {props.t('yes')}
                  </Button>
                </div>
                <div className='col-6'>
                  <Button onClick={() => doubleClickRating()} variant='danger' size='sm'>
                    {props.t('no')}
                  </Button>
                </div>
              </div>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}
