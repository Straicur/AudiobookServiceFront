import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';
import { useNotificationsListStore } from 'Store/store';

const NotificationsContext = createContext(null);

export const NotificationsProvider = ({ children, token, page, i18n, newNotifications }) => {
  const qc = useQueryClient();
  const dateUpdate = useNotificationsListStore((state) => state.dateUpdate);

  const { mutate } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
        '/notification/activate',
        'PUT',
        {
          notificationId: data.id,
        },
        token,
        i18n.language,
      );
    },
    onSuccess: (data, variables) => {
      qc.invalidateQueries(['dataNotifications' + variables.page]);
    },
  });

  const { data: dataNotifications = null, refetch } = useQuery({
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
    enabled:
      dateUpdate[page] === undefined || dateUpdate[page] <= Date.now() || newNotifications !== 0,
  });

  const value = [dataNotifications, refetch, mutate];

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};

export const useNotifications = () => useContext(NotificationsContext);
