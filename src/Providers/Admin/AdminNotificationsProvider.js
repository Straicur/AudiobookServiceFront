import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';

const AdminNotificationsContext = createContext(null);

export const AdminNotificationsProvider = ({
  children,
  page,
  token,
  //   searchState,
  setState,
  i18n,
}) => {
  const qc = useQueryClient();

  const setRefetch = () => {
    qc.invalidateQueries(['dataAdminNotifications']);
  };

  const { data: dataAdminStatistics = null } = useQuery({
    queryKey: ['dataAdminNotifications' + page],
    queryFn: () =>
      HandleFetch(
        '/admin/user/notifications',
        'POST',
        {
          page: page,
          limit: 15,
          searchData: {},
          // AdminNotificationsService  adminService.formatData()
        },
        token,
        i18n.language,
      ),
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
    onError: (e) => {
      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const value = [dataAdminStatistics, setRefetch];

  return (
    <AdminNotificationsContext.Provider value={value}>
      {children}
    </AdminNotificationsContext.Provider>
  );
};

export const useAdminNotificationsData = () => useContext(AdminNotificationsContext);
