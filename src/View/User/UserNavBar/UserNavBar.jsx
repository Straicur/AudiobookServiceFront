import React, { useLayoutEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useTechnicalBreakStore, useTokenStore } from 'Store/store';
import { useNavigate } from 'react-router-dom';
import { NotificationsProvider } from 'Providers/Common/NotificationsProvider';
import { useNewNotifications } from 'Providers/Common/NewNotificationsProvider';
import UserNotificationOffCanvas from '../UserNotification/UserNotificationOffCanvas';
import Badge from 'react-bootstrap/Badge';
import './UserNavBar.css';
import { useUserAuthorizeData } from 'Providers/User/UserAuthorizeProvider';

export const UserNavBar = (props) => {
  const [state, setState] = useState({
    page: 0,
    notificationsOffCanvas: false,
  });

  const isAdminTechnicalBreak = useTechnicalBreakStore((state) => state.admin);

  const [newNotificationsData] = useNewNotifications();

  const logout = useUserAuthorizeData()[0];

  const token = useTokenStore((state) => state.token);

  const admin = useTokenStore((state) => state.admin);

  const navigate = useNavigate();

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
    <>
      <div className='row navbar navbar-dark bg-dark'>
        <div className='col'>
          <Button
            variant='dark'
            size='lg'
            color='dark'
            className=' btn button  mt-2'
            onClick={() => navigate('/main')}
          >
            {props.t('mainPage')}
          </Button>
          <Button
            variant='dark'
            size='lg'
            color='dark'
            className=' btn button  mt-2'
            onClick={() => navigate('/myList')}
          >
            {props.t('myList')}
          </Button>
          {admin ? (
            <Button
              variant='success'
              size='lg'
              color='dark'
              className=' btn button  mt-2'
              onClick={() => navigate('/admin')}
            >
              {props.t('administration')}
            </Button>
          ) : null}
        </div>
        <div className='col d-flex justify-content-end  align-items-center'>
          <ButtonGroup className='ps-3 me-3'>
            <Button
              name='pl'
              size='sm'
              className={
                props.i18n.language === 'pl' ? 'btn  m-1 button_light' : 'btn  m-1 button_dark'
              }
              onClick={() => props.i18n.changeLanguage('pl')}
            >
              PL
            </Button>
            <Button
              name='en'
              size='sm'
              className={
                props.i18n.language === 'en' ? 'btn  m-1 button_light' : 'btn  m-1 button_dark'
              }
              onClick={() => props.i18n.changeLanguage('en')}
            >
              EN
            </Button>
          </ButtonGroup>
          <div
            className='row mx-1 pt-3 ms-1 me-3 text-white align-items-center justify-content-center notification-row'
            name='notificationsOffCanvas'
            onClick={() => openNotificationsList()}
          >
            <div className='col nav-col justify-content-end  align-items-center pe-2'>
              <h6> {props.t('notifications')}</h6>
            </div>
            <div className='col nav-col justify-content-end  align-items-center'>
              <h6>
                <Badge bg='secondary'>{getNewNotifications()}</Badge>
              </h6>
            </div>
          </div>
          <div>
            <div className='row '>
              <div className='col-2 d-flex align-items-center'>
                <i className='bi bi-person-square' />
              </div>
              <div className='col-10 d-flex align-items-center'>
                <select
                  className='form-select bg-dark text-light'
                  aria-label='Default select example'
                  onChange={(event) => {
                    const selectedValue = event.target.value;
                    switch (selectedValue) {
                      case '1':
                        navigate('/user/settings');
                        break;
                      case '2':
                        navigate('/help');
                        break;
                      case '3':
                        navigate('/report');
                        break;
                      case '4':
                        logout();
                        break;
                    }
                  }}
                >
                  <option value={'DEFAULT'} hidden={true}>
                    {props.t('settings')}
                  </option>
                  <option value='1'>{props.t('accountSettings')}</option>
                  <option value='2'>{props.t('help')}</option>
                  <option value='3'>{props.t('report')}</option>
                  <option value='4'>{props.t('logout')}</option>
                </select>
              </div>
              {state.notificationsOffCanvas ? (
                <NotificationsProvider token={token} page={state.page} i18n={props.i18n}>
                  <UserNotificationOffCanvas
                    state={state}
                    setState={setState}
                    t={props.t}
                    token={token}
                    i18n={props.i18n}
                  />
                </NotificationsProvider>
              ) : null}
            </div>
          </div>
        </div>
        {isAdminTechnicalBreak ? (
          <div className='row mx-1 mt-2'>
            <div className='col technical-break-banner me-3 ms-2 text-center'>
              {props.t('technicalBreak')}
            </div>{' '}
          </div>
        ) : null}
      </div>
    </>
  );
};
