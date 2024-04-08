import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

let tokenStore = (set) => ({
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
});

let notificationsListStore = (set) => ({
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
});

let coverListStore = (set) => ({
  covers: [],
  dateUpdate: 1,
  addCovers: (covers) => {
    set(() => ({
      covers: covers,
      dateUpdate: Date.now() + 200000,
    }));
  },
  updateCover: (id, url) =>
    set((state) => ({
      covers: state.covers.map((cover) => {
        if (cover.id === id) {
          return { ...cover, url: url };
        }
        return cover;
      }),
      dateUpdate: 0,
    })),
});

//todo tu jeszcze moge trzymać te ustawienia języka i likalizację (jeśli nie pl to na eng ustawiam i tyle)

tokenStore = devtools(tokenStore);
tokenStore = persist(tokenStore, { name: 'auth_token' });

notificationsListStore = devtools(notificationsListStore);
notificationsListStore = persist(notificationsListStore, {
  name: 'notificationsStore',
});

coverListStore = devtools(coverListStore);
coverListStore = persist(coverListStore, {
  name: 'coverListStore',
});

export const useTokenStore = create(tokenStore);
export const useNotificationsListStore = create(notificationsListStore);
export const useCoverListStore = create(coverListStore);
