import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useRef } from 'react';
import { useAudiobookRating } from '../../../Providers/AudiobookRatingProvider';
import { useAudiobookDetail } from '../../../Providers/AudiobookUserDetailProvider';
import { useAudiobookPart } from '../../../Providers/AudiobookPartProvider';
import { useAudiobookUserComments } from '../../../Providers/AudiobookUserCommentsProvider';
import AudiobookPlayer from '../Common/AudiobookPlayer';
import { HandleFetch } from '../../../Util/HandleFetch';
import StarRating from '../Common/StarRating';
import RenderCommentsList from '../Common/RenderCommentsList';
import { useAudiobookMy } from '../../../Providers/AudiobookMyListProvider';

export default function AudiobookDetailModal(props) {
  const timeAudio = useRef(0);
  const audioDuration = useRef(0);

  const [audiobookDetail, setAudiobookDetail, setAudiobookDetailRefetch] =
    useAudiobookDetail();
  const [audiobookRating, setAudiobookRating, setRefetchRatingState] =
    useAudiobookRating();
  const [audiobookPart, setAudiobookPart, setRefetchPartState] =
    useAudiobookPart();
  const [audiobooks, loading, setAudiobooks, setRefetchState] =
    useAudiobookMy();

  const [
    audiobookUserComments,
    setAudiobookUserComments,
    setAudiobookCommnetsRefetchState,
  ] = useAudiobookUserComments();

  const handleClose = () => {
    addInfo();
    props.setState({
      ...props.state,
      detailModal: !props.state.detailModal,
      detailModalAudiobook: null,
      detailModalCover: null,
    });
  };

  const removeFromMyList = () => {
    if (audiobookDetail.inList) {
      let newArr = audiobooks.filter(
        (element) => element.id != audiobookDetail.id
      );

      setAudiobooks(newArr);
    }
  };

  const addToMyList = (element) => {
    element.target.classList.add('disabled');
    HandleFetch(
      '/user/audiobook/like',
      'PATCH',
      {
        audiobookId: props.state.detailModalAudiobook.id,
        categoryKey: props.state.detailModalCategory.categoryKey,
      },
      props.token,
      props.i18n.language
    )
      .then(() => {
        setAudiobookDetail({
          ...audiobookDetail,
          inList: !audiobookDetail.inList,
        });

        removeFromMyList();

        element.target.classList.remove('disabled');
        handleClose();
      })
      .catch((e) => {
        props.setState({
          ...props.state,
          error: e,
        });
      });
  };

  const addInfo = () => {
    let procent = (timeAudio.current / audioDuration.current) * 100;
    let watched = false;

    if (procent >= 70) {
      watched = true;
    }
    if (procent >= 20) {
      HandleFetch(
        '/user/audiobook/info/add',
        'PUT',
        {
          audiobookId: props.state.detailModalAudiobook.id,
          categoryKey: props.state.detailModalCategory.categoryKey,
          part: props.audiobookState.part,
          endedTime: timeAudio.current,
          watched: watched,
        },
        props.token,
        props.i18n.language
      )
        .then(() => { })
        .catch((e) => {
          props.setState({
            ...props.state,
            error: e,
          });
        });
    }

    timeAudio.current = 0;
    audioDuration.current = 0;
  };

  return (
    <Modal
      size='lg'
      show={props.state.detailModal}
      onHide={handleClose}
      backdrop='static'
    >
      <Modal.Body
        className='text-white'
        style={{
          backgroundColor: '#000000',
        }}
      >
        {audiobookDetail != null ? (
          <div
            className='row '
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.7) 47%, rgba(255,255,255,0.1) 82%), url(${props.state.detailModalCover == null
                ? '/noImg.jpg'
                : props.state.detailModalCover
                })`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '60%',
              backgroundPosition: '95% 15%',
              paddingBottom: '3rem',
            }}
          >
            <div className='col-9'>
              <div className='row'>
                <h1>{audiobookDetail.title}</h1>
              </div>
              <div className='row mb-3'>
                <h2>
                  {props.t('author')}: {audiobookDetail.author}
                </h2>
              </div>
              <div className='row mb-3 text-wrap'>
                <div className='col-10'>
                  {props.t('description')}: {audiobookDetail.description}
                </div>
              </div>
              <div className='row mb-2'>
                <div className='col-5'>
                  {props.t('year')}: {audiobookDetail.year}
                </div>
                <div className='col-4'>
                  {props.t('version')}: {audiobookDetail.version}
                </div>
              </div>
              <div className='row mb-2'>
                <div className='col-5'>
                  {props.t('parts')}: {audiobookDetail.parts}
                </div>
                <div className='col-5'>
                  {props.t('duration')}: {audiobookDetail.duration}
                </div>
              </div>
              <div className='row mb-2'>
                <div className='col'>
                  {props.t('album')}: {audiobookDetail.album}
                </div>
              </div>
              <div className='row justify-content-center mb-2'>
                <div className='col-6'>
                  <Button
                    onClick={(e) => addToMyList(e)}
                    className={
                      audiobookDetail.inList
                        ? 'danger_button'
                        : 'success_button'
                    }
                  >
                    {props.t('myList')}{' '}
                    {audiobookDetail.inList ? (
                      <i className='bi bi-x-lg'></i>
                    ) : (
                      <i className='bi bi-check-lg'></i>
                    )}
                  </Button>
                </div>
              </div>
              <div className='row mb-5'>
                <div className='col'>
                  {props.t('categories')}:{' '}
                  {audiobookDetail.categories.map((category, index) => {
                    let name = category.name;

                    if (index != audiobookDetail.categories.length - 1) {
                      name = name + ', ';
                    }

                    return name;
                  })}
                </div>
              </div>
              <div className='row'>
                <div className='col-3'>{props.t('rating')}:</div>
                <div className='col-9'>
                  <StarRating
                    count={5}
                    audiobookDetail={audiobookDetail}
                    audiobookRating={audiobookRating}
                    token={props.token}
                    categoryKey={props.state.detailModalCategory.categoryKey}
                    t={props.t}
                    i18n={props.i18n}
                  />
                </div>
              </div>
              <div className='row my-1'>
                <div className='col-5 fs-5'>
                  {props.t('comments')}: {audiobookDetail.comments}
                </div>
              </div>
              <div className='row my-1'>
                <RenderCommentsList
                  comments={audiobookUserComments}
                  setAudiobookUserComments={setAudiobookUserComments}
                  state={props.state}
                  setState={props.setState}
                  t={props.t}
                  i18n={props.i18n}
                  token={props.token}
                  refetch={setAudiobookCommnetsRefetchState}
                />
              </div>
            </div>
            <div className='col-3 d-flex justify-content-end align-items-start pe-3'>
              <Button
                variant='danger'
                onClick={handleClose}
                className='text-center danger_button opacity-75 exit_audiobook fw-bold'
              >
                X
              </Button>
            </div>
          </div>
        ) : null}

        <div className='row mt-4 justify-content-center'>
          <div className='col'>
            <AudiobookPlayer
              audiobookPart={audiobookPart}
              setAudiobookState={props.setAudiobookState}
              audiobookState={props.audiobookState}
              state={props.state}
              timeAudio={timeAudio}
              audioDuration={audioDuration}
              addInfo={addInfo}
              t={props.t}
            />
          </div>
        </div>
        <div className='row mt-3 justify-content-center'>
          <div className='col-7  align-self-center'>
            <Button
              variant='dark'
              onClick={handleClose}
              className='detail-button text-center'
            >
              {props.t('close')}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
