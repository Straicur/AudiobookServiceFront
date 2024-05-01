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

export const useUserAudiobooksListStore = create(
  persist(
    (set) => ({
      audiobooks: [],
      dateUpdate: [],
      maxPage: 0,
      addAudiobooks: (page, newAudiobooks) => {
        set((state) => {
          let copy = state.audiobooks;
          let updatedDateUpdate = state.dateUpdate;
          let updatedMaxPage = state.maxPage;

          if (page + 1 <= newAudiobooks.maxPage) {
            if (copy[page] !== undefined) {
              copy.splice(page, 1, newAudiobooks);
              updatedDateUpdate.splice(page, 1, Date.now() + 100000);
            } else {
              copy.push(newAudiobooks);
              updatedDateUpdate.push(Date.now() + 100000);
            }
            updatedMaxPage = newAudiobooks.maxPage;
          }

          return {
            audiobooks: copy,
            dateUpdate: updatedDateUpdate,
            maxPage: updatedMaxPage,
          };
        });
      },
      setUpdatedMaxPage: (page, newDate) => {
        set((state) => {
          let updatedDateUpdate = state.dateUpdate;

          if (updatedDateUpdate[page] !== undefined) {
            updatedDateUpdate.splice(page, 1, newDate);
          }

          return {
            ...state,
            dateUpdate: updatedDateUpdate,
          };
        });
      },
    }),
    {
      name: 'user-audiobooks',
    },
  ),
);

//todo tu jeszcze moge trzymać te ustawienia języka i likalizację (jeśli nie pl to na eng ustawiam i tyle)
