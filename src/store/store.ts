import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootInfo } from '@constants';
import { createRootSlice } from './slices';

const persistConfig = {
  name: 'store',
  storage: createJSONStorage(() => AsyncStorage),
};
export const useStore = create<RootInfo>()(
  devtools(
    persist(
      (...a) => ({
        ...createRootSlice(...a),
      }),
      persistConfig
    )
  )
);
