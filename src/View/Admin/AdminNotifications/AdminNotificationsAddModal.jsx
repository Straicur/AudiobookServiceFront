import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import AdminNotificationsPickActionIdAddList from './AdminNotificationsPickActionIdAddList';
import AdminNotificationsAddService from 'Service/Admin/AdminNotificationsAddService';
import CreateUtil from '../../../Util/CreateUtil';

export default function AdminNotificationsAddModal(props) {
  const [modalState, setModalState] = useState({
    actionId: '',
    categoryKey: '',
    notificationType: 0,
    text: '',
    userType: 0,
    active: false,
    dateActive: null,
  });

  const [actionState, setActionState] = useState({
    list: false,
    actionIdChanged: false,
  });

  const adminService = new AdminNotificationsAddService(
    props,
    modalState,
    setModalState,
    actionState,
    setActionState,
  );

  return (
    <Modal
      size='lg'
      show={props.state.addNotificationModal}
      onHide={adminService.handleClose}
      backdrop='static'
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.t('addNotification')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {actionState.list ? (
          <AdminNotificationsPickActionIdAddList
            state={modalState}
            setState={setModalState}
            actionState={actionState}
            setActionState={setActionState}
            notificationsState={props.notificationsState}
            setNotificationsState={props.setNotificationsState}
            audiobooksState={props.audiobooksState}
            setAudiobooksState={props.setAudiobooksState}
            categoriesState={props.categoriesState}
            setCategoriesState={props.setCategoriesState}
            usersState={props.usersState}
            setUsersState={props.setUsersState}
            notificationsUsersState={props.notificationsUsersState}
            setNotificationsUsersState={props.setNotificationsUsersState}
            notificationsAudiobooksState={props.notificationsAudiobooksState}
            setNotificationsAudiobooksState={props.setNotificationsAudiobooksState}
            t={props.t}
            i18n={props.i18n}
            token={props.token}
          />
        ) : (
          <div className='container'>
            <div className='row'>
              <InputGroup className='mb-1 input_modal py-1'>
                <InputGroup.Text className='input-notification-text-new text-light'>
                  {props.t('userType')}
                </InputGroup.Text>
                <Form.Select
                  name='userType'
                  onChange={(e) => {
                    adminService.handleChangeInt(e);
                  }}
                  value={modalState.userType}
                >
                  <option value={0}>{props.t('selectNotificationType')}</option>
                  <option value={1}>{props.t('administration')}</option>
                  <option value={2}>{props.t('system')}</option>
                </Form.Select>
              </InputGroup>
              <InputGroup className='mb-1 input_modal py-1'>
                <InputGroup.Text className='input-notification-text-new text-light'>
                  {props.t('notificationType')}
                </InputGroup.Text>
                <Form.Select
                  name='notificationType'
                  onChange={(e) => {
                    adminService.handleChangeInt(e);
                  }}
                  value={modalState.notificationType}
                >
                  <option value={0}>{props.t('selectType')}</option>
                  <option value={1}>{props.t('notificationTypeNormal')}</option>
                  <option value={2}>{props.t('notificationTypeAdmin')}</option>
                  <option value={4}>{props.t('notificationTypeNewCategory')}</option>
                  <option value={5}>{props.t('notificationTypeNewAudiobook')}</option>
                </Form.Select>
              </InputGroup>
              <InputGroup className='mb-1 input_modal py-1'>
                <InputGroup.Text>
                  {props.t('description')} ({props.t('optional')})
                </InputGroup.Text>
                <Form.Control
                  as='textarea'
                  name='text'
                  aria-label='With textarea'
                  value={modalState.text}
                  onChange={(e) => {
                    adminService.handleChange(e);
                  }}
                />
              </InputGroup>
              <InputGroup className='mt-2 mb-1 input_modal py-1'>
                <InputGroup.Text>{props.t('actionId')}</InputGroup.Text>
                <Form.Control disabled className='text-success' value={modalState.actionId} />
              </InputGroup>
              <InputGroup className='mb-1 input_modal py-1 '>
                <Form.Check
                  type='switch'
                  id='custom-switch'
                  label={props.t('active')}
                  checked={modalState.active != null && modalState.active}
                  onChange={(e) =>
                    setModalState((prev) => ({
                      ...prev,
                      active: e.target.checked,
                    }))
                  }
                />
              </InputGroup>
              {modalState.active ? null : (
                <InputGroup className='mb-1 input_modal'>
                  <InputGroup.Text className='input-notification-text-new text-light'>
                    {props.t('activationDate')}
                  </InputGroup.Text>
                  <Form.Control
                    type='datetime-local'
                    name='dateActive'
                    value={
                      modalState.dateActive !== null
                        ? CreateUtil.createDateTime(modalState.dateActive)
                        : ''
                    }
                    onChange={(event) => {
                      adminService.handleChange(event);
                    }}
                  />
                </InputGroup>
              )}
            </div>
            {actionState.actionIdChanged || modalState.notificationType === 1 ? (
              <div className='row justify-content-center mx-5 mt-3'>
                <div className='col-7'>
                  <Button
                    name='en'
                    variant='success'
                    size='sm'
                    className='btn button button_notification'
                    disabled={
                      modalState.notificationType === 0 ||
                      modalState.userType === 0 ||
                      (modalState.active === false &&
                        (modalState.dateActive === null || modalState.dateActive.length === 0))
                    }
                    onClick={() =>
                      props.addNotification({
                        modalState: modalState,
                        addNotificationModal: props.state.addNotificationModal,
                        setState: props.setState,
                      })
                    }
                  >
                    {props.t('save')}
                  </Button>
                </div>
              </div>
            ) : (
              <div className='row justify-content-center mx-5 mt-3'>
                <div className='col-7'>
                  <Button
                    name='en'
                    variant='dark'
                    disabled={modalState.notificationType === 0 || modalState.userType === 0}
                    size='sm'
                    className='btn button button_notification'
                    onClick={(e) => adminService.selectActionId(e)}
                  >
                    {props.t('select')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {actionState.list ? (
          <Button variant='dark' onClick={adminService.goBack}>
            {props.t('back')}
          </Button>
        ) : null}
        <Button variant='dark' onClick={adminService.handleClose}>
          {props.t('close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
