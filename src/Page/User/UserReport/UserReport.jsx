import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { UserFooter } from 'View/User/Common/UserFooter';
import { useTokenStore } from 'Store/store';
import './UserReport.css';
import UserReportContainer from 'View/User/UserReport/UserReportContainer';

export default function UserReport() {
  const { t, i18n } = useTranslation();

  const [reportState, setReportState] = useState({
    type: 8,
    description: '',
    send: false,
    sure: false,
    openCategoriesList: false,
    openAudiobooksList: false,
    choosenCategory: null,
    choosenAudiobook: null,
  });

  const token = useTokenStore((state) => state.token);

  return (
    <HelmetProvider>
      <Helmet>
        <style>{'body { background-color: black; }'}</style>
      </Helmet>
      <UserReportContainer
        token={token}
        t={t}
        i18n={i18n}
        reportState={reportState}
        setReportState={setReportState}
      />

      <UserFooter />
    </HelmetProvider>
  );
}
