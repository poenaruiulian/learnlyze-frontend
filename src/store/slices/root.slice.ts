import { StateCreator } from 'zustand';
import { RootInfo } from '@constants';

export const createRootSlice: StateCreator<RootInfo> = set => ({
  isLogged: false,
  toggleIsLogged: () =>
    set((state: RootInfo) => ({ isLogged: !state.isLogged })),
  token: null,
  setToken: token => set(() => ({ token })),
  isNewUser: true,
  setIsNewUser: value => set(() => ({ isNewUser: value })),
});
