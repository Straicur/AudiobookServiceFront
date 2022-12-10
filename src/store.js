import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { HandleFetch } from "./components/HandleFetch";

let tokenStore = (set) => ({
  token: "",
  setToken: (jsonData) => {
    HandleFetch("http://127.0.0.1:8000/api/authorize", jsonData, "POST")
      .then((data) => data.json())
      .then((data) => {
        set(() => ({ token: data.token }));
      })
      .catch((e) => {
        console.log(e);
      });
  },
  removeToken: () => set((state) => (state.token = "")),
});

let audiobookListStore = (set) => ({
  people: [],
  addPerson: (person) =>
    set((state) => ({ people: [...state.people, person] })),
  //todo tu jeszcze inne metody
});

tokenStore = devtools(tokenStore);
tokenStore = persist(tokenStore, { name: "auth_token" });

audiobookListStore = devtools(audiobookListStore);

export const useTokenStore = create(tokenStore);
export const useAudiobookListStore = create(audiobookListStore);
