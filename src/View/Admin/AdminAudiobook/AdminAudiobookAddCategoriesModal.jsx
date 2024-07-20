import React, { useRef } from 'react';
import AdminAudiobookRenderCategoriesList from './AdminAudiobookRenderCategoriesList';
import Modal from 'react-bootstrap/Modal';

export default function AdminAudiobookAddCategoriesModal(props) {
  const categoriesId = useRef([]);
  const lastOpenedCategories = useRef([]);

  const handleClose = () => {
    props.setAudiobookDetailRefetch();
    props.setAudiobookState((prev) => ({
      ...prev,
      addCategoriesModal: !props.audiobookState.addCategoriesModal,
    }));
  };

  return (
    <Modal
      size='lg'
      show={props.audiobookState.addCategoriesModal}
      onHide={handleClose}
      backdrop='static'
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.t('addCategory')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AdminAudiobookRenderCategoriesList
          categories={props.categories}
          audiobookAddCategory={props.audiobookAddCategory}
          audiobookDetail={props.audiobookDetail}
          categoriesId={categoriesId}
          lastOpenedCategories={lastOpenedCategories}
          t={props.t}
          i18n={props.i18n}
          token={props.token}
        />
      </Modal.Body>
    </Modal>
  );
}
