import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { HandleFetch } from "./components/HandleFetch";

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

let categoryListStore = (set) => ({
  categories: [],
  dateUpdate: 0,
  addCategory: (category) => {
    set((state) => ({
      categories: [...state.categories, category],
      dateUpdate: Date.now(),
    }));
  },
  removeCategories: () =>
    set(() => ({
      categories: [],
      dateUpdate: 0,
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

audiobookListStore = devtools(audiobookListStore);

export const useTokenStore = create(tokenStore);
export const useAudiobookListStore = create(audiobookListStore);
