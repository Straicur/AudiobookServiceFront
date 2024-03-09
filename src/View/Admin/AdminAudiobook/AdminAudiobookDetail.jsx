import React, { useEffect, useState } from 'react';
import { useAdminAudiobookData } from 'Providers/Admin/AdminAudiobookDataProvider';
import { useAudiobookCover } from 'Providers/Common/AudiobookCoverDataProvider';
import { useAudiobookPart } from 'Providers/Common/AudiobookPartProvider';
import { useAdminAudiobookComments } from 'Providers/Admin/AdminAudiobookCommentsProvider';
import AdminNavBarProviders from '../AdminNavBar/AdminNavBarProviders';
import AdminAudiobookEditForm from './AdminAudiobookEditForm';
import AdminAudiobookCategoryList from './AdminAudiobookCategoryList';
import AdminAudiobookCover from './AdminAudiobookCover';
import ZipButton from '../Common/ZipButton';
import AdminAudiobookRenderCommentsList from './AdminAudiobookRenderCommentsList';
import AdminAudiobookAddCategoriesModal from './AdminAudiobookAddCategoriesModal';
import AdminAudiobookReAddingModal from './AdminAudiobookReAddingModal';
import Button from 'react-bootstrap/Button';
import AdminAudiobookPlayer from '../Common/AdminAudiobookPlayer';
import AdminAudiobookReAddButton from './AdminAudiobookReAddButton';
import AdminAudiobookDeleteEntarlyButton from './AdminAudiobookDeleteEntarlyButton';
import { v4 as uuidv4 } from 'uuid';
import Alert from 'react-bootstrap/Alert';
import { useCategoryListStore } from 'Store/store';

export default function AdminAudiobookDetail(props) {
  const [categoriesState, setCategories] = useState([]);

  const [audiobookDetail, setAudiobookDetail, setAudiobookDetailRefetch] = useAdminAudiobookData();
  const [audiobookCover, setAudiobookCoverRefetch] = useAudiobookCover();
  const [audiobookPart, setAudiobookPartRefetch] = useAudiobookPart();
  const [audiobookCommnets, setAudiobookCommnetsRefetchState] = useAdminAudiobookComments();

  const categoriesStore = useCategoryListStore();

  const categories = useCategoryListStore((state) => state.categories);
  const dateUpdate = useCategoryListStore((state) => state.dateUpdate);

  const renderStars = () => {
    let stars = [];
    let amountOfStars = 5;
    if (audiobookDetail != null) {
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
    }
    return stars;
  };

  useEffect(() => {
    if (props.audiobookState.refresh) {
      setTimeout(function () {
        setAudiobookDetailRefetch(true);
        setAudiobookCoverRefetch(true);
        setAudiobookPartRefetch(true);
      }, props.audiobookState.addAudiobookSeconds);
    }
  }, [props.audiobookState.refresh]);

  return (
    <div className='container-fluid main-container mt-3'>
      <div className='card position-relative p-3 mb-5  shadow'>
        <AdminNavBarProviders token={props.token} />
        <hr className='line' />
        <div className='row '>
          <div className='col-4'>
            <AdminAudiobookCover
              audiobookCover={audiobookCover}
              setAudiobookState={props.setAudiobookState}
              audiobookState={props.audiobookState}
              t={props.t}
              setAudiobookCoverRefetch={setAudiobookCoverRefetch}
              audiobookDetail={audiobookDetail}
              token={props.token}
              i18n={props.i18n}
            />
            <Alert
              show={props.audiobookState.errorCover != ''}
              className='dangerAllert mt-1 text-center'
              variant='danger'
            >
              {props.audiobookState.errorCover}
            </Alert>
          </div>

          <div className='col-5'>
            <AdminAudiobookEditForm
              audiobookDetail={audiobookDetail}
              setAudiobookDetail={setAudiobookDetail}
              setAudiobookDetailRefetch={setAudiobookDetailRefetch}
              setAudiobookState={props.setAudiobookState}
              audiobookState={props.audiobookState}
              i18n={props.i18n}
              t={props.t}
              token={props.token}
            />

            <div className='row me-4 mt-2'>
              <hr></hr>
            </div>
            <div className='row d-flex justify-content-center me-1'>
              {audiobookPart != null && audiobookDetail != null ? (
                <AdminAudiobookPlayer
                  part={props.audiobookState.part}
                  audiobookPart={audiobookPart}
                  parts={audiobookDetail.parts}
                  setState={props.setAudiobookState}
                  state={props.audiobookState}
                  t={props.t}
                />
              ) : null}
              <Alert
                show={props.audiobookState.errorPart != ''}
                className='dangerAllert mt-1 text-center'
                variant='danger'
              >
                {props.audiobookState.errorPart}
              </Alert>
            </div>
          </div>
          <div className='col-3'>
            <div className='row d-flex justify-content-center text-center mb-2'>
              <h4>{props.t('rating')}</h4>
              {renderStars()}
            </div>
            {audiobookDetail != undefined ? (
              <div className='row d-flex justify-content-center text-center mb-2'>
                <div className='col-3 mx-0 p-0'>
                  <h4>{props.t('rated')}</h4>
                </div>
                <div className='col-1 mx-0 p-0'>
                  <h4>{audiobookDetail.ratingAmount}</h4>
                </div>
              </div>
            ) : null}
            <div className='row d-flex justify-content-center text-center'>
              <h4>{props.t('categories')}</h4>
            </div>
            <div className='row d-flex justify-content-center text-center'></div>
            <AdminAudiobookCategoryList
              audiobookDetail={audiobookDetail}
              t={props.t}
              i18n={props.i18n}
              token={props.token}
              setAudiobookState={props.setAudiobookState}
              audiobookState={props.audiobookState}
              setAudiobookDetailRefetch={setAudiobookDetailRefetch}
            />

            <div className='row'>
              <Button
                name='en'
                size='sm'
                className='btn button px-4 my-1 audiobook_detail_modal_button success_button'
                onClick={() =>
                  props.setAudiobookState((prev) => ({
                    ...prev,
                    addCategoriesModal: !props.audiobookState.addCategoriesModal,
                  }))
                }
              >
                {props.t('addCategory')}
              </Button>
            </div>

            <AdminAudiobookDeleteEntarlyButton
              audiobookDetail={audiobookDetail}
              audiobookState={props.audiobookState}
              setAudiobookState={props.setAudiobookState}
              token={props.token}
              i18n={props.i18n}
              t={props.t}
            />

            <AdminAudiobookReAddButton
              dateUpdate={dateUpdate}
              categories={categories}
              categoriesStore={categoriesStore}
              setCategories={setCategories}
              audiobookState={props.audiobookState}
              setAudiobookState={props.setAudiobookState}
              token={props.token}
              i18n={props.i18n}
              t={props.t}
            />

            <div className='row my-1 '>
              <ZipButton
                audiobookDetail={audiobookDetail}
                state={props.audiobookState}
                setState={props.setAudiobookState}
                handleClose={null}
                cssData={'primary_button'}
                t={props.t}
                i18n={props.i18n}
                token={props.token}
              />
            </div>
          </div>
        </div>
        <p className='text-center fs-1'> {props.t('comments')}</p>
        <hr></hr>
        <AdminAudiobookRenderCommentsList
          audiobookDetail={audiobookDetail}
          audiobookState={props.audiobookState}
          setAudiobookState={props.setAudiobookState}
          audiobookCommnets={audiobookCommnets}
          setAudiobookCommnetsRefetchState={setAudiobookCommnetsRefetchState}
          t={props.t}
          token={props.token}
          i18n={props.i18n}
        />
      </div>
      {props.audiobookState.addCategoriesModal ? (
        <AdminAudiobookAddCategoriesModal
          audiobookDetail={audiobookDetail}
          audiobookState={props.audiobookState}
          setAudiobookState={props.setAudiobookState}
          t={props.t}
          token={props.token}
          setAudiobookDetailRefetch={setAudiobookDetailRefetch}
          i18n={props.i18n}
        />
      ) : null}
      {props.audiobookState.reAddingModal && categoriesState.length != 0 ? (
        <AdminAudiobookReAddingModal
          audiobookDetail={audiobookDetail}
          audiobookState={props.audiobookState}
          setAudiobookState={props.setAudiobookState}
          categoriesState={categoriesState}
          t={props.t}
          token={props.token}
          i18n={props.i18n}
        />
      ) : null}
    </div>
  );
}
