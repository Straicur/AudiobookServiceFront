import React, { useState, useLayoutEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './UserNotificationOffCanvas.css';
import { v4 as uuidv4 } from 'uuid';
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';
import CreateUtil from 'Util/CreateUtil';
import { useNotifications } from 'Providers/Common/NotificationsProvider';
import { useNotificationsListStore } from 'Store/store';

export default function UserNotificationOffCanvas(props) {
  const [show, setShow] = useState(true);

  const [notificationsData, refetch, mutate] = useNotifications();

  const notificationsListStore = useNotificationsListStore();
  const notifications = useNotificationsListStore((state) => state.notifications);
  const maxPage = useNotificationsListStore((state) => state.maxPage);
  const dateUpdate = useNotificationsListStore((state) => state.dateUpdate);
  const trigerTable = useNotificationsListStore((state) => state.trigerTable);

  const navigate = useNavigate();

  const handleClose = () => {
    props.setState((prev) => ({
      ...prev,
      notificationsOffCanvas: !props.state.notificationsOffCanvas,
    }));
    setShow(false);
  };

  const createNotificationType = (element) => {
    switch (element) {
      case 1: {
        return props.t('notificationTypeNormal');
      }
      case 2: {
        return props.t('notificationTypeAdmin');
      }
      case 3: {
        return props.t('notificationTypeProposed');
      }
      case 4: {
        return props.t('notificationTypeNewCategory');
      }
      case 5: {
        return props.t('notificationTypeNewAudiobook');
      }
      case 6: {
        return props.t('notificationTypeUserDeleteDecline');
      }
    }
  };

  const activateNotification = (notification) => {
    if (notification.active == undefined) {
      let hasRole = trigerTable.filter((x) => x == notification.id);
      //TODO to jest do testów i do tego jeszcze nwm czy nie update tego cache bo zostaje powiadomienie na nowe
      if (hasRole.length == 0) {
        notificationsListStore.addTrigerTable(notification.id);
        mutate(notification.id);
      }
    }
  };

  const loadMore = () => {
    props.setState((prev) => ({
      ...prev,
      page: props.state.page + 1,
    }));
  };

  const renderNotifications = () => {
    if (dateUpdate[props.state.page] <= Date.now() || dateUpdate[props.state.page] === undefined) {
      let copy = [];
      if (notifications !== undefined && notifications != null) {
        copy = notifications;
      }
      if (notificationsData != null) {
        copy[props.state.page] = notificationsData.systemNotifications;

        notificationsListStore.addNotifications(props.state.page, copy);
        notificationsListStore.setMaxPage(notificationsData.maxPage);
      }
    }

    let returnArray = [];
    if (notifications !== undefined && notifications !== null) {
      notifications.map((notifications, index) => {
        if (index <= props.state.page) {
          returnArray.push(
            notifications.map((notification) => {
              return (
                <div
                  key={uuidv4()}
                  className='border border-light border-1 rounded-4 text-white p-3 my-3'
                  onMouseEnter={() => activateNotification(notification)}
                >
                  <div className='row mb-1'>
                    <div className='col'>
                      {notification.active != undefined ? (
                        <Badge bg='secondary'>{props.t('displayed')}</Badge>
                      ) : (
                        <Badge bg='success'>{props.t('new')}</Badge>
                      )}
                    </div>
                    <div className='col'>
                      {props.t('dateAdd')} {': '}
                      {CreateUtil.createDate(notification.dateAdd)}
                    </div>
                  </div>
                  <div className='row mb-1'>
                    <div className='col'>
                      {props.t('type')}
                      {': '}
                      {createNotificationType(notification.notificationType)}
                    </div>
                    {notification.notificationType == 1 ||
                    notification.notificationType == 2 ? null : (
                      <div className='col'>
                        <Button
                          name='logout'
                          variant='light'
                          size='sm'
                          className='btn button rounded detail-notification-btn'
                          onClick={() => navigate(`/main`)}
                        >
                          {props.t('look')}
                        </Button>
                      </div>
                    )}
                  </div>
                  {notification.text != undefined ? (
                    <div className='row'>
                      <div className='col'>
                        {props.t('text')}
                        {': '}
                        {notification.text}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            }),
          );
        }
      });
    }

    return returnArray;
  };

  useLayoutEffect(() => {
    if (props.state.page !== 0) {
      refetch();
    }
  }, [props.state.page]);

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      className='bg-dark text-light off_canvas_with'
      backdrop='static'
      placement='end'
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <h2>{props.t('notifications')}</h2>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className='pt-0 notification-heigth overflow-auto'>
        <hr></hr>
        <div>{renderNotifications()}</div>
        {props.state.page + 1 < maxPage ? (
          <div className='text-white row align-items-center justify-content-center '>
            <div
              className='col-4 align-self-center text-center rounded-4 load-more-btn'
              onClick={() => loadMore()}
            >
              <span className='pe-2'>{props.t('loadMore')} </span>
              <i className='bi-arrow-down-square'></i>
            </div>
          </div>
        ) : null}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
