import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTokenStore = create(
  persist(
    (set) => ({
      token: '',
      roles: [],
      setToken: (data) => {
        set(() => ({
          token: data.token,
          roles: data.roles.authorizationRoleModels.map((role) => role.name),
          admin: data.admin,
        }));
      },
      removeToken: () =>
        set(() => ({
          token: '',
          roles: [],
          admin: false,
        })),
    }),
    {
      name: 'api-token',
    },
  ),
);

export const useNotificationsListStore = create(
  persist(
    (set) => ({
      notifications: [],
      maxPage: 0,
      dateUpdate: [],
      trigerTable: [],
      addNotifications: (page, notifications) => {
        set((state) => {
          const updatedDateUpdate = [...state.dateUpdate];
          updatedDateUpdate[page] = Date.now() + 300000;

          return {
            notifications: notifications,
            dateUpdate: updatedDateUpdate,
          };
        });
      },
      setMaxPage: (maxPage) => {
        set(() => ({
          maxPage: maxPage,
        }));
      },
      addTrigerTable: (notification) => {
        set((state) => {
          const addNotification = [...state.trigerTable];
          addNotification.push(notification);

          return {
            trigerTable: addNotification,
          };
        });
      },
    }),
    {
      name: 'notifications',
    },
  ),
);

//todo tu jeszcze moge trzymać te ustawienia języka i likalizację (jeśli nie pl to na eng ustawiam i tyle)
