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

  error: null,
  setError: value =>
    set(() => ({
      error: value,
    })),
  hasError: false,
  setHasError: value =>
    set(() => ({
      hasError: value,
    })),
});
