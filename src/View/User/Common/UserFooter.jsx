import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTokenStore } from 'Store/store';

export const UserFooter = () => {
  const { t } = useTranslation();

  const token = useTokenStore((state) => state.token);

  return (
    <div className='footer-basic'>
      <footer>
        <ul className='list-inline'>
          <li className='list-inline-item'>
            <i className='bi bi-door-closed'></i>
          </li>
          <li className='list-inline-item'>
            <p className='copyright'> © 2024 Audiobooks</p>
          </li>
          {token !== undefined && token !== null && token !== '' ? (
            <li className='list-inline-item'>
              <a href='/main'>{t('home')}</a>
            </li>
          ) : null}
          <li className='list-inline-item'>
            <a href='/about'>{t('about')}</a>
          </li>
          <li className='list-inline-item'>
            <a href={process.env.REACT_APP_API_URL + '/api/doc'}>API</a>
          </li>
          <li className='list-inline-item'>
            <a href='https://github.com/Straicur/AudiobookServiceFront'>{t('documentation')}</a>
          </li>
          <li className='list-inline-item'>
            <a href='/policy'>{t('privacyPolicy')}</a>
          </li>
          <li className='list-inline-item'>
            <a href='/help'>{t('help')}</a>
          </li>
          <li className='list-inline-item'>
            <a href='/report'>{t('report')}</a>
          </li>
        </ul>
      </footer>
    </div>
  );
};
