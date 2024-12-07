import { View, Text } from '@defaults';
import { ActivityIndicator, Button } from 'react-native';
import { useCourse, useRoot, useUser } from '@hooks';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FullCourseModel } from '@constants';
import { AppNavigationType } from '../../../type';

export const HomeScreen = () => {
  const { logout } = useRoot();
  const { user } = useUser();
  const { courses, areCoursesLoading, getCourseById } = useCourse();
  const { navigate } = useNavigation<AppNavigationType>();
  const [fullCourse, setFullCourse] = useState<FullCourseModel | null>(null);

  // TODO The course fetching logic should be modified in the future

  useEffect(() => {
    if (courses && courses.length !== 0) {
      getCourseById(courses[0].id).then(response => {
        setFullCourse(response);
      });
    }
    // eslint-disable-next-line
  }, [courses]);

  return areCoursesLoading ? (
    <ActivityIndicator />
  ) : (
    <View flex center>
      <Text>{user?.email}</Text>
      <Button
        title="Course"
        disabled={!fullCourse}
        onPress={() => fullCourse && navigate('CourseScreen', { fullCourse })}
      />
      <Button title="Log out" onPress={logout} />
    </View>
  );
};
