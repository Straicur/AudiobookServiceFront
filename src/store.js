import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { HandleFetch } from "./Components/HandleFetch";

let tokenStore = (set) => ({
  token: "",
  roles: [],
  setToken: (jsonData, state, setState, language) => {
    HandleFetch("/authorize", "POST", jsonData, language)
      .then((data) => {
        set(() => ({
          token: data.token,
          roles: data.roles.authorizationRoleModels.map((role) => role.name),
        }));
      })
      .catch((e) => {
        setState({
          ...state,
          error: e,
        });
      });
  },
  removeToken: () =>
    set(() => ({
      token: "",
      roles: [],
    })),
});

let categoryTreeListStore = (set) => ({
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

let lastSearchStore = (set) => ({
  search: null,
  dateUpdate: 0,
  setSearch: (search) => {
    set((state) => ({
      search: search,
      dateUpdate: Date.now() + 1800000,
    }));
  },
  removeSearch: () =>
    set(() => ({
      search: null,
      dateUpdate: 0,
    })),
});

let lastUserRolesStore = (set) => ({
  roles: null,
  dateUpdate: 0,
  setRoles: (roles) => {
    set((state) => ({
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
  newNotifications: 0,
  dateUpdate: 0,
  addNotification: (notification) => {
    set((state) => ({
      notifications: [...state.notifications, notification],
      dateUpdate: Date.now() + 300000,
    }));
  },
  setNewNotification: (newNotifications) => {
    set(() => ({
      newNotifications: newNotifications,
    }));
  },
  removeNotifications: () =>
    set(() => ({
      notifications: [],
      dateUpdate: 0,
    })),
});

//todo tu jeszcze mogę trzymać te ustawienia języka i likalizację (jeśli nie pl to na eng ustawiam i tyle)

tokenStore = devtools(tokenStore);
tokenStore = persist(tokenStore, { name: "auth_token" });

categoryTreeListStore = devtools(categoryTreeListStore);
categoryTreeListStore = persist(categoryTreeListStore, {
  name: "categoriesTree",
});

categoryListStore = devtools(categoryListStore);
categoryListStore = persist(categoryListStore, { name: "categories" });

lastSearchStore = devtools(lastSearchStore);
lastSearchStore = persist(lastSearchStore, { name: "searchAudiobooks" });

lastUserRolesStore = devtools(lastUserRolesStore);
lastUserRolesStore = persist(lastUserRolesStore, { name: "userRolesStore" });

notificationsListStore = devtools(notificationsListStore);
notificationsListStore = persist(notificationsListStore, {
  name: "notificationsStore",
});

export const useTokenStore = create(tokenStore);
export const useLastUserRolesStore = create(lastUserRolesStore);
export const useLastSearchStore = create(lastSearchStore);
export const useCategoryTreeListStore = create(categoryTreeListStore);
export const useCategoryListStore = create(categoryListStore);
export const useNotificationsListStore = create(notificationsListStore);
