import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { v4 as uuidv4 } from 'uuid';
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';
import { HandleFetch } from 'Util/HandleFetch';
import './AdminNotificationOffcanvas.css';
import CreateUtil from 'Util/CreateUtil';
import { useNotifications } from 'Providers/Common/NotificationsProvider';
import { useNotificationsListStore } from 'Store/store';

export default function AdminNotificationOffcanvas(props) {
  const [show, setShow] = useState(true);
  const [trigerTable, setTrigerTable] = useState([]);

  const notificationsList = useRef([]);

  const [notificationsData, refetch] = useNotifications();

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

  const navigateUser = (notification) => {
    switch (notification.notificationType) {
      case 1: {
        break;
      }
      case 2: {
        break;
      }
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
    }
  };

  const activateNotification = (notification) => {
    if (notification.active == undefined) {
      let hasRole = trigerTable.filter((x) => x == notification.id);

      if (hasRole.length == 0) {
        let newArray = trigerTable.concat(notification.id);
        setTrigerTable(newArray);

        HandleFetch(
          '/notification/activate',
          'PUT',
          {
            notificationId: notification.id,
          },
          props.token,
          props.i18n.language,
        )
          .then(() => {})
          .catch(() => {});
        props.setState((prev) => ({
          ...prev,
          // refresh: true,
        }));
      }
    }
  };

  const loadMore = () => {
    if (props.state.page + 1 <= props.state.maxPage) {
      props.setState((prev) => ({
        ...prev,
        page: props.state.page + 1,
        // refresh: true,
      }));
    }
  };

  const renderNotifications = () => {
    console.log(notificationsData);
    console.log(notifications);
    if (dateUpdate > Date.now()) {
      notificationsList.current = notifications;
      props.setState((prev) => ({
        ...prev,
        maxPage: maxPage,
      }));
    } else {
      //PObierz dane i zapisz do store
      //Czyszcze cały store powiadomień
      //Tu podaje page i robię update w storze danej strony
      let copy = notifications;
      copy.push({ page: props.state.page, notifications: notificationsData.notifications });

      notificationsListStore.addNotifications(copy);

      props.setState((prev) => ({
        ...prev,
        maxPage: notificationsData.maxPage,
      }));
    }

    // Przerób zapisywanie danych w store. Niech zapisuje też strony bo to dużo pomaga
    // Natomiast Jeśli ta data jest mniejsza to mam pobrać dane i zapisać je do store ale nie renderować z nich
    // Niech to ma jeden standard

    //         console.log(data);
    //         data.systemNotifications.forEach((element) => {
    //           let found = notificationsList.current.filter((x) => x.id == element.id).length > 0;
    //           if (!found) {
    //             notificationsList.current = [...notificationsList.current, element];
    //           }
    //         });

    //         if (index == 0) {
    //           notificationsListStore.addNotifications(data.systemNotifications);
    //         }

    //         notificationsListStore.setNewNotification(data.maxPage);
    //         notificationsListStore.setNewNotification(data.newNotifications);

    let returnArray = [];
    // notificationsList <- to mogę wykorzystać jako jakąś flagę czy coś
    if (notifications != undefined) {
      returnArray.push(
        notificationsList.current.map((notification) => {
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
                {notification.notificationType == 1 || notification.notificationType == 2 ? null : (
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
    return returnArray;
  };

  useEffect(() => {
    if (props.dateUpdate < Date.now()) {
      props.setState((prev) => ({
        ...prev,
        refresh: true,
      }));
    }
  }, []);
  useEffect(() => {
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
        {props.state.page + 1 < props.state.maxPage ? (
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
