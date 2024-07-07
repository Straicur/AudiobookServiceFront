import React, { useLayoutEffect, useEffect } from 'react';
import md5 from 'md5';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ValidateUtil from 'Util/ValidateUtil';
import FormService from 'Service/Common/FormService';
import { useUserAuthorizeData } from 'Providers/User/UserAuthorizeProvider';

export default function UserForgotView(props) {
  const userService = new FormService(props.setState);

  const resetPasswordConfirm = useUserAuthorizeData()[3];

  function getPasswordStrenghtText(t, passStr) {
    switch (passStr) {
      case 10:
        return <p className='text-center text-danger'>{t('weakPassword')}</p>;
      case 25:
        return <p className='text-center text-warning'>{t('moderatePassword')}</p>;
      case 50:
        return <p className='text-center text-success'>{t('strongPassword')}</p>;
      case 100:
        return <p className='text-center text-info'>{t('extraStrongPassword')}</p>;
    }
  }

  function getPasswordStrenghtProgressColor(passStr) {
    switch (passStr) {
      case 10:
        return 'danger';
      case 25:
        return 'warning';
      case 50:
        return 'success';
      case 100:
        return 'info';
    }
  }

  const handleNewPassword = async () => {
    if (
      ValidateUtil.validatePassword(props.state.password) &&
      ValidateUtil.validatePassword(props.state.confirmPassword) &&
      props.state.password === props.state.confirmPassword
    ) {
      const jsonData = {
        userId: props.id,
        password: md5(props.state.password),
      };

      resetPasswordConfirm({
        jsonData: jsonData,
      });
    } else {
      props.setState((prev) => ({
        ...prev,
        wrongPassword: true,
      }));
    }
  };

  const handlePasswordChange = (event) => {
    props.setState((prev) => ({
      ...prev,
      password: event.target.value,
      passwordStrength: ValidateUtil.validatePasswordStrength(event.target.value),
    }));
  };

  useEffect(() => {
    if (
      props.state.password.trim() != '' &&
      props.state.confirmPassword.trim() != '' &&
      props.state.password === props.state.confirmPassword
    ) {
      props.setState((prev) => ({
        ...prev,
        isButtonDisabled: false,
        wrongPassword: false,
      }));
    } else {
      props.setState((prev) => ({
        ...prev,
        isButtonDisabled: true,
      }));
    }
  }, [props.state.password, props.state.confirmPassword]);

  useLayoutEffect(() => {
    if (props.state.changeLang != null) {
      props.i18n.changeLanguage(props.state.changeLang);
    }
  }, [props.state.changeLang]);

  return (
    <div className='container d-flex align-items-center justify-content-center mt-3 '>
      <div className='card position-relative shadow p-3 mb-5'>
        <div>
          <h1 className='py-1'>{props.t('insertNewPassword')}</h1>
          <input
            type='password'
            name='password'
            placeholder={props.t('insertPassword')}
            value={props.state.password}
            className='form-control mt-4'
            onChange={handlePasswordChange}
          />
          <input
            type='password'
            name='confirmPassword'
            placeholder={props.t('insertPasswordConfirm')}
            value={props.state.confirmPassword}
            className='form-control mt-4'
            onChange={(e) => {
              userService.handleChange(e);
            }}
          />
          <hr className='mt-4'></hr>
          {props.state.password.length >= 1 ? (
            <div>
              <ProgressBar
                className='mt-3'
                variant={getPasswordStrenghtProgressColor(props.state.passwordStrength)}
                now={props.state.passwordStrength}
              />
              {getPasswordStrenghtText(props.t, props.state.passwordStrength)}
            </div>
          ) : null}
          <Alert
            show={props.state.wrongPassword}
            className='dangerAllert mt-1 text-center'
            variant='danger'
          >
            {props.t('enterStrongerPassword')}
          </Alert>
          <Alert
            show={props.state.isButtonDisabled}
            className='dangerAllert mt-1 text-center'
            variant='danger'
          >
            {props.t('enterValidConfirmPassword')}
          </Alert>
          <Button
            variant='dark'
            onClick={handleNewPassword}
            disabled={props.state.isButtonDisabled || props.state.wrongPassword}
            className='mt-2 mb-3 form-control'
          >
            {props.t('changePassword')}
          </Button>
        </div>
      </div>
    </div>
  );
}
