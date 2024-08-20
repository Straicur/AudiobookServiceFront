import React, { useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import UserRenderCategoriesList from './UserRenderCategoriesList';

export default function UserCategoriesListModal(props) {
  const lastOpenedCategories = useRef([]);

  const handleClose = () => {
    props.setReportState((prev) => ({
      ...prev,
      openCategoriesList: !props.reportState.openCategoriesList,
    }));
  };

  return (
    <Modal
      size='lg'
      show={props.reportState.openCategoriesList}
      onHide={handleClose}
      backdrop='static'
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.t('addCategory')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserRenderCategoriesList
          //   categories={props.categories}
          //   audiobookAddCategory={props.audiobookAddCategory}
          //   audiobookDetail={props.audiobookDetail}
          lastOpenedCategories={lastOpenedCategories}
          t={props.t}
          i18n={props.i18n}
          token={props.token}
        />
      </Modal.Body>
    </Modal>
  );
}
