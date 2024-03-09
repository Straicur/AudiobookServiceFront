import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useTranslation } from 'react-i18next';
import { HandleFetch } from 'Util/HandleFetch';
import { useTokenStore } from 'Store/store';
import { useNavigate } from 'react-router-dom';
import { NotificationsProvider } from 'Providers/Common/NotificationsProvider';
import { useNewNotifications } from 'Providers/Common/NewNotificationsProvider';
import AdminNotificationOffCanvas from '../AdminNotificationBar/AdminNotificationOffCanvas';
import Badge from 'react-bootstrap/Badge';
import './AdminNavBar.css';

export const AdminNavBar = () => {
  const [state, setState] = useState({
    page: 0,
    notificationsOffCanvas: false,
    error: null,
  });

  const { t, i18n } = useTranslation();

  const tokenStore = useTokenStore();

  const token = useTokenStore((state) => state.token);

  const [newNotificationsData] = useNewNotifications();

  const navigate = useNavigate();

  const logout = async () => {
    const url = '/logout';
    const jsonData = {};
    const method = 'POST';

    HandleFetch(url, method, jsonData, token, i18n.language).finally(() => {
      tokenStore.removeToken();
      navigate('/login');
    });
  };

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

  useEffect(() => {
    if (token === '') {
      navigate('/login');
    }
  }, [token]);

  return (
    <div className='row navbar'>
      <div className='col-8'>
        <Button
          variant='dark'
          size='lg'
          color='dark'
          className=' btn button mt-2 mx-2'
          onClick={() => navigate('/admin')}
        >
          {t('mainPage')}
        </Button>
        <Button
          variant='dark'
          size='lg'
          color='dark'
          className=' btn button mt-2 mx-2'
          onClick={() => navigate('/admin/categories')}
        >
          {t('categories')}
        </Button>
        <Button
          variant='dark'
          size='lg'
          color='dark'
          className=' btn button mt-2 mx-2'
          onClick={() => navigate('/admin/audiobooks')}
        >
          {t('audiobooks')}
        </Button>
        <Button
          variant='dark'
          size='lg'
          color='dark'
          className=' btn button mt-2 mx-2'
          onClick={() => navigate('/admin/users')}
        >
          {t('users')}
        </Button>
        <Button
          variant='dark'
          size='lg'
          color='dark'
          className=' btn button mt-2 mx-2'
          onClick={() => navigate('/admin/notifications')}
        >
          {t('notifications')}
        </Button>
        <Button
          variant='dark'
          size='lg'
          color='dark'
          className=' btn button mt-2 mx-2'
          onClick={() => navigate('/main')}
        >
          {t('userPanel')}
        </Button>
      </div>
      <div className='col-4 d-flex justify-content-end  align-items-center'>
        <ButtonGroup className='ps-3 me-3'>
          <Button
            name='pl'
            size='sm'
            className={
              i18n.language == 'pl' ? 'btn  m-1 admin_button_dark' : 'btn  m-1 admin_button_light'
            }
            onClick={() => i18n.changeLanguage('pl')}
          >
            PL
          </Button>
          <Button
            name='en'
            size='sm'
            className={
              i18n.language == 'en' ? 'btn  m-1 admin_button_dark' : 'btn  m-1 admin_button_light'
            }
            onClick={() => i18n.changeLanguage('en')}
          >
            EN
          </Button>
        </ButtonGroup>
        <div
          className='row mx-1 pt-3 ms-1 me-3 align-items-center justify-content-center admin-notification-row'
          onClick={() => openNotificationsList()}
        >
          <div className='col nav-col justify-content-end  align-items-center pe-2'>
            <h6> {t('notifications')}</h6>
          </div>
          <div className='col nav-col justify-content-end  align-items-center'>
            <h6>
              <Badge bg='secondary'>{getNewNotifications()}</Badge>
            </h6>
          </div>
        </div>
        <Button name='logout' variant='dark' size='sm' className='btn button' onClick={logout}>
          {t('logout')}
        </Button>
        {state.notificationsOffCanvas ? (
          <NotificationsProvider token={token} page={state.page} i18n={i18n}>
            <AdminNotificationOffCanvas
              state={state}
              setState={setState}
              t={t}
              token={token}
              i18n={i18n}
            />
          </NotificationsProvider>
        ) : null}
      </div>
    </div>
  );
};
