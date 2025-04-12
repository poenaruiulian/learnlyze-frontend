import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CourseInfo, RootInfo } from '@constants';
import { createCourseSlice, createRootSlice } from './slices';

const persistConfig = {
  name: 'store',
  storage: createJSONStorage(() => AsyncStorage),
};
export const useStore = create<RootInfo & CourseInfo>()(
  devtools(
    persist(
      (...a) => ({
        ...createRootSlice(...a),
        ...createCourseSlice(...a),
      }),
      persistConfig
    )
  )
);
