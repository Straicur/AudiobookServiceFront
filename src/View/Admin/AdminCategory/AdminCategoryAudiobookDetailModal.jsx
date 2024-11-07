import React, { useState, useLayoutEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AdminAudiobookPlayer from '../Common/AdminAudiobookPlayer';
import 'react-h5-audio-player/lib/styles.css';
import { useAdminAudiobookData } from 'Providers/Admin/AdminAudiobookDataProvider';
import { useAudiobookPart } from 'Providers/Admin/AdminAudiobookPartProvider';
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
    errorCover: '',
    deleteFromCategory: false,
    deleteEntirely: false,
  });

  const [audiobookDetailState, setAudiobookDetailState] = useState({
    id: '',
    title: '',
    author: '',
    version: '',
    album: '',
    year: 0,
    duration: 0,
    size: '',
    parts: 0,
    description: '',
    age: 0,
    encoded: '',
    categories: [],
    active: false,
    avgRating: 0,
    ratingAmount: 0,
  });

  const [audiobookDetail, setAudiobookDetailRefetch, audiobookDataEdit] = useAdminAudiobookData();

  const getAudiobookZip = useAdminAudiobookData()[7];
  const changeAudiobookCover = useAdminAudiobookData()[8];

  const [audiobookPart] = useAudiobookPart();

  const handleClose = () => {
    props.setAudiobooksState({
      ...props.audiobooksState,
      errorCover: '',
    });
    props.setState({
      ...props.state,
      detailAudiobookModal: !props.state.detailAudiobookModal,
      detailAudiobookElement: null,
    });
  };

  const deleteAudiobookEntirely = () => {
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

    if (audiobookDetail.avgRating !== 0) {
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

  useLayoutEffect(() => {
    if (audiobookDetail !== undefined && audiobookDetail !== null) {
      setAudiobookDetailState(() => ({
        id: audiobookDetail.id,
        title: audiobookDetail.title,
        author: audiobookDetail.author,
        version: audiobookDetail.version,
        album: audiobookDetail.album,
        year: audiobookDetail.year,
        duration: audiobookDetail.duration,
        size: audiobookDetail.size,
        parts: audiobookDetail.parts,
        description: audiobookDetail.description,
        age: audiobookDetail.age,
        encoded: audiobookDetail.encoded,
        categories: audiobookDetail.categories,
        active: audiobookDetail.active,
        avgRating: audiobookDetail.avgRating,
        ratingAmount: audiobookDetail.ratingAmount,
      }));
    }
  }, [audiobookDetail]);

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
          getAudiobookZip={getAudiobookZip}
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
              audiobooksState={props.audiobooksState}
              setAudiobooksState={props.setAudiobooksState}
              t={props.t}
              i18n={props.i18n}
              stateModal={stateModal}
              setStateModal={setStateModal}
              handleClose={handleClose}
              audiobookDetail={audiobookDetail}
              changeAudiobookCover={changeAudiobookCover}
              token={props.token}
            />
            <Alert
              show={stateModal.errorCover !== ''}
              className='dangerAllert mt-1 text-center'
              variant='danger'
            >
              {stateModal.errorCover}
            </Alert>
            {audiobookDetail !== undefined ? (
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
              audiobookDataEdit={audiobookDataEdit}
              stateModal={stateModal}
              setStateModal={setStateModal}
              setAudiobookDetailRefetch={setAudiobookDetailRefetch}
              audiobookDetailState={audiobookDetailState}
              setAudiobookDetailState={setAudiobookDetailState}
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

            {stateModal.deleteEntirely ? (
              <div className='row justify-content-start'>
                <div className='col-5 mx-1'>
                  <Button
                    name='en'
                    size='sm'
                    className='btn button px-4 my-1 question_button success_button'
                    onClick={deleteAudiobookEntirely}
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
                        deleteEntirely: !stateModal.deleteEntirely,
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
                      deleteEntirely: !stateModal.deleteEntirely,
                    }))
                  }
                >
                  {props.t('deleteEntirely')}
                </Button>
              </div>
            )}
          </div>
        </div>
        <hr className='text-light'></hr>
        <div className='row d-flex justify-content-center'>
          {audiobookPart != null && audiobookPart.url !== '' ? (
            <AdminAudiobookPlayer
              part={props.state.part}
              audiobookPart={audiobookPart}
              parts={props.state.detailAudiobookElement.parts}
              setState={props.setState}
              t={props.t}
            />
          ) : (
            <Alert
              show={audiobookPart === null || audiobookPart.url === ''}
              className='dangerAllert mt-1 text-center'
              variant='danger'
            >
              {props.t('cantFindAnyParts')}
            </Alert>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
