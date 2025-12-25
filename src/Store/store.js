import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTokenStore = create(
  persist(
    (set) => ({
      token: '',
      roles: [],
      admin: false,
      setToken: (data) => {
        set(() => ({
          token: data.token,
          roles: data.roles?.authorizationRoleModels.map((role) => role.name),
          admin: data.isAdmin,
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

export const useTechnicalBreakStore = create(
  persist(
    (set) => ({
      admin: false,
      user: false,
      setAdminTechnicalBreak: () => {
        set(() => ({
          admin: true,
        }));
      },
      removeAdminTechnicalBreak: () =>
        set(() => ({
          admin: false,
        })),
    }),
    {
      name: 'technical-break',
    },
  ),
);

export const useNotificationsListStore = create(
  persist(
    (set) => ({
      notifications: [],
      maxPage: 0,
      dateUpdate: [],
      addNotifications: (page, notifications) => {
        set((state) => {
          let copy = state.notifications;
          let updatedDateUpdate = state.dateUpdate;

          if (page + 1 <= notifications.maxPage) {
            if (copy[page] !== undefined) {
              copy.splice(page, 1, notifications);
              updatedDateUpdate.splice(page, 1, Date.now() + 30000);
            } else {
              copy.push(notifications);
              updatedDateUpdate.push(Date.now() + 30000);
            }
          }

          return {
            notifications: copy,
            dateUpdate: updatedDateUpdate,
          };
        });
      },
      setMaxPage: (maxPage) => {
        set(() => ({
          maxPage: maxPage,
        }));
      },
      removePageNotifications: (page) => {
        set((state) => {
          let copy = state.notifications;
          let updatedDateUpdate = state.dateUpdate;

          copy[page] = null;
          updatedDateUpdate[page] = 0;

          return {
            notifications: copy,
            dateUpdate: updatedDateUpdate,
          };
        });
      },
      changeNotificationStatus: (page, index) => {
        set((state) => {
          let copy = state.notifications;

          copy[page].systemNotifications[index].active = Date.now();
          return { notifications: copy };
        });
      },
      removeNotifications: () => {
        set(() => {
          return {
            notifications: [],
            dateUpdate: [],
            maxPage: 0,
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
      removePageAudiobooks: (page) => {
        set((state) => {
          let copy = state.audiobooks;
          let updatedDateUpdate = state.dateUpdate;

          copy[page] = null;
          updatedDateUpdate[page] = 0;

          return {
            audiobooks: copy,
            dateUpdate: updatedDateUpdate,
          };
        });
      },
      removeAudiobooks: () => {
        set(() => {
          return {
            audiobooks: [],
            dateUpdate: [],
            maxPage: 0,
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
