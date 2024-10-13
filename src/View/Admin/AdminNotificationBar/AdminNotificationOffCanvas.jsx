import React, { useState, useLayoutEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { v4 as uuidv4 } from 'uuid';
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';
import './AdminNotificationOffcanvas.css';
import CreateUtil from 'Util/CreateUtil';
import { useNotifications } from 'Providers/Common/NotificationsProvider';
import { useNotificationsListStore } from 'Store/store';

export default function AdminNotificationOffCanvas(props) {
  const [show, setShow] = useState(true);

  const [notificationsData, refetch, mutate] = useNotifications();

  const notificationsListStore = useNotificationsListStore();
  const notifications = useNotificationsListStore((state) => state.notifications);
  const maxPage = useNotificationsListStore((state) => state.maxPage);
  const dateUpdate = useNotificationsListStore((state) => state.dateUpdate);

  const navigate = useNavigate();

  const handleClose = () => {
    props.setState((prev) => ({
      ...prev,
      notificationsOffCanvas: !props.state.notificationsOffCanvas,
    }));
    setShow(false);
  };

  const refetchNewNotifications = useRef(true);

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
      case 7: {
        return props.t('notificationTypeReportAccepted');
      }
      case 8: {
        return props.t('notificationTypeReportDenied');
      }
    }
  };

  const navigateUser = (notification) => {
    switch (notification.notificationType) {
      case 3: {
        navigate(`/main`);
        break;
      }
      case 4: {
        navigate(`/admin/category/${notification.categoryKey}`);
        break;
      }
      case 5: {
        navigate(`/admin/audiobook/${notification.actionId}`);
        break;
      }
      case 6: {
        navigate(`/admin/users`);
        break;
      }
      case 7:
      case 8: {
        navigate(`/reports`);
        break;
      }
    }
  };

  const activateNotification = (notification, page, index) => {
    if (notification.active === undefined) {
      notificationsListStore.changeNotificationStatus(page, index);
      mutate({ id: notification.id, page: page });
    }
  };

  const loadMore = () => {
    if (props.state.page + 1 <= maxPage) {
      props.setState((prev) => ({
        ...prev,
        page: props.state.page + 1,
      }));
    }
  };

  const renderNotifications = () => {
    let returnArray = [];
    if (notifications !== undefined && notifications !== null) {
      notifications.map((pageNotifications, page) => {
        if (page <= props.state.page && pageNotifications !== null) {
          returnArray.push(
            pageNotifications.systemNotifications.map((notification, index) => {
              return (
                <div
                  key={uuidv4()}
                  className='border border-light border-1 rounded-4 text-white p-3 my-3'
                  onMouseEnter={() => activateNotification(notification, page, index)}
                >
                  <div className='row mb-1'>
                    <div className='col'>
                      {notification.active !== undefined ? (
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
                    {notification.notificationType === 1 ||
                    notification.notificationType === 2 ? null : (
                      <div className='col'>
                        <Button
                          name='logout'
                          variant='light'
                          size='sm'
                          className='btn button rounded detail-notification-btn'
                          onClick={() => navigateUser(notification)}
                        >
                          {props.t('look')}
                        </Button>
                      </div>
                    )}
                  </div>
                  {notification.text !== undefined && notification.text !== null ? (
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
    if (
      notificationsData !== null &&
      (dateUpdate[props.state.page] === undefined || dateUpdate[props.state.page] <= Date.now())
    ) {
      notificationsListStore.removePageNotifications(props.state.page);
      notificationsListStore.addNotifications(props.state.page, notificationsData);
      notificationsListStore.setMaxPage(notificationsData.maxPage);
    }
  }, [notificationsData]);

  useLayoutEffect(() => {
    if (props.state.page !== 0) {
      refetch();
    }
  }, [props.state.page]);

  useLayoutEffect(() => {
    if (props.newNotifications !== 0 && refetchNewNotifications.current === true) {
      refetchNewNotifications.current = false;
      notificationsListStore.removeNotifications();
      refetch();
    } else if (props.newNotifications === 0) {
      refetchNewNotifications.current = true;
    }
  }, [props.newNotifications]);

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
