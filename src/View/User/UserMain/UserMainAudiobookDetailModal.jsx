import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useRef } from 'react';
import { useUserAudiobookRating } from 'Providers/User/UserAudiobookRatingProvider';
import { useUserAudiobookDetail } from 'Providers/User/UserAudiobookDetailProvider';
import { useAudiobookPart } from 'Providers/User/UserAudiobookPartProvider';
import { useUserAudiobookComments } from 'Providers/User/UserAudiobookCommentsProvider';
import UserAudiobookPlayer from '../Common/UserAudiobookPlayer';
import UserStarRating from '../Common/UserStarRating';
import UserRenderCommentsList from '../Common/UserRenderCommentsList';
import CreateUtil from 'Util/CreateUtil';
import { useUserAudiobookInfo } from 'Providers/User/UserAudiobookInfoProvider';

export default function UserMainAudiobookDetailModal(props) {
  const timeAudio = useRef(0);
  const audioDuration = useRef(0);
  const lastOpenComment = useRef(null);

  const [audiobookDetail, addToMyListFetch, addAudiobookRating, setRefresh] =
    useUserAudiobookDetail();
  const [audiobookRating] = useUserAudiobookRating();
  const [audiobookPart] = useAudiobookPart();
  const [audiobookInfo, setAudiobookInfo] = useUserAudiobookInfo();
  const [
    audiobookUserComments,
    setAudiobookCommnetsRefetchState,
    likeComment,
    addComment,
    editComment,
  ] = useUserAudiobookComments();

  const handleClose = () => {
    addInfo();
    props.setState((prev) => ({
      ...prev,
      detailModal: !props.state.detailModal,
      detailModalAudiobook: null,
      detailModalCover: null,
    }));

    if (props.audiobookState.myListChanged) {
      setRefresh();
    }
  };

  const addToMyList = (element) => {
    element.target.classList.add('disabled');

    addToMyListFetch({
      props: props,
      setAudiobookState: props.setAudiobookState,
      audiobookState: props.audiobookState,
      audiobookDetail: audiobookDetail,
      element: element,
    });
  };

  const addInfo = () => {
    let procent = (timeAudio.current / audioDuration.current) * 100;
    let watched = false;

    if (procent >= 70) {
      watched = true;
    }

    if (procent >= 20) {
      setAudiobookInfo({ props: props, timeAudio: timeAudio, watched: watched });
    }

    timeAudio.current = 0;
    audioDuration.current = 0;
  };

  return (
    <Modal size='lg' show={props.state.detailModal} onHide={handleClose} backdrop='static'>
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
              backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.7) 47%, rgba(255,255,255,0.1) 82%), url(${
                props.state.detailModalCover == null ? '/noImg.jpg' : props.state.detailModalCover
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
                  {props.t('year')}: {CreateUtil.createDate(audiobookDetail.year)}
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
                  {props.t('duration')}: {CreateUtil.createTime(audiobookDetail.duration)}
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
                    className={audiobookDetail.inList ? 'danger_button' : 'success_button'}
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
                  <UserStarRating
                    count={5}
                    audiobookDetail={audiobookDetail}
                    audiobookRating={audiobookRating}
                    addAudiobookRating={addAudiobookRating}
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
                <UserRenderCommentsList
                  comments={audiobookUserComments.comments}
                  audiobookDetail={audiobookDetail}
                  likeComment={likeComment}
                  lastOpenComment={lastOpenComment}
                  addComment={addComment}
                  editComment={editComment}
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
            <div className='row mt-4 justify-content-center'>
              <div className='col'>
                {audiobookInfo !== null &&
                audiobookInfo.part !== undefined &&
                !props.audiobookState.firstRenderInfo ? (
                  <div className='row'>
                    <p className='text-center'>
                      Czy chesz zacząć od ostatnio słuchanej części: {audiobookInfo.part} ?
                    </p>
                    <div className='row'>
                      <div className='col-2'></div>
                      <div className='col-4 d-flex justify-content-end'>
                        <Button
                          variant='success'
                          onClick={() => {
                            timeAudio.current =
                              audiobookInfo.endedTime !== null ? audiobookInfo.endedTime : 0;

                            props.setAudiobookState((prev) => ({
                              ...prev,
                              part: audiobookInfo.part - 1,
                              firstRenderInfo: true,
                              renderAudiobookPlayer: true,
                              firstRenderAudiobookInfo: true,
                            }));
                          }}
                          className='text-center'
                        >
                          {props.t('yes')}
                        </Button>
                      </div>
                      <div className='col-4'>
                        <Button
                          variant='danger'
                          onClick={() => {
                            props.setAudiobookState((prev) => ({
                              ...prev,
                              firstRenderInfo: true,
                            }));
                          }}
                          className='text-center'
                        >
                          {props.t('no')}
                        </Button>
                      </div>
                      <div className='col-2'></div>
                    </div>

                    {/* //TODO tu zrób Pytanie się o to właśnie czy chce odsłuchać */}
                  </div>
                ) : audiobookPart !== null ? (
                  <UserAudiobookPlayer
                    audiobookPart={audiobookPart}
                    setAudiobookState={props.setAudiobookState}
                    audiobookState={props.audiobookState}
                    audiobookInfo={audiobookInfo}
                    part={props.audiobookState.part}
                    parts={audiobookDetail.parts}
                    setState={props.setAudiobookState}
                    timeAudio={timeAudio}
                    audioDuration={audioDuration}
                    addInfo={addInfo}
                    t={props.t}
                  />
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
        <div className='row mt-3 justify-content-center'>
          <div className='col-7  align-self-center'>
            <Button variant='dark' onClick={handleClose} className='detail-button text-center'>
              {props.t('close')}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
