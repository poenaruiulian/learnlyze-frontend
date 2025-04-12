import { StateCreator } from 'zustand';
import { CourseInfo } from '@constants';

export const createCourseSlice: StateCreator<CourseInfo> = set => ({
  shouldReload: false,
  setShouldReload: shouldReload => set(() => ({ shouldReload })),
});
