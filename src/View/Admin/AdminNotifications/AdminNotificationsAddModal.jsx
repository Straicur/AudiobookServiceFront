import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import AdminNotificationsPickActionIdAddList from './AdminNotificationsPickActionIdAddList';
import AdminNotificationsAddService from 'Service/Admin/AdminNotificationsAddService';

export default function AdminNotificationsAddModal(props) {
  const [modalState, setModalState] = useState({
    actionId: '',
    notificationType: 0,
    text: '',
    userType: 0,
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
      <Modal.Header>
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
                  onChange={(e) => {
                    adminService.changeUserType(e);
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
                  onChange={(e) => {
                    adminService.changeNotificationType(e);
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
            </div>
            {actionState.actionIdChanged || modalState.notificationType == 1 ? (
              <div className='row justify-content-center mx-5 mt-3'>
                <div className='col-7'>
                  <Button
                    name='en'
                    variant='success'
                    size='sm'
                    className='btn button button_notification'
                    disabled={modalState.notificationType == 0 || modalState.userType == 0}
                    onClick={(e) => adminService.addNotification(e)}
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
                    disabled={modalState.notificationType == 0 || modalState.userType == 0}
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
        {actionState.list != 0 ? (
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
