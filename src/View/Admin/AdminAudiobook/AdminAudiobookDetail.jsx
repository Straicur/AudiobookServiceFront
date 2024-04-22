import React, { useEffect } from 'react';
import { useAdminAudiobookData } from 'Providers/Admin/AdminAudiobookDataProvider';
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
import { useAdminCategoriesTree } from 'Providers/Admin/AdminCategoriesTreeProvider';
import { useAdminCategoriesListData } from 'Providers/Admin/AdminCategoriesListProvider';

export default function AdminAudiobookDetail(props) {
  const [
    audiobookDetail,
    setAudiobookDetailRefetch,
    setAudiobookDetail,
    audiobookDataEdit,
    audiobookDeleteCategory,
    audiobookAddCategory,
    deleteAudiobook,
  ] = useAdminAudiobookData();
  const [audiobookPart, setAudiobookPartRefetch] = useAudiobookPart();
  const [categoriesTree] = useAdminCategoriesTree();
  const [categories] = useAdminCategoriesListData();
  const [audiobookCommnets, setAudiobookCommentsRefetch, deleteComment] =
    useAdminAudiobookComments();

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
        setAudiobookDetailRefetch();
        setAudiobookPartRefetch();
        setAudiobookCommentsRefetch();
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
              setAudiobookState={props.setAudiobookState}
              audiobookState={props.audiobookState}
              t={props.t}
              setAudiobookCoverRefetch={setAudiobookDetailRefetch}
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
              audiobookDataEdit={audiobookDataEdit}
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
              ) : (
                <Alert
                  show={audiobookPart === null}
                  className='dangerAllert mt-1 text-center'
                  variant='danger'
                >
                  {props.t('cantFindAnyParts')}
                </Alert>
              )}
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
              audiobookDeleteCategory={audiobookDeleteCategory}
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
              deleteAudiobook={deleteAudiobook}
              audiobookState={props.audiobookState}
              setAudiobookState={props.setAudiobookState}
              token={props.token}
              i18n={props.i18n}
              t={props.t}
            />

            <AdminAudiobookReAddButton
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
          deleteComment={deleteComment}
          setAudiobookCommentsRefetch={setAudiobookCommentsRefetch}
          t={props.t}
          token={props.token}
          i18n={props.i18n}
        />
      </div>
      {props.audiobookState.addCategoriesModal ? (
        <AdminAudiobookAddCategoriesModal
          categories={categoriesTree}
          audiobookAddCategory={audiobookAddCategory}
          audiobookDetail={audiobookDetail}
          audiobookState={props.audiobookState}
          setAudiobookState={props.setAudiobookState}
          t={props.t}
          token={props.token}
          setAudiobookDetailRefetch={setAudiobookDetailRefetch}
          i18n={props.i18n}
        />
      ) : null}
      {props.audiobookState.reAddingModal ? (
        <AdminAudiobookReAddingModal
          audiobookDetail={audiobookDetail}
          audiobookState={props.audiobookState}
          setAudiobookState={props.setAudiobookState}
          categories={categories.categories}
          t={props.t}
          token={props.token}
          i18n={props.i18n}
        />
      ) : null}
    </div>
  );
}
