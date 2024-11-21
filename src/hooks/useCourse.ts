import { useMutation } from '@apollo/client';
import { GENERATE_NEW_COURSE } from '@constants';

export const useCourse = () => {
  const [generateNewCourse] = useMutation(GENERATE_NEW_COURSE);

  return {
    generateNewCourse,
  };
};
