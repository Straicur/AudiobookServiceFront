import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './UserNavBar.css';

export const UserNotLoggedNavBar = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <div className='row navbar navbar-dark bg-dark'>
        <div className='col'>
          <Button
            variant='dark'
            size='lg'
            color='dark'
            className=' btn button  mt-1'
            onClick={() => navigate('/help')}
          >
            {props.t('help')}
          </Button>
          <Button
            variant='dark'
            size='lg'
            color='dark'
            className=' btn button  mt-1'
            onClick={() => navigate('/report')}
          >
            {props.t('report')}
          </Button>
          <Button
            variant='dark'
            size='lg'
            color='dark'
            className=' btn button  mt-1'
            onClick={() => navigate('/about')}
          >
            {props.t('about')}
          </Button>
          <Button
            variant='dark'
            size='lg'
            color='dark'
            className=' btn button  mt-1'
            onClick={() => navigate('/policy')}
          >
            {props.t('privacyPolicy')}
          </Button>
        </div>
        {!props.token ? (
          <div className='col d-flex justify-content-end  align-items-center'>
            <Button
              variant='success'
              size='lg'
              color='dark'
              className=' btn button  mt-1'
              onClick={() => navigate('/login')}
            >
              {props.t('login')}
            </Button>
          </div>
        ) : null}
      </div>
    </>
  );
};
