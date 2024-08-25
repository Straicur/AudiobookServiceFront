import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { UserFooter } from 'View/User/Common/UserFooter';
import ValidateUtil from 'Util/ValidateUtil';
import { useUserAuthorizeData } from 'Providers/User/UserAuthorizeProvider';
import md5 from 'md5';
import { networkErrorAtom } from 'App';
import { useAtom } from 'jotai';
import { useUserIp } from 'Providers/User/UserIpProvider';
import { useUserReport } from 'Providers/User/UserReportProvider';
import { UserNotLoggedNavBar } from '../UserNavBar/UserNotLoggedNavBar';
import UserNavBarPrividers from '../UserNavBar/UserNavBarPrividers';

export default function UserAboutContainer(props) {
  const setErrorAtomState = useAtom(networkErrorAtom)[1];
  const login = useUserAuthorizeData()[1];
  const userIp = useUserIp();
  const sendNotLoggedUserReport = useUserReport()[1];

  const myEmail = 'mosinskidamian';
  let emailValidity =
    ValidateUtil.validateEmail(props.state.email) && !props.state.email.includes(myEmail);

  return (
    <HelmetProvider>
      <Helmet>
        <style>{'body { background-color: black; }'}</style>
      </Helmet>
      <div className='container-fluid main-container'>
        <div className='position-relative '>
          {props.token ? (
            <UserNavBarPrividers token={props.token} t={props.t} i18n={props.i18n} />
          ) : (
            <UserNotLoggedNavBar token={props.token} t={props.t} i18n={props.i18n} />
          )}
          <div className='container-fluid main-container about_page_container'>
            <div className='card position-relative p-3 bg-dark shadow about_page text-center text-white'>
              <div className='row justify-content-end  align-items-center'>
                <div className='col-2'>
                  <ButtonGroup className='ps-5 ms-5'>
                    <Button
                      name='pl'
                      size='sm'
                      className={
                        props.i18n.language === 'pl'
                          ? 'btn  m-1 button_light'
                          : 'btn  m-1 button_dark'
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
                          ? 'btn  m-1 button_light'
                          : 'btn  m-1 button_dark'
                      }
                      onClick={() => props.i18n.changeLanguage('en')}
                    >
                      EN
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
              <div className='fs-2 fw-bold mx-3'>
                <p>{props.t('aboutDesc1')}</p>
              </div>
              <div className='fs-4 text-break mx-3'>
                <p>{props.t('aboutDesc2')}</p>
              </div>
              <div className='fs-4 text-break mb-2 mx-3'>
                <p>{props.t('aboutDesc3')}</p>
              </div>
              <div className='row mt-4 mb-1 mx-2'>
                <div className='fs-5 col-5 text-end mx-4'>{props.t('toEnterAsAnAdmin')}</div>
                <div className='col-5'>
                  <div className='fs-5 row d-flex align-items-start'>
                    <div className='col-9'>
                      <input
                        id='email'
                        type='text'
                        name='email'
                        disabled={props.state.send}
                        className='form-control'
                        placeholder={props.t('insertEmail')}
                        value={props.state.email}
                        onChange={(e) => {
                          props.setState((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }));
                        }}
                      />
                      <div className='text-center text-danger text-about-danger'>
                        {props.state.email !== '' && !emailValidity && props.state.email.length > 4
                          ? props.t('enterValidEmail')
                          : null}
                      </div>
                    </div>
                    <div className='col-2'>
                      <Button
                        name='pl'
                        size='sm'
                        className='btn admin_button_dark p-2'
                        disabled={!emailValidity}
                        onClick={() => {
                          sendNotLoggedUserReport({
                            json: {
                              type: 7,
                              ip: userIp[0] !== undefined && userIp[0] !== null ? userIp[0].ip : '',
                              email: props.state.email,
                            },
                          });
                          props.setState((prev) => ({
                            ...prev,
                            send: true,
                          }));
                          setTimeout(function () {
                            login({
                              email: process.env.REACT_APP_RECRUTATION_EMAIL,
                              password: md5(process.env.REACT_APP_RECRUTATION_PASSWORD),
                              errorMethodAfter: setErrorAtomState(null),
                            });
                          }, 1000);
                        }}
                      >
                        {props.t('login')}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='fs-4 text-break mx-3'>
                <p>{props.t('aboutDesc4')}</p>
              </div>
              <div className='fs-5 row mx-2 d-flex justify-content-center'>
                <img
                  className='small_img_stack'
                  src='https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white'
                />
                <img
                  className='small_img_stack'
                  src='https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white'
                />
                <img
                  className='small_img_stack'
                  src='https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E'
                />
                <img
                  className='small_img_stack'
                  src='https://img.shields.io/badge/symfony-%23000000.svg?style=for-the-badge&logo=symfony&logoColor=white'
                />
                <img
                  className='small_img_stack'
                  src='https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white'
                />
                <img
                  className='small_img_stack'
                  src='https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white'
                />
                <img
                  className='small_img_stack'
                  src='https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white'
                />
                <img
                  className='small_img_stack'
                  src='https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white'
                />
                <img
                  className='small_img_stack'
                  src='https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white'
                />
                <img
                  className='small_img_stack'
                  src='https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white'
                />
                <img
                  className='small_img_stack'
                  src='https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB'
                />
                <img
                  className='small_img_stack'
                  src='https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white'
                />
                <img
                  className='small_img_stack'
                  src='https://img.shields.io/badge/apache-%23D42029.svg?style=for-the-badge&logo=apache&logoColor=white'
                />
                <img
                  className='small_img_stack'
                  src='https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white'
                />
                <img
                  className='small_img_stack'
                  src='https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white'
                />
                <img
                  className='small_img_stack'
                  src='https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white'
                />
                <img
                  className='small_img_stack'
                  src='https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white'
                />
                <img
                  className='small_img_stack'
                  src='https://img.shields.io/badge/Gimp-657D8B?style=for-the-badge&logo=gimp&logoColor=FFFFFF'
                />
                <img
                  className='small_img_stack'
                  src='https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white'
                />
                <img
                  className='small_img_stack'
                  src='https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white'
                />
                <img
                  className='small_img_stack'
                  src='https://img.shields.io/badge/GitLab-330F63?style=for-the-badge&logo=gitlab&logoColor=white'
                />
                <img
                  className='small_img_stack'
                  src='https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white'
                />
                <img
                  className='small_img_stack'
                  src='https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white'
                />
                <img
                  className='small_img_stack'
                  src='http://img.shields.io/badge/-PHPStorm-181717?style=for-the-badge&logo=phpstorm&logoColor=white'
                />
                <img
                  className='small_img_stack'
                  src='https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white'
                />
              </div>
              <p className='fs-3 text-center mt-4'>{props.t('workExperience')}</p>
              <div className='list-group text-start my-1'>
                <a
                  href='#'
                  className='list-group-item list-group-item-action desc-background-black flex-column align-items-start active p-4 desc-border-black'
                >
                  <div className='d-flex w-100 justify-content-between'>
                    <h5 className='mb-3'>Asuri Solutions</h5>
                  </div>
                  <p className='mb-2'>
                    {props.t('september')} 2021 – {props.t('november')} 2022
                  </p>
                  <div className='mb-1 text-break'>
                    {props.t('work1Desc1')}
                    <p className='mb-1 text-break'>{props.t('work1Desc2')}</p>
                    <p className='mb-1 text-break'>{props.t('work1Desc3')}</p>
                    <p className='mb-1 text-break'>{props.t('work1Desc4')}</p>
                  </div>
                </a>
              </div>
              <div className='list-group text-start my-2 desc-background-black'>
                <a
                  href='#'
                  className='list-group-item list-group-item-action desc-background-black flex-column align-items-start p-4 active desc-border-black'
                >
                  <div className='d-flex w-100 justify-content-between'>
                    <h5 className='mb-3'>Vobacom</h5>
                  </div>
                  <p className='mb-2'>
                    {props.t('november')} 2022 – {props.t('march')} 2023 / {props.t('may')} 2023 –{' '}
                    {props.t('august')} 2023{' '}
                  </p>
                  <p className='mb-1 text-break'>{props.t('work2Desc1')}</p>
                  <p className='mb-1 text-break'>{props.t('work2Desc2')}</p>
                </a>
              </div>
              <div className='list-group text-start my-2 desc-background-black'>
                <a
                  href='#'
                  className='list-group-item list-group-item-action desc-background-black flex-column align-items-start p-4 active desc-border-black'
                >
                  <div className='d-flex w-100 justify-content-between'>
                    <h5 className='mb-3'>Primesoft</h5>
                  </div>
                  <p className='mb-2'>
                    {props.t('september')} 2023 – {props.t('now')}
                  </p>
                  <p className='mb-1 text-break'>{props.t('work3Desc1')}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserFooter />
    </HelmetProvider>
  );
}
