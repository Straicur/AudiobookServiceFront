import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import AdminNotificationsPickActionIdList from './AdminNotificationsPickActionIdList';
import AdminNotificationsEditService from 'Service/Admin/AdminNotificationsEditService';
import CreateUtil from '../../../Util/CreateUtil';

export default function AdminNotificationsEditModal(props) {
  const [actionState, setActionState] = useState({
    list: false,
    actionIdChanged: false,
  });

  const [listState, setListState] = useState(1);
  const [notEditableState, setNotEditableState] = useState(false);

  const adminService = new AdminNotificationsEditService(
    props.notificationState,
    props.setNotificationState,
    props,
    actionState,
    setActionState,
  );

  useEffect(() => {
    if (props.notificationState != null) {
      if (props.notificationState.notificationType === 2) {
        setListState(1);
      } else if (props.notificationState.notificationType === 5) {
        setListState(2);
      } else if (props.notificationState.notificationType === 4) {
        setListState(3);
      }
      if (
        !notEditableState &&
        props.notificationState.notificationType !== 1 &&
        props.notificationState.notificationType !== 2 &&
        props.notificationState.notificationType !== 3 &&
        props.notificationState.notificationType !== 4 &&
        props.notificationState.notificationType !== 5
      ) {
        setNotEditableState(true);
      }
    }
  }, [props.notificationState.notificationType]);

  return (
    <Modal
      size='lg'
      show={props.notificationState.editNotificationModal}
      onHide={adminService.handleClose}
      backdrop='static'
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.t('notificationDetail')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {actionState.list ? (
          <AdminNotificationsPickActionIdList
            state={props.notificationState}
            setState={props.setNotificationState}
            actionState={actionState}
            setActionState={setActionState}
            setListState={setListState}
            listState={listState}
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
                  value={props.notificationState.userType}
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
                  disabled={notEditableState}
                  onChange={(e) => {
                    adminService.handleChangeInt(e);

                    if (parseInt(e.target.value) !== props.notificationState.notificationType) {
                      props.setNotificationState((prev) => ({
                        ...prev,
                        actionId: '',
                      }));
                    }
                  }}
                  value={props.notificationState.notificationType}
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
                  name='text'
                  aria-label='With textarea'
                  value={props.notificationState.text}
                  onChange={(e) => {
                    adminService.handleChange(e);
                  }}
                />
              </InputGroup>
              <InputGroup className='mb-2 mt-3 input_modal'>
                <InputGroup.Text>{props.t('actionId')}</InputGroup.Text>
                <Form.Control disabled value={props.notificationState.actionId} />
                <Button
                  name='en'
                  variant='outline-secondary'
                  size='sm'
                  className='btn button mx-2'
                  disabled={
                    props.notificationState.notificationType === 1 ||
                    props.notificationState.notificationType === 3 ||
                    notEditableState
                  }
                  onClick={(e) => adminService.selectActionId(e)}
                >
                  {props.t('select')}
                </Button>
              </InputGroup>

              <InputGroup className='my-2 input_modal'>
                <InputGroup.Text>{props.t('deleted')}</InputGroup.Text>
                <Form.Control
                  disabled
                  value={props.notificationState.delete ? props.t('yes') : props.t('no')}
                />
                {props.notificationState.sure ? (
                  <Button
                    name='en'
                    size='sm'
                    className='btn button'
                    variant='outline-danger'
                    onClick={() => {
                      props.setNotificationState((prev) => ({
                        ...prev,
                        sure: !props.notificationState.sure,
                        delete: !props.notificationState.delete,
                        doDeleteOrUpdate: !props.notificationState.doDeleteOrUpdate,
                      }));
                    }}
                  >
                    {props.t('yes')}
                  </Button>
                ) : null}
                {props.notificationState.sure ? (
                  <Button
                    name='en'
                    size='sm'
                    className='btn button'
                    variant='outline-success'
                    onClick={() =>
                      props.setNotificationState((prev) => ({
                        ...prev,
                        sure: !props.notificationState.sure,
                      }))
                    }
                  >
                    {props.t('no')}
                  </Button>
                ) : null}
                {!props.notificationState.sure ? (
                  <Button
                    name='en'
                    variant={props.notificationState.delete ? 'outline-success' : 'outline-danger'}
                    size='sm'
                    className='btn button mx-2'
                    onClick={() =>
                      props.setNotificationState((prev) => ({
                        ...prev,
                        sure: !props.notificationState.sure,
                      }))
                    }
                  >
                    {props.notificationState.delete ? props.t('activate') : props.t('delete')}
                  </Button>
                ) : null}
              </InputGroup>
              {props.notificationState.activeBefore ? null : (
                <>
                  <InputGroup className='mb-1 input_modal py-1'>
                    <Form.Check
                      type='switch'
                      id='custom-switch'
                      label={props.t('active')}
                      checked={
                        props.notificationState.active != null && props.notificationState.active
                      }
                      onChange={(e) =>
                        props.setNotificationState((prev) => ({
                          ...prev,
                          active: e.target.checked,
                        }))
                      }
                    />
                  </InputGroup>
                  {props.notificationState.active ? null : (
                    <InputGroup className='mb-1 input_modal'>
                      <InputGroup.Text className='input-notification-text-new text-light'>
                        {props.t('activationDate')}
                      </InputGroup.Text>
                      <Form.Control
                        type='datetime-local'
                        name='dateActive'
                        value={
                          props.notificationState.dateActive !== null &&
                          props.notificationState.dateActive !== 0
                            ? CreateUtil.createDateTime(props.notificationState.dateActive)
                            : ''
                        }
                        onChange={(event) => {
                          adminService.handleChange(event);
                        }}
                      />
                    </InputGroup>
                  )}
                </>
              )}
            </div>
            <div className='row justify-content-center mx-5 mt-2'>
              <div className='col-7'>
                <Button
                  name='en'
                  variant='success'
                  size='sm'
                  className='btn button button_notification'
                  disabled={
                    props.notificationState.notificationType === 0 ||
                    props.notificationState.userType === 0 ||
                    (props.notificationState.notificationType !== 1 &&
                      props.notificationState.notificationType !== 3 &&
                      props.notificationState.actionId.length === 0) ||
                    (props.notificationState.active === false &&
                      (props.notificationState.dateActive === null ||
                        props.notificationState.dateActive.length === 0 ||
                        props.notificationState.dateActive === 0))
                  }
                  onClick={() => {
                    if (props.notificationState.doDeleteOrUpdate !== null) {
                      props.deleteNotification({
                        notificationId: props.notificationState.id,
                        delete: props.notificationState.delete,
                      });
                    }

                    let jsonData = {
                      notificationId: props.notificationState.id,
                      notificationType: props.notificationState.notificationType,
                      notificationUserType: props.notificationState.userType,
                      additionalData: {
                        text: props.notificationState.text,
                      },
                    };

                    if (props.notificationState.categoryKey) {
                      jsonData.additionalData.categoryKey = props.notificationState.categoryKey;
                    }

                    if (props.notificationState.active) {
                      jsonData.additionalData.active = props.notificationState.active;
                    }

                    if (props.notificationState.dateActive) {
                      jsonData.additionalData.dateActive = props.notificationState.dateActive;
                    }

                    if (props.notificationState.actionId !== null) {
                      jsonData.additionalData.actionId = props.notificationState.actionId;
                    }

                    if (
                      props.notificationState.dateActive &&
                      props.notificationState.dateActive !== 0
                    ) {
                      jsonData.additionalData.dateActive = CreateUtil.createJsonFormatDateTime(
                        props.notificationState.dateActive,
                      );
                    }

                    if (
                      props.notificationState.notificationType &&
                      props.notificationState.dateActive !== 0
                    ) {
                      jsonData.additionalData.dateActive = CreateUtil.createJsonFormatDateTime(
                        props.notificationState.dateActive,
                      );
                    }

                    props.editNotification({
                      setNotificationState: props.setNotificationState,
                      jsonData: jsonData,
                      notificationState: props.notificationState,
                    });

                    adminService.handleClose();
                  }}
                >
                  {props.t('save')}
                </Button>
              </div>
            </div>
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
