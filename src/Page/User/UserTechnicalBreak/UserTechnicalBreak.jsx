import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { UserFooter } from 'View/User/Common/UserFooter';
import './UserTechnicalBreak.css';

export default function UserTechnicalBreak() {
  const { i18n } = useTranslation();
  console.log(i18n.language);
  return (
    <HelmetProvider>
      <Helmet>
        <style>{'body { background-color: black; }'}</style>
      </Helmet>

      <div className='container-fluid main-container'>
        <div
          className={
            'card position-relative p-3 shadow technical-background ' +
            ' technical-background-' +
            i18n.language
          }
        ></div>
      </div>
      <UserFooter />
    </HelmetProvider>
  );
}
