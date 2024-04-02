import React, { useEffect, useState } from 'react';
import AdminAudiobookRenderCategoriesList from './AdminAudiobookRenderCategoriesList';
import Modal from 'react-bootstrap/Modal';

export default function AdminAudiobookAddCategoriesModal(props) {
  const [categoriesState, setCategoriesState] = useState({
    categoriesId: [],
    refresh: false,
  });

  const handleClose = () => {
    props.setAudiobookDetailRefetch();
    props.setAudiobookState((prev) => ({
      ...prev,
      addCategoriesModal: !props.audiobookState.addCategoriesModal,
    }));
  };

  useEffect(() => {
    let categoriesIds = [];

    for (const category of props.audiobookDetail.categories) {
      categoriesIds.push(category.id);
    }

    setCategoriesState((prev) => ({
      ...prev,
      categoriesId: categoriesIds,
    }));

    if (categoriesState.refresh) {
      // fetchCategories();
    }
  }, [categoriesState.refresh]);

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
          categories={props.categories.categories}
          audiobookAddCategory={props.audiobookAddCategory}
          audiobookDetail={props.audiobookDetail}
          categoriesState={categoriesState}
          setCategoriesState={setCategoriesState}
          t={props.t}
          i18n={props.i18n}
          token={props.token}
        />
      </Modal.Body>
    </Modal>
  );
}
