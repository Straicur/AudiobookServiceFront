import React from 'react';
import UserNavBarPrividers from 'View/User/UserNavBar/UserNavBarPrividers';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { UserFooter } from 'View/User/Common/UserFooter';
import { useTokenStore } from 'Store/store';
import './UserHelp.css';

export default function Help() {
  const { t } = useTranslation();

  const token = useTokenStore((state) => state.token);

  return (
    <HelmetProvider>
      <Helmet>
        <style>{'body { background-color: black; }'}</style>
      </Helmet>

      <div className='container-fluid main-container mt-3'>
        <div className='card position-relative p-3 bg-dark shadow'>
          <UserNavBarPrividers token={token} />
          <div className='row justify-content-center fs-2 fw-bold text-white mt-4'>
            {t('helpTitle')}
          </div>
          <div className='row justify-content-center fs-3 text-white mt-1'>{t('helpText')}</div>
          <div className='row align-items-center justify-content-center text-center mt-4'>
            <div className='col-3 align-self-center help-square ms-5 me-4 my-4'>
              <div className='row'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='46'
                  height='46'
                  fill='currentColor'
                  className='bi bi-shop icon-collor'
                  viewBox='0 0 16 16'
                >
                  <path d='M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z' />
                </svg>
              </div>
              <div className='row justify-content-center fs-2 fw-bold'>{t('helpAdress')}</div>
              <div className='row justify-content-center fs-3'>Adress</div>
            </div>
            <div className='col-3 align-self-center help-square ms-5 me-4 my-4'>
              <div className='row'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='46'
                  height='46'
                  fill='currentColor'
                  className='bi bi-telephone-inbound-fill icon-collor'
                  viewBox='0 0 16 16'
                >
                  <path
                    fillRule='evenodd'
                    d='M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM15.854.146a.5.5 0 0 1 0 .708L11.707 5H14.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 1 0v2.793L15.146.146a.5.5 0 0 1 .708 0z'
                  />
                </svg>
              </div>
              <div className='row justify-content-center fs-2 fw-bold'>{t('helpPhone')}</div>
              <div className='row justify-content-center fs-3'>+48 213-123-312</div>
            </div>
            <div className='col-3 align-self-center help-square ms-5 me-4 my-4'>
              <div className='row'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='46'
                  height='46'
                  fill='currentColor'
                  className='bi bi-discord icon-collor'
                  viewBox='0 0 16 16'
                >
                  <path d='M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z' />
                </svg>
              </div>
              <div className='row justify-content-center fs-2 fw-bold'>Discord</div>
              <div className='row justify-content-center fs-3'>Link</div>
            </div>
            <div className='col-3 align-self-center help-square ms-5 me-4 my-4'>
              <div className='row'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='46'
                  height='46'
                  fill='currentColor'
                  className='bi bi-envelope-fill icon-collor'
                  viewBox='0 0 16 16'
                >
                  <path d='M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z' />
                </svg>
              </div>
              <div className='row justify-content-center fs-2 fw-bold'>Email</div>
              <div className='row justify-content-center fs-3'>admin@audio.com</div>
            </div>
          </div>
        </div>
      </div>
      <UserFooter />
    </HelmetProvider>
  );
}
