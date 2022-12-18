import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { HandleFetch } from "./components/HandleFetch";

let tokenStore = (set) => ({
  token: "",
  roles: [],
  setToken: (jsonData) => {
    HandleFetch("http://127.0.0.1:8000/api/authorize", "POST", jsonData)
      .then((data) => {
        set(() => ({
          token: data.token,
          roles: data.roles.authorizationRoleModels.map((role) => role.name),
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  },
  removeToken: () => set(() => ({
    token: "",
    roles: [],
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
