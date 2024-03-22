import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AdminAudiobookPlayer from '../Common/AdminAudiobookPlayer';
import 'react-h5-audio-player/lib/styles.css';
import { useAdminAudiobookData } from 'Providers/Admin/AdminAudiobookDataProvider';
import { useAudiobookCover } from 'Providers/Common/AudiobookCoverDataProvider';
import { useAudiobookPart } from 'Providers/Common/AudiobookPartProvider';
import AdminCategoryEditForm from './AdminCategoryEditForm';
import AdminCategoryAudiobookCategoryList from './AdminCategoryAudiobookCategoryList';
import AdminCategoryAudiobookCover from './AdminCategoryAudiobookCover';
import ZipButton from '../Common/ZipButton';
import { v4 as uuidv4 } from 'uuid';
import Alert from 'react-bootstrap/Alert';

export default function AdminCategoryAudiobookDetailModal(props) {
  const [stateModal, setStateModal] = useState({
    file: null,
    edit: false,
    deleteFromCategory: false,
    deleteEntarly: false,
  });

  const [audiobookDetail, setAudiobookDetailRefetch, setAudiobookDetail] = useAdminAudiobookData();
  const [audiobookCover, setAudiobookCoverRefetch] = useAudiobookCover();
  const [audiobookPart] = useAudiobookPart();

  const handleClose = () => {
    props.setAudiobooksState({
      ...props.audiobooksState,
      errorPart: '',
      errorCover: '',
    });
    props.setState({
      ...props.state,
      detailAudiobookModal: !props.state.detailAudiobookModal,
      detailAudiobookElement: null,
      refresh: !props.state.refresh,
    });
  };

  const deleteAudiobookEntarly = () => {
    props.deleteAudiobook({
      audiobookId: audiobookDetail.id,
    });

    handleClose();
  };

  const deleteAudiobookFromCategory = () => {
    props.deleteAudiobookFromCategory({
      categoryId: props.categoryDetail.id,
      audiobookId: audiobookDetail.id,
    });

    handleClose();
  };

  const renderStars = () => {
    let stars = [];
    let amountOfStars = 5;

    if (audiobookDetail.avgRating != 0) {
      for (let i = 0; i < audiobookDetail.avgRating; i++) {
        stars.push(
          <div key={uuidv4()} className='col-1'>
            <i className='bi bi-star-fill'></i>
          </div>,
        );
        amountOfStars = amountOfStars - 1;
      }
    }

    for (let i = 0; i < amountOfStars; i++) {
      stars.push(
        <div key={uuidv4()} className='col-1'>
          <i className='bi bi-star'></i>
        </div>,
      );
    }

    return stars;
  };

  return (
    <Modal
      show={props.state.detailAudiobookModal}
      onHide={handleClose}
      size='lg'
      backdrop='static'
      centered
    >
      <Modal.Header closeButton className='bg-dark'>
        <ZipButton
          audiobookDetail={audiobookDetail}
          state={props.audiobooksState}
          setState={props.setAudiobooksState}
          handleClose={handleClose}
          cssData={'primary_button'}
          t={props.t}
          i18n={props.i18n}
          token={props.token}
        />
      </Modal.Header>
      <Modal.Body className='bg-dark'>
        <div className='row'>
          <div className='col'>
            <AdminCategoryAudiobookCover
              audiobookCover={audiobookCover}
              audiobooksState={props.audiobooksState}
              setAudiobooksState={props.setAudiobooksState}
              t={props.t}
              i18n={props.i18n}
              setAudiobookCoverRefetch={setAudiobookCoverRefetch}
              stateModal={stateModal}
              setStateModal={setStateModal}
              handleClose={handleClose}
              audiobookDetail={audiobookDetail}
              token={props.token}
            />
            <Alert
              show={props.audiobooksState.errorCover != ''}
              className='dangerAllert mt-1 text-center'
              variant='danger'
            >
              {props.audiobooksState.errorCover}
            </Alert>
            {audiobookDetail != undefined ? (
              <div className='row d-flex justify-content-center text-light text-center'>
                <div className='col-3 mx-0 p-0'>
                  <h5>{props.t('rated')}</h5>
                </div>
                <div className='col-1 me-2 pe-5'>
                  <h5>{audiobookDetail.ratingAmount}</h5>
                </div>
                <div className='col-4 mx-0 p-0'>
                  <div className='row'>{renderStars()}</div>
                </div>
              </div>
            ) : null}

            <div className='row d-flex justify-content-center text-light text-center'>
              <h4>{props.t('categories')}</h4>
            </div>
            <AdminCategoryAudiobookCategoryList audiobookDetail={audiobookDetail} t={props.t} />
          </div>

          <div className='col'>
            <AdminCategoryEditForm
              audiobookDetail={audiobookDetail}
              setAudiobookDetail={setAudiobookDetail}
              stateModal={stateModal}
              setStateModal={setStateModal}
              setAudiobookDetailRefetch={setAudiobookDetailRefetch}
              handleClose={handleClose}
              setState={props.setState}
              state={props.state}
              t={props.t}
              i18n={props.i18n}
              token={props.token}
            />
            {stateModal.deleteFromCategory ? (
              <div className='row justify-content-start'>
                <div className='col-5 mx-1'>
                  <Button
                    name='en'
                    size='sm'
                    className='btn button px-4 my-1 question_button success_button'
                    onClick={deleteAudiobookFromCategory}
                  >
                    {props.t('yes')}
                  </Button>
                </div>
                <div className='col-5 mx-2'>
                  <Button
                    name='en'
                    size='sm'
                    className='btn button px-4 my-1 question_button danger_button me-2'
                    onClick={() =>
                      setStateModal((prev) => ({
                        ...prev,
                        deleteFromCategory: !stateModal.deleteFromCategory,
                      }))
                    }
                  >
                    {props.t('no')}
                  </Button>
                </div>
              </div>
            ) : (
              <div className='row'>
                <Button
                  name='en'
                  size='sm'
                  className='btn button px-4 my-1 modal_button danger_button'
                  onClick={() =>
                    setStateModal((prev) => ({
                      ...prev,
                      deleteFromCategory: !stateModal.deleteFromCategory,
                    }))
                  }
                >
                  {props.t('deleteFromCurrentCategory')}
                </Button>
              </div>
            )}

            {stateModal.deleteEntarly ? (
              <div className='row justify-content-start'>
                <div className='col-5 mx-1'>
                  <Button
                    name='en'
                    size='sm'
                    className='btn button px-4 my-1 question_button success_button'
                    onClick={deleteAudiobookEntarly}
                  >
                    {props.t('yes')}
                  </Button>
                </div>
                <div className='col-5 mx-2'>
                  <Button
                    name='en'
                    size='sm'
                    className='btn button px-4 my-1 question_button danger_button me-2'
                    onClick={() =>
                      setStateModal((prev) => ({
                        ...prev,
                        deleteEntarly: !stateModal.deleteEntarly,
                      }))
                    }
                  >
                    {props.t('no')}
                  </Button>
                </div>
              </div>
            ) : (
              <div className='row'>
                <Button
                  name='en'
                  size='sm'
                  className='btn button px-4 my-1 modal_button danger_button'
                  onClick={() =>
                    setStateModal((prev) => ({
                      ...prev,
                      deleteEntarly: !stateModal.deleteEntarly,
                    }))
                  }
                >
                  {props.t('deleteEntarly')}
                </Button>
              </div>
            )}
          </div>
        </div>
        <hr className='text-light'></hr>
        <div className='row d-flex justify-content-center'>
          {audiobookPart != null ? (
            <AdminAudiobookPlayer
              part={props.state.part}
              audiobookPart={audiobookPart}
              parts={props.state.detailAudiobookElement.parts}
              setState={props.setState}
              state={props.state}
              t={props.t}
            />
          ) : null}
          <Alert
            show={props.audiobooksState.errorPart != ''}
            className='dangerAllert mt-1 text-center'
            variant='danger'
          >
            {props.audiobooksState.errorPart}
          </Alert>
        </div>
      </Modal.Body>
    </Modal>
  );
}
