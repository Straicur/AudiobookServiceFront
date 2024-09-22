import React, { useLayoutEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useTechnicalBreakStore, useTokenStore } from 'Store/store';
import { useNavigate } from 'react-router-dom';
import { NotificationsProvider } from 'Providers/Common/NotificationsProvider';
import { useNewNotifications } from 'Providers/Common/NewNotificationsProvider';
import AdminNotificationOffCanvas from '../AdminNotificationBar/AdminNotificationOffCanvas';
import Badge from 'react-bootstrap/Badge';
import './AdminNavBar.css';
import { useUserAuthorizeData } from 'Providers/User/UserAuthorizeProvider';

export const AdminNavBar = (props) => {
  const [state, setState] = useState({
    page: 0,
    notificationsOffCanvas: false,
  });

  const token = useTokenStore((state) => state.token);

  const isAdminTechnicalBreak = useTechnicalBreakStore((state) => state.admin);

  const [newNotificationsData] = useNewNotifications();

  const navigate = useNavigate();

  const logout = useUserAuthorizeData()[0];

  const openNotificationsList = () => {
    setState((prev) => ({
      ...prev,
      notificationsOffCanvas: !state.notificationsOffCanvas,
    }));
  };

  const getNewNotifications = () => {
    if (newNotificationsData != null) {
      return newNotificationsData.newNotifications;
    } else return 0;
  };

  useLayoutEffect(() => {
    if (token === '') {
      navigate('/login');
    }
  }, [token]);

  return (
    <div className='row navbar'>
      <div className='col-9'>
        <Button
          variant='dark'
          size='sm'
          color='dark'
          className=' btn button fs-6 p-2 mt-2 mx-2 rounded-3'
          onClick={() => navigate('/admin')}
        >
          {props.t('mainPage')}
        </Button>
        <Button
          variant='dark'
          size='sm'
          color='dark'
          className=' btn button fs-6 p-2 mt-2 mx-2 rounded-3'
          onClick={() => navigate('/admin/categories')}
        >
          {props.t('categories')}
        </Button>
        <Button
          variant='dark'
          size='sm'
          color='dark'
          className=' btn button fs-6 p-2 mt-2 mx-2 rounded-3'
          onClick={() => navigate('/admin/audiobooks')}
        >
          {props.t('audiobooks')}
        </Button>
        <Button
          variant='dark'
          size='sm'
          color='dark'
          className=' btn button fs-6 p-2 mt-2 mx-2 rounded-3'
          onClick={() => navigate('/admin/users')}
        >
          {props.t('users')}
        </Button>
        <Button
          variant='dark'
          size='sm'
          color='dark'
          className=' btn button fs-6 p-2 mt-2 mx-2 rounded-3'
          onClick={() => navigate('/admin/notifications')}
        >
          {props.t('notifications')}
        </Button>
        <Button
          variant='dark'
          size='sm'
          color='dark'
          className=' btn button fs-6 p-2 mt-2 mx-2 rounded-3'
          onClick={() => navigate('/admin/technical_breaks')}
        >
          {props.t('technicalBreaks')}
        </Button>
        <Button
          variant='dark'
          size='sm'
          color='dark'
          className=' btn button fs-6 p-2 mt-2 mx-2 rounded-3'
          onClick={() => navigate('/admin/reports')}
        >
          {props.t('reports')}
        </Button>
        <Button
          variant='dark'
          size='sm'
          color='dark'
          className=' btn button fs-6 p-2 mt-2 mx-2 rounded-3'
          onClick={() => navigate('/admin/cache')}
        >
          {props.t('cache')}
        </Button>
        <Button
          variant='dark'
          size='sm'
          color='dark'
          className=' btn button fs-6 p-2 mt-2 mx-2 rounded-3'
          onClick={() => navigate('/main')}
        >
          {props.t('userPanel')}
        </Button>
      </div>
      <div className='col-3 d-flex justify-content-end  align-items-center'>
        <ButtonGroup className='ps-3 me-3'>
          <Button
            name='pl'
            size='sm'
            className={
              props.i18n.language === 'pl'
                ? 'btn  m-1 admin_button_dark'
                : 'btn  m-1 admin_button_light'
            }
            onClick={() => props.i18n.changeLanguage('pl')}
          >
            PL
          </Button>
          <Button
            name='en'
            size='sm'
            className={
              props.i18n.language === 'en'
                ? 'btn  m-1 admin_button_dark'
                : 'btn  m-1 admin_button_light'
            }
            onClick={() => props.i18n.changeLanguage('en')}
          >
            EN
          </Button>
        </ButtonGroup>
        <div
          className='row mx-1 pt-3 ms-1 me-3 align-items-center justify-content-center admin-notification-row'
          onClick={() => openNotificationsList()}
        >
          <div className='col nav-col justify-content-end  align-items-center pe-2'>
            <h6> {props.t('notifications')}</h6>
          </div>
          <div className='col nav-col justify-content-end  align-items-center ms-1'>
            <h6>
              <Badge bg='secondary'>{getNewNotifications()}</Badge>
            </h6>
          </div>
        </div>
        <Button
          name='logout'
          variant='dark'
          size='sm'
          className='btn button'
          onClick={() => logout()}
        >
          {props.t('logout')}
        </Button>
        {state.notificationsOffCanvas ? (
          <NotificationsProvider
            token={token}
            page={state.page}
            i18n={props.i18n}
            newNotifications={newNotificationsData.newNotifications}
          >
            <AdminNotificationOffCanvas
              state={state}
              setState={setState}
              t={props.t}
              token={token}
              i18n={props.i18n}
              newNotifications={newNotificationsData.newNotifications}
            />
          </NotificationsProvider>
        ) : null}
      </div>
      {isAdminTechnicalBreak ? (
        <div className='row mx-1 mt-2'>
          <div className='col technical-break-banner me-3 text-center'>
            {props.t('technicalBreak')}
          </div>{' '}
        </div>
      ) : null}
    </div>
  );
};
