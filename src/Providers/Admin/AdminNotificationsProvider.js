import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import AdminNotificationsAddService from 'Service/Admin/AdminNotificationsAddService';
import AdminNotificationsService from 'Service/Admin/AdminNotificationsService';

const AdminNotificationsContext = createContext(null);

export const AdminNotificationsProvider = ({ children, page, token, searchState, i18n }) => {
  const qc = useQueryClient();

  const setRefetch = () => {
    qc.invalidateQueries(['dataAdminNotifications']);
  };

  const { mutate: deleteNotification } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
        '/admin/user/notification/delete',
        'PATCH',
        {
          notificationId: data.notificationId,
          delete: data.delete,
        },
        token,
        i18n.language,
      );
    },
    onError: () => {
      qc.invalidateQueries([
        'dataAdminNotifications' + page,
        'dataNotifications',
        'dataNewNotifications',
      ]);
    },
    throwOnError: true,
  });

  const { mutate: addNotification } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
        '/admin/user/notification',
        'PUT',
        {
          notificationType: data.modalState.notificationType,
          notificationUserType: data.modalState.userType,
          additionalData: AdminNotificationsAddService.createAdditionalData(data.modalState),
        },
        token,
        i18n.language,
      );
    },
    onSuccess: (data, variables) => {
      qc.invalidateQueries(['dataAdminNotifications', 'dataNotifications', 'dataNewNotifications']);

      variables.setState((prev) => ({
        ...prev,
        addNotificationModal: !variables.addNotificationModal,
      }));
    },
    onError: () => {
      qc.invalidateQueries(['dataAdminNotifications' + page]);
    },
    throwOnError: true,
  });

  const { mutate: editNotification } = useMutation({
    mutationFn: (data) => {
      return HandleFetch('/admin/user/notification', 'PATCH', data.jsonData, token, i18n.language);
    },
    onSuccess: (data, variables) => {
      variables.setNotificationState((prev) => ({
        ...prev,
        editNotificationkModal: !variables.notificationState.editNotificationkModal,
      }));

      qc.invalidateQueries(['dataAdminNotifications', 'dataNotifications', 'dataNewNotifications']);
    },
    onError: () => {
      qc.invalidateQueries(['dataAdminNotifications' + page]);
    },
    throwOnError: true,
  });

  const { data: dataAdminStatistics = null, refetch } = useQuery({
    queryKey: ['dataAdminNotifications' + page],
    queryFn: () =>
      HandleFetch(
        '/admin/user/notifications',
        'POST',
        {
          page: page,
          limit: 15,
          searchData: AdminNotificationsService.createSearchData(searchState),
        },
        token,
        i18n.language,
      ),
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
  });

  const value = [
    dataAdminStatistics,
    setRefetch,
    refetch,
    editNotification,
    addNotification,
    deleteNotification,
  ];

  return (
    <AdminNotificationsContext.Provider value={value}>
      {children}
    </AdminNotificationsContext.Provider>
  );
};

export const useAdminNotificationsData = () => useContext(AdminNotificationsContext);
