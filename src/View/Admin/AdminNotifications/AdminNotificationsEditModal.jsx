import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import AdminNotificationsPickActionIdList from './AdminNotificationsPickActionIdList';
import AdminNotificationsEditService from 'Service/Admin/AdminNotificationsEditService';

export default function AdminNotificationsEditModal(props) {
  const [notificationsState, setNotificationsState] = useState({
    actionId: '',
    dateAdd: 0,
    delete: false,
    id: '',
    notificationType: 0,
    text: '',
    userType: 0,
  });

  const [actionState, setActionState] = useState({
    list: false,
    actionIdChanged: false,
  });

  const [deleteState, setDelteteState] = useState({
    sure: false,
  });

  const adminService = new AdminNotificationsEditService(
    notificationsState,
    setNotificationsState,
    props,
    actionState,
    setActionState,
    deleteState,
    setDelteteState,
  );

  useEffect(() => {
    setNotificationsState(props.state.editNotificationElement);
  }, [props]);

  return (
    <Modal
      size='lg'
      show={props.state.editNotificationkModal}
      onHide={adminService.handleClose}
      backdrop='static'
    >
      <Modal.Header>
        <Modal.Title>{props.t('notificationDetail')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {actionState.list ? (
          <AdminNotificationsPickActionIdList
            state={notificationsState}
            setState={setNotificationsState}
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
                  value={notificationsState.userType}
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
                  value={notificationsState.notificationType}
                >
                  <option value={0}>{props.t('selectType')}</option>
                  <option value={1}>{props.t('notificationTypeNormal')}</option>
                  <option value={2}>{props.t('notificationTypeAdmin')}</option>
                  <option value={3}>{props.t('notificationTypeProposed')}</option>
                  <option value={4}>{props.t('notificationTypeNewCategory')}</option>
                  <option value={5}>{props.t('notificationTypeNewAudiobook')}</option>
                </Form.Select>
              </InputGroup>
              <InputGroup className='mt-2 input_modal'>
                <InputGroup.Text>
                  {props.t('description')} ({props.t('optional')})
                </InputGroup.Text>
                <Form.Control
                  as='textarea'
                  aria-label='With textarea'
                  value={notificationsState.text}
                  onChange={(e) => {
                    adminService.changeText(e);
                  }}
                />
              </InputGroup>

              <InputGroup className='mb-2 mt-3 input_modal'>
                <InputGroup.Text>{props.t('actionId')}</InputGroup.Text>
                <Form.Control disabled value={notificationsState.actionId} />
                <Button
                  name='en'
                  variant='outline-secondary'
                  size='sm'
                  className='btn button mx-2'
                  onClick={(e) => adminService.selectActionId(e)}
                >
                  {props.t('select')}
                </Button>
              </InputGroup>

              <InputGroup className='my-2 input_modal'>
                <InputGroup.Text>{props.t('deleted')}</InputGroup.Text>
                <Form.Control
                  disabled
                  value={notificationsState.delete ? props.t('yes') : props.t('no')}
                />
                {deleteState.sure ? (
                  <Button
                    name='en'
                    size='sm'
                    className='btn button'
                    variant='outline-danger'
                    onClick={(e) => adminService.deleteNotification(e)}
                  >
                    {props.t('yes')}
                  </Button>
                ) : null}
                {deleteState.sure ? (
                  <Button
                    name='en'
                    size='sm'
                    className='btn button'
                    variant='outline-success'
                    onClick={() =>
                      setDelteteState({
                        ...deleteState,
                        sure: !deleteState.sure,
                      })
                    }
                  >
                    {props.t('no')}
                  </Button>
                ) : null}
                {!deleteState.sure ? (
                  <Button
                    name='en'
                    variant={notificationsState.delete ? 'outline-success' : 'outline-danger'}
                    size='sm'
                    className='btn button mx-2'
                    onClick={() =>
                      setDelteteState({
                        ...deleteState,
                        sure: !deleteState.sure,
                      })
                    }
                  >
                    {notificationsState.delete ? props.t('activate') : props.t('delete')}
                  </Button>
                ) : null}
              </InputGroup>
            </div>
            <div className='row justify-content-center mx-5 mt-2'>
              <div className='col-7'>
                <Button
                  name='en'
                  variant='success'
                  size='sm'
                  className='btn button button_notification'
                  onClick={(e) => adminService.saveChanges(e)}
                >
                  {props.t('save')}
                </Button>
              </div>
            </div>
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
