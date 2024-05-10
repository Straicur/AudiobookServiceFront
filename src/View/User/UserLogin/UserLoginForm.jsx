import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { UserLoginForgotPasswordModal } from './UserLoginForgotPasswordModal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import UserLoginService from 'Service/User/UserLoginService';
import ValidateUtil from 'Util/ValidateUtil';
import { UserFooter } from 'View/User/Common/UserFooter';
import { useUserAuthorizeData } from 'Providers/User/UserAuthorizeProvider';

export default function UserLoginForm(props) {
  const [formState, setFormState] = useState({
    modal: false,
  });

  const navigate = useNavigate();

  const login = useUserAuthorizeData()[1];
  const resetPassword = useUserAuthorizeData()[2];
  const userService = new UserLoginService(formState, setFormState, props, login);

  useEffect(() => {
    if (props.state.error != null) {
      throw props.state.error;
    }
  }, [props.state.error]);

  return (
    <section className='vh-100'>
      <div className='container h-100'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
            <div className='card shadow rounded-auth'>
              <div className='card-body p-5 text-center'>
                <div className='mb-md-1 mt-md-2 pb-1'>
                  <p className='mb-2 fs-2'>{props.t('welcome')}</p>
                  <div className='row mb-2 justify-content-center'>
                    <div className='col-3 align-self-center'>
                      <Button
                        name='pl'
                        size='sm'
                        className={
                          props.i18n.language == 'pl'
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
                          props.i18n.language == 'en'
                            ? 'btn  m-1 admin_button_dark'
                            : 'btn  m-1 admin_button_light'
                        }
                        onClick={() => props.i18n.changeLanguage('en')}
                      >
                        EN
                      </Button>
                    </div>
                  </div>
                  <p className='fs-4'>{props.t('audiobookService')}</p>
                  <Form
                    noValidate
                    validated={props.state.validated}
                    onSubmit={userService.fetchToken}
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
                          placeholder={props.t('insertEmail')}
                          value={props.state.email}
                          className='form-control form-control-lg'
                          isValid={
                            props.state.email.length > 0 &&
                            ValidateUtil.validateEmail(props.state.email)
                          }
                          isInvalid={
                            props.state.email.length > 0 &&
                            !ValidateUtil.validateEmail(props.state.email)
                          }
                          onChange={(event) => userService.handleChange(event)}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {props.t('enterValidEmail')}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                      <Form.Group
                        controlId='validationCustom02'
                        className='form-outline form-white mb-4'
                      >
                        <Form.Control
                          required
                          type='password'
                          name='password'
                          placeholder={props.t('insertPassword')}
                          value={props.state.password}
                          isValid={props.state.password.length > 1}
                          isInvalid={
                            props.state.password.length < 3 && props.state.password.length > 0
                          }
                          className='form-control form-control-lg'
                          onChange={(event) => userService.handleChange(event)}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {props.t('enterValidPassword')}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    <Button
                      variant='dark'
                      size='lg'
                      type='submit'
                      className=' mt-2 form-control'
                      disabled={props.state.isButtonDisabled}
                    >
                      {props.t('login')}
                    </Button>

                    <hr className='line mt-4 mb-3' />
                    <p className='small fw-bold mb-3 pb-lg-2 '>
                      <a
                        className='link-info'
                        onClick={() =>
                          setFormState((prev) => ({
                            ...prev,
                            modal: !formState.modal,
                          }))
                        }
                      >
                        {props.t('forgotPassword')}
                      </a>
                    </p>
                    <p className='small pb-lg-2 fw-bold mb-0'>
                      {props.t('dontHaveAccount')}{' '}
                      <a className='link-info' onClick={() => navigate('/register')}>
                        {props.t('registerAccount')}
                      </a>
                    </p>
                  </Form>
                </div>

                {formState.modal ? (
                  <UserLoginForgotPasswordModal
                    formState={formState}
                    setFormState={setFormState}
                    resetPassword={resetPassword}
                    state={props.state}
                    setState={props.setState}
                    i18n={props.i18n}
                    t={props.t}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserFooter />
    </section>
  );
}
