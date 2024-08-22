import React, { useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import UserRenderCategoriesList from './UserRenderCategoriesList';
import { useUserCategoriesTree } from 'Providers/User/UserCategoriesTreeProvider';
import Button from 'react-bootstrap/Button';

export default function UserCategoriesListModal(props) {
  const lastOpenedCategories = useRef([]);

  const [categories] = useUserCategoriesTree();

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
      <Modal.Body
        className='text-white'
        style={{
          backgroundColor: '#2b2b2b',
        }}
      >
        <p className='text-center fs-2'>{props.t('addCategory')}</p>
        <UserRenderCategoriesList
          categories={categories}
          lastOpenedCategories={lastOpenedCategories}
          t={props.t}
          i18n={props.i18n}
          token={props.token}
        />
        <div className='row mt-3 justify-content-center'>
          <div className='col-7 align-self-center'>
            <Button
              variant='success'
              onClick={() => handleClose()}
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
