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
import { useUserAudiobookInfo } from 'Providers/User/UserAudiobookInfoProvider';
import { useUserReport } from 'Providers/User/UserReportProvider';
import UserReportDescModal from '../Common/UserReportDescModal';

export default function UserMyListAudiobookDetailModal(props) {
  const timeAudio = useRef(0);
  const audioDuration = useRef(0);
  const audiobookInfoPartToSave = useRef(null);
  const lastOpenComment = useRef(null);

  const [audiobookDetail, addToMyListFetch, addAudiobookRating, setRefresh] =
    useUserAudiobookDetail();
  const [audiobookRating] = useUserAudiobookRating();
  const [audiobookPart] = useAudiobookPart();
  const [audiobookInfo, setAudiobookInfo] = useUserAudiobookInfo();
  const [
    audiobookUserComments,
    setAudiobookCommentsRefetchState,
    likeComment,
    addComment,
    editComment,
  ] = useUserAudiobookComments();
  const [sendLoggedUserReport] = useUserReport();

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
      setAudiobookInfo({
        props: props,
        audiobookInfoPartToSave: audiobookInfoPartToSave,
        timeAudio: timeAudio,
        watched: watched,
      });
    }
  };

  return (
    <Modal size='lg' show={props.state.detailModal} onHide={handleClose} backdrop='static'>
      <Modal.Body className='text-white user-my-list-modal-background-dark'>
        {audiobookDetail != null ? (
          <div>
            <div
              className='row '
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.7) 47%, rgba(255,255,255,0.1) 82%), url(${
                  props.state.detailModalCover === null
                    ? '/noImg.jpg'
                    : props.state.detailModalCover
                })`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '60%',
                backgroundPosition: '95% 15%',
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

                      if (index !== audiobookDetail.categories.length - 1) {
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
                        {props.t('audiobookInfoModalQuestion')} {audiobookInfo.part} ?
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
                    </div>
                  ) : audiobookPart !== null && audiobookPart.url !== '' ? (
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
                      audiobookInfoPartToSave={audiobookInfoPartToSave}
                      addInfo={addInfo}
                      t={props.t}
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='row mt-4'>
                <div className='col-5 fs-5'>
                  {props.t('comments')}: {audiobookDetail.comments}
                </div>
              </div>
              <div className='row my-1'>
                <UserRenderCommentsList
                  comments={audiobookUserComments}
                  audiobookDetail={audiobookDetail}
                  likeComment={likeComment}
                  lastOpenComment={lastOpenComment}
                  addComment={addComment}
                  editComment={editComment}
                  setAudiobookDetailRefresh={setRefresh}
                  state={props.state}
                  setState={props.setState}
                  t={props.t}
                  i18n={props.i18n}
                  token={props.token}
                  refetch={setAudiobookCommentsRefetchState}
                />
              </div>
            </div>
          </div>
        ) : null}
        {props.state.reportDescModal ? (
          <UserReportDescModal
            state={props.state}
            setState={props.setState}
            token={props.token}
            t={props.t}
            i18n={props.i18n}
            sendLoggedUserReport={sendLoggedUserReport}
          />
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
