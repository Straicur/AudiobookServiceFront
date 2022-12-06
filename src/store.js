import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

let tokenStore = (set) => ({
  token: "",
  setToken: ( token ) => set((state) => ({token:token})),
  removeToken: () => set((state) => state.token = ""),
})

let audiobookListStore = (set) => ({
  people: [],
  addPerson: (person) =>
    set((state) => ({ people: [...state.people, person] })),
//todo tu jeszcze inne metody
})

tokenStore = devtools(tokenStore)
tokenStore = persist(tokenStore, { name: 'auth_token' })

audiobookListStore = devtools(audiobookListStore)

export const useTokenStore = create(tokenStore)
export const useAudiobookListStore = create(audiobookListStore)