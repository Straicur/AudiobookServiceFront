import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { HandleFetch } from "./Components/HandleFetch";

let tokenStore = (set) => ({
  token: "",
  roles: [],
  setToken: (jsonData, state, setState) => {
    HandleFetch("http://127.0.0.1:8000/api/authorize", "POST", jsonData)
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
      dateUpdate: Date.now() + 1800000
    }));
  },
  removeSearch: () =>
    set(() => ({
      search: null,
      dateUpdate: 0
    })),
});


let audiobookListStore = (set) => ({
  people: [],
  addPerson: (person) =>
    set((state) => ({ people: [...state.people, person] })),
  //todo tu jeszcze inne metody
});

//todo tu jeszcze mogę trzymać te ustawienia języka i likalizację (jeśli nie pl to na eng ustawiam i tyle)

tokenStore = devtools(tokenStore);
tokenStore = persist(tokenStore, { name: "auth_token" });

categoryTreeListStore = devtools(categoryTreeListStore);
categoryTreeListStore = persist(categoryTreeListStore, { name: "categoriesTree" });

categoryListStore = devtools(categoryListStore);
categoryListStore = persist(categoryListStore, { name: "categories" });

lastSearchStore = devtools(lastSearchStore);
lastSearchStore = persist(lastSearchStore, { name: "searchAudiobooks" });

audiobookListStore = devtools(audiobookListStore);

export const useTokenStore = create(tokenStore);
export const useLastSearchStore = create(lastSearchStore);
export const useCategoryTreeListStore = create(categoryTreeListStore);
export const useCategoryListStore = create(categoryListStore);
export const useAudiobookListStore = create(audiobookListStore);
