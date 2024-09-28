import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserRegisterNotificationModal } from './UserRegisterNotificationModal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import ProgressBar from 'react-bootstrap/ProgressBar';
import UserRegisterService from 'Service/User/UserRegisterService';
import ValidateUtil from 'Util/ValidateUtil';
import { UserFooter } from 'View/User/Common/UserFooter';
import { useUserRegisterData } from 'Providers/User/UserRegisterProvider';

export default function UserRegisterForm(props) {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    modal: false,
  });
  const [register] = useUserRegisterData();
  const userService = new UserRegisterService(formState, setFormState, props, register);

  function getPasswordStrenghtText(passStr) {
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

  return (
    <section className='vh-100'>
      <div className='container h-100'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
            <div className='card rounded-auth'>
              <div className='card-body p-1 text-center'>
                <div className='mt-md-1 p-1 mx-5'>
                  <div>
                    <Button
                      name='pl'
                      size='sm'
                      className={
                        i18n.language === 'pl'
                          ? 'btn  m-1 admin_button_dark'
                          : 'btn  m-1 admin_button_light'
                      }
                      onClick={() => i18n.changeLanguage('pl')}
                    >
                      PL
                    </Button>
                    <Button
                      name='en'
                      size='sm'
                      className={
                        i18n.language === 'en'
                          ? 'btn  m-1 admin_button_dark'
                          : 'btn  m-1 admin_button_light'
                      }
                      onClick={() => i18n.changeLanguage('en')}
                    >
                      EN
                    </Button>
                  </div>
                  <hr className='line' />
                  <p className='mb-4 fs-5'>{t('pleaseEmailAndPassword')}</p>
                  <Form
                    noValidate
                    validated={props.state.validated}
                    onSubmit={userService.handleRegister}
                    autoComplete='off'
                  >
                    <Row className='mb-3'>
                      <Form.Group
                        controlId='validationCustom01'
                        className='form-outline form-white mb-4'
                      >
                        <Form.Control
                          required
                          type='email'
                          name='email'
                          placeholder={t('insertEmail')}
                          value={props.state.email}
                          className='form-control form-control-lg'
                          isValid={
                            props.state.email.length > 1 &&
                            ValidateUtil.validateEmail(props.state.email)
                          }
                          isInvalid={
                            props.state.email.length > 1 &&
                            !ValidateUtil.validateEmail(props.state.email)
                          }
                          onChange={(event) => userService.handleChange(event)}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {t('enterValidEmail')}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className='mb-1'>
                      <Form.Group
                        controlId='validationCustom02'
                        className='form-outline form-white mb-4'
                      >
                        <Form.Control
                          required
                          type='password'
                          name='password'
                          placeholder={t('insertPassword')}
                          value={props.state.password}
                          className='form-control form-control-lg '
                          isValid={
                            props.state.password.length > 1 &&
                            ValidateUtil.validatePassword(props.state.password) &&
                            props.state.password.trim() === props.state.confirmPassword.trim()
                          }
                          isInvalid={
                            props.state.password.length >= 1 &&
                            !ValidateUtil.validatePassword(props.state.password) &&
                            props.state.password.trim() !== props.state.confirmPassword.trim()
                          }
                          onChange={(event) => userService.handlePasswordChange(event)}
                        />
                        <Form.Control.Feedback type='invalid'>
                          <div>{t('enterValidPassword')}</div>
                          <div>{t('validPasswordSchema')}</div>
                        </Form.Control.Feedback>
                        {props.state.password.length >= 1 ? (
                          <div>
                            <ProgressBar
                              className='mt-3'
                              variant={userService.getPasswordStrenghtProgressColor(
                                props.state.passwordStrength,
                              )}
                              now={props.state.passwordStrength}
                            />
                            {getPasswordStrenghtText(t, props.state.passwordStrength)}
                          </div>
                        ) : null}
                      </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                      <Form.Group
                        controlId='validationCustom03'
                        className='form-outline form-white mb-4'
                      >
                        <Form.Control
                          required
                          type='password'
                          name='confirmPassword'
                          placeholder={t('insertPasswordConfirm')}
                          value={props.state.confirmPassword}
                          className='form-control form-control-lg '
                          isValid={
                            props.state.confirmPassword.length > 1 &&
                            ValidateUtil.validatePassword(props.state.confirmPassword) &&
                            props.state.password.trim() === props.state.confirmPassword.trim()
                          }
                          isInvalid={
                            props.state.confirmPassword.length > 1 &&
                            (!ValidateUtil.validatePassword(props.state.confirmPassword) ||
                            props.state.password.trim() !== props.state.confirmPassword.trim())
                          }
                          onChange={(event) => userService.handleChange(event)}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {t('enterValidConfirmPassword')}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                      <Form.Group
                        controlId='validationCustom04'
                        className='form-outline form-white mb-4'
                      >
                        <Form.Control
                          required
                          type='phoneNumber'
                          name='phoneNumber'
                          placeholder={t('insertPhone')}
                          value={props.state.phoneNumber}
                          className='form-control form-control-lg '
                          isValid={
                            props.state.phoneNumber.length > 1 &&
                            ValidateUtil.validatePhoneNumber(props.state.phoneNumber)
                          }
                          isInvalid={
                            props.state.phoneNumber.length > 1 &&
                            !ValidateUtil.validatePhoneNumber(props.state.phoneNumber)
                          }
                          onChange={(event) => userService.handleChange(event)}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {t('enterValidPhoneNumber')}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                      <Form.Group
                        controlId='validationCustom05'
                        className='form-outline form-white mb-4'
                      >
                        <Form.Control
                          required
                          type='firstname'
                          name='firstname'
                          placeholder={t('insertFirstname')}
                          value={props.state.firstname}
                          className='form-control form-control-lg '
                          isValid={props.state.firstname.length >= 3}
                          isInvalid={
                            props.state.firstname.length >= 1 && props.state.firstname.length < 3
                          }
                          onChange={(event) => userService.handleChange(event)}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {t('enterValidFirstName')}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className='mb-1'>
                      <Form.Group
                        controlId='validationCustom06'
                        className='form-outline form-white mb-4'
                      >
                        <Form.Control
                          type='lastname'
                          name='lastname'
                          placeholder={t('insertLastname')}
                          value={props.state.lastname}
                          className='form-control form-control-lg '
                          isValid={props.state.lastname.length >= 3}
                          isInvalid={
                            props.state.lastname.length >= 1 && props.state.lastname.length < 3
                          }
                          onChange={(event) => userService.handleChange(event)}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {t('enterValidLastName')}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                      <Form.Group
                        controlId='validationCustom07'
                        className='form-outline form-white mb-3'
                      >
                        <Form.Check
                          type='switch'
                          className='text-start'
                          checked={props.state.parentalControl}
                          label={t('addParentalControlYear')}
                          onChange={() => userService.handleParentalControl()}
                        />
                        {props.state.parentalControl ? (
                          <div>
                            <p className='fs-5 mt-1'>{t('enterBirthday')}</p>
                            <Form.Control
                              type='date'
                              name='birthdayDate'
                              value={props.state.birthdayDate}
                              onChange={(event) => userService.handleChange(event)}
                            />
                            <Form.Control.Feedback type='invalid'>
                              {t('enterValidBirthday')}
                            </Form.Control.Feedback>
                          </div>
                        ) : null}
                      </Form.Group>
                    </Row>
                    <hr></hr>
                    <Button
                      variant='dark'
                      size='lg'
                      className='btn auth-btn px-5 form-control'
                      type='submit'
                      disabled={props.state.isButtonDisabled}
                    >
                      {t('register')}
                    </Button>

                    <p className='mt-4 small pb-lg-2 fw-bold mb-0'>
                      {t('haveAccount')}{' '}
                      <a onClick={() => navigate('/login')} className='link-info'>
                        {t('loginToAccount')}
                      </a>
                    </p>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserFooter />
      {formState.modal ? <UserRegisterNotificationModal /> : null}
    </section>
  );
}
