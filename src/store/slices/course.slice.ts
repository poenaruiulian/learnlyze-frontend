import { CourseInfo } from '@constants';
import { StateCreator } from 'zustand';

export const createCourseSlice: StateCreator<CourseInfo> = set => ({
  shouldReload: false,
  setShouldReload: shouldReload => set(() => ({ shouldReload })),
});
