import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { UserFooter } from 'View/User/Common/UserFooter';
import ValidateUtil from 'Util/ValidateUtil';
import { useNavigate } from 'react-router-dom';
import './UserAbout.css';

export default function About() {
  const [state, setState] = useState({
    email: '',
    myEmail: false,
    send: false,
  });

  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const myEmail = 'mosinskidamian';
  let emailValidity = ValidateUtil.validateEmail(state.email) && !state.email.includes(myEmail);

  return (
    <HelmetProvider>
      <Helmet>
        <style>{'body { background-color: black; }'}</style>
      </Helmet>
      <div className='container-fluid main-container about_page_container mt-3'>
        <div className='card position-relative p-3 bg-dark shadow about_page text-center text-white'>
          <div className='row justify-content-end  align-items-center mt-1'>
            <div className='col-2'>
              <ButtonGroup className='ps-5 ms-5'>
                <Button
                  name='pl'
                  size='sm'
                  className={
                    i18n.language === 'pl' ? 'btn  m-1 button_light' : 'btn  m-1 button_dark'
                  }
                  onClick={() => i18n.changeLanguage('pl')}
                >
                  PL
                </Button>
                <Button
                  name='en'
                  size='sm'
                  className={
                    i18n.language === 'en' ? 'btn  m-1 button_light' : 'btn  m-1 button_dark'
                  }
                  onClick={() => i18n.changeLanguage('en')}
                >
                  EN
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <div className='fs-2 fw-bold'>
            <p>{t('aboutDesc1')}</p>
          </div>
          <div className='fs-4 text-break'>
            <p>{t('aboutDesc2')}</p>
          </div>
          <div className='fs-4 text-break'>
            <p>{t('aboutDesc3')}</p>
          </div>
          <div className='fs-4 text-break mt-2'>
            <p>{t('aboutDesc4')}</p>
          </div>
          <div className='fs-5 row'>
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
          <div className='row mt-5'>
            <div className='fs-5 col-6'>Aby zalogować się jako Administrator podaj swój email:</div>
            <div className='col-6'>
              <div className='fs-5 row'>
                <div className='col-9'>
                  <input
                    id='email'
                    type='text'
                    name='email'
                    disabled={state.send}
                    className='form-control mt-2'
                    onChange={(e) => {
                      setState((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }));
                    }}
                  />
                  {state.email !== '' ? (
                    emailValidity ? (
                      <div className='fs-5 text-center text-danger'>dobry</div>
                    ) : (
                      <div className='fs-5 text-center text-danger'>zły</div>
                    )
                  ) : null}
                </div>
                <div className='col-2'>
                  {!state.send ? (
                    <Button
                      name='pl'
                      size='sm'
                      className={'btn  m-1 admin_button_dark'}
                      disabled={!emailValidity}
                      onClick={() => {
                        setState((prev) => ({
                          ...prev,
                          send: true,
                        }));
                      }}
                    >
                      Zaloguj
                    </Button>
                  ) : (
                    <Button
                      name='pl'
                      size='sm'
                      className={'btn  m-1 admin_button_dark'}
                      disabled={!emailValidity}
                      onClick={() => navigate('/main')}
                    >
                      Przejdź do strony głównej
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserFooter />
    </HelmetProvider>
  );
}
