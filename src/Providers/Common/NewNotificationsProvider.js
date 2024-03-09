import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

const NewNotificationsContext = createContext(null);

export const NewNotificationsProvider = ({ children, token }) => {
  const { i18n } = useTranslation();
  const qc = useQueryClient();

  const setRefetch = () => {
    qc.invalidateQueries(['dataNotifications']);
  };

  const { data: dataNotifications = null } = useQuery({
    queryKey: ['dataNewNotifications'],
    queryFn: () => {
      return HandleFetch('/new/notifications', 'POST', null, token, i18n.language);
    },
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
  });

  const value = [dataNotifications, setRefetch];

  return (
    <NewNotificationsContext.Provider value={value}>{children}</NewNotificationsContext.Provider>
  );
};

export const useNewNotifications = () => useContext(NewNotificationsContext);
