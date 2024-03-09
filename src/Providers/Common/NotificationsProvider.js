import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';
import { useNotificationsListStore } from 'Store/store';

const NotificationsContext = createContext(null);

export const NotificationsProvider = ({ children, token, page, i18n }) => {
  const qc = useQueryClient();
  // const dateUpdate = useNotificationsListStore((state) => state.dateUpdate);

  const notificationsListStore = useNotificationsListStore();
  // const setAudiobookPart = (variables) => {
  //   let copy = dataNotifications;

  //   for (var key in variables) {
  //     copy[key] = variables[key];
  //   }

  //   qc.setQueryData(['dataNotifications'], copy);
  // };

  const setRefetch = () => {
    qc.invalidateQueries(['dataNotifications']);
  };

  const { data: dataNotifications = null } = useQuery({
    queryKey: ['dataNotifications' + page],
    queryFn: () => {
      return HandleFetch(
        '/notifications',
        'POST',
        {
          page: page,
          limit: 6,
        },
        token,
        i18n.language,
      );
    },
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
    // enabled: dateUpdate[page] <= Date.now(),
    onError: () => {
      notificationsListStore.setNewNotification(0);
    },
  });

  const value = [dataNotifications, setRefetch];

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};

export const useNotifications = () => useContext(NotificationsContext);
