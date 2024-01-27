import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { HandleFetch } from '../../../Util/HandleFetch';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import PickActionIdAddList from './PickActionIdAddList';

export default function AddNotificationModal(props) {
  const [state, setState] = useState({
    actionId: '',
    notificationType: 0,
    text: '',
    userType: 0,
  });

  const [actionState, setActionState] = useState({
    list: false,
    actionIdChanged: false,
  });

  const handleClose = () => {
    props.setState({
      ...props.state,
      addNotificationModal: !props.state.addNotificationModal,
      refresh: !props.state.refresh,
    });
  };

  const changeNotificationType = (element) => {
    if (element.target.value != 0) {
      setState({
        ...state,
        notificationType: parseInt(element.target.value),
      });
    }
  };

  const changeUserType = (element) => {
    if (element.target.value != 0) {
      setState({
        ...state,
        userType: parseInt(element.target.value),
      });
    }
  };

  const changeText = (element) => {
    setState({
      ...state,
      text: element.target.value,
    });
  };

  const selectActionId = () => {
    setActionState({
      ...actionState,
      list: true,
    });
  };
  const goBack = () => {
    setActionState({
      ...actionState,
      list: false,
    });
  };

  const createAdditionalData = () => {
    let additionalData = {};

    if (state.notificationType == 4) {
      additionalData.categoryKey = state.actionId;
    }
    if (state.notificationType == 5) {
      additionalData.actionId = state.actionId;
    }
    if (state.notificationType == 2) {
      additionalData.userId = state.actionId;
    }
    if (state.text != '') {
      additionalData.text = state.text;
    }

    return additionalData;
  };

  const addNotification = () => {
    HandleFetch(
      '/admin/user/notification',
      'PUT',
      {
        notificationType: state.notificationType,
        notificationUserType: state.userType,
        additionalData: createAdditionalData(),
      },
      props.token,
      props.i18n.language,
    )
      .then(() => {
        props.setState({
          ...props.state,
          addNotificationModal: !props.state.addNotificationModal,
          refresh: !props.state.refresh,
        });
      })
      .catch((e) => {
        props.setNotificationsState({
          ...props.notificationsState,
          error: e,
        });
      });
  };

  return (
    <Modal size='lg' show={props.state.addNotificationModal} onHide={handleClose} backdrop='static'>
      <Modal.Header>
        <Modal.Title>{props.t('addNotification')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {actionState.list ? (
          <PickActionIdAddList
            state={state}
            setState={setState}
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
                    changeUserType(e);
                  }}
                  value={state.userType}
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
                    changeNotificationType(e);
                  }}
                  value={state.notificationType}
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
                  aria-label='With textarea'
                  value={state.text}
                  onChange={(e) => {
                    changeText(e);
                  }}
                />
              </InputGroup>
              <InputGroup className='mt-2 mb-1 input_modal py-1'>
                <InputGroup.Text>{props.t('actionId')}</InputGroup.Text>
                <Form.Control disabled className='text-success' value={state.actionId} />
              </InputGroup>
            </div>
            {actionState.actionIdChanged || state.notificationType == 1 ? (
              <div className='row justify-content-center mx-5 mt-3'>
                <div className='col-7'>
                  <Button
                    name='en'
                    variant='success'
                    size='sm'
                    className='btn button button_notification'
                    disabled={state.notificationType == 0 || state.userType == 0}
                    onClick={(e) => addNotification(e)}
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
                    disabled={state.notificationType == 0 || state.userType == 0}
                    size='sm'
                    className='btn button button_notification'
                    onClick={(e) => selectActionId(e)}
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
          <Button variant='dark' onClick={goBack}>
            {props.t('back')}
          </Button>
        ) : null}
        <Button variant='dark' onClick={handleClose}>
          {props.t('close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
