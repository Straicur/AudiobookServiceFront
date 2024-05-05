import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function Page404() {
  const { t } = useTranslation();

  return (
    <HelmetProvider>
      <Helmet>
        <style>{'body { background-color: black; }'}</style>
      </Helmet>

      <div className='container-fluid main-container mt-4'>
        <div className='card position-relative p-3 bg-dark shadow text-white text-center'>
          <h1>{t('pageNotFound')}</h1>
        </div>
      </div>
    </HelmetProvider>
  );
}
