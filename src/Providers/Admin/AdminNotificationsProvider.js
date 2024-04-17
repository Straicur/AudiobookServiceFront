import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import AdminNotificationsAddService from 'Service/Admin/AdminNotificationsAddService';

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

  const { mutate: deleteNotification } = useMutation({
    mutationFn: (data) => {
      HandleFetch(
        '/admin/user/notification/delete',
        'PATCH',
        {
          notificationId: data.notificationId,
          delete: !data.delete,
        },
        token,
        i18n.language,
      );
    },
    onError: (e) => {
      qc.invalidateQueries(['dataAdminNotifications' + page]);

      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const { mutate: addNotification } = useMutation({
    mutationFn: (data) => {
      HandleFetch(
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
      data = [];

      qc.invalidateQueries(['dataAdminNotifications']);

      variables.setState((prev) => ({
        ...prev,
        addNotificationModal: !variables.addNotificationModal,
      }));
    },
    onError: (e) => {
      qc.invalidateQueries(['dataAdminNotifications' + page]);

      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const { mutate: editNotification } = useMutation({
    mutationFn: (data) => {
      HandleFetch(
        '/admin/user/notification',
        'PATCH',
        {
          notificationId: data.notificationState.id,
          notificationType: data.notificationState.notificationType,
          notificationUserType: data.notificationState.userType,
          actionId: data.notificationState.actionId,
          additionalData: {
            text: data.notificationState.text,
          },
        },
        token,
        i18n.language,
      );
    },
    onSuccess: (data, variables) => {
      data = [];

      variables.setNotificationState((prev) => ({
        ...prev,
        editNotificationkModal: !variables.notificationState.editNotificationkModal,
      }));

      qc.invalidateQueries(['dataAdminNotifications']);
    },
    onError: (e) => {
      qc.invalidateQueries(['dataAdminNotifications' + page]);

      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

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

  const value = [
    dataAdminStatistics,
    setRefetch,
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
