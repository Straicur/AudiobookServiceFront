import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

let tokenStore = (set) => ({
  token: '',
  roles: [],
  setToken: (data) => {
    set(() => ({
      token: data.token,
      roles: data.roles.authorizationRoleModels.map((role) => role.name),
    }));
  },
  removeToken: () =>
    set(() => ({
      token: '',
      roles: [],
    })),
});

let categoryTreeListStore = (set) => ({
  categories: [],
  dateUpdate: 0,
  addCategories: (categories) => {
    set(() => ({
      categories: categories,
      dateUpdate: Date.now() + 1800000,
    }));
  },
  removeCategories: () =>
    set(() => ({
      categories: [],
      dateUpdate: 0,
    })),
});

let categoryListStore = (set) => ({
  categories: [],
  dateUpdate: 0,
  addCategory: (category) => {
    set((state) => ({
      categories: [...state.categories, category],
      dateUpdate: Date.now() + 1800000,
    }));
  },
  removeCategories: () =>
    set(() => ({
      categories: [],
      dateUpdate: 0,
    })),
});

let lastUserRolesStore = (set) => ({
  roles: null,
  dateUpdate: 0,
  setRoles: (roles) => {
    set(() => ({
      roles: roles,
      dateUpdate: Date.now() + 1800000,
    }));
  },
  removeRoles: () =>
    set(() => ({
      roles: null,
      dateUpdate: 0,
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

categoryTreeListStore = devtools(categoryTreeListStore);
categoryTreeListStore = persist(categoryTreeListStore, {
  name: 'categoriesTree',
});

categoryListStore = devtools(categoryListStore);
categoryListStore = persist(categoryListStore, { name: 'categories' });

lastUserRolesStore = devtools(lastUserRolesStore);
lastUserRolesStore = persist(lastUserRolesStore, { name: 'userRolesStore' });

notificationsListStore = devtools(notificationsListStore);
notificationsListStore = persist(notificationsListStore, {
  name: 'notificationsStore',
});

coverListStore = devtools(coverListStore);
coverListStore = persist(coverListStore, {
  name: 'coverListStore',
});

export const useTokenStore = create(tokenStore);
export const useLastUserRolesStore = create(lastUserRolesStore);
export const useCategoryTreeListStore = create(categoryTreeListStore);
export const useCategoryListStore = create(categoryListStore);
export const useNotificationsListStore = create(notificationsListStore);
export const useCoverListStore = create(coverListStore);
