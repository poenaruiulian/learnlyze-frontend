import { View, Text } from '@defaults';
import { ActivityIndicator, Button } from 'react-native';
import { useCourse, useRoot, useUser } from '@hooks';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationType } from '../../../type';

export const HomeScreen = () => {
  const { logout } = useRoot();
  const { user } = useUser();
  const { courses, areCoursesLoading, getCourseById } = useCourse();
  const { navigate } = useNavigation<AppNavigationType>();

  return areCoursesLoading ? (
    <ActivityIndicator />
  ) : (
    <View flex center>
      <Text>{user?.email}</Text>

      {courses.map((course, index) => (
        <Button
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          title={course.title}
          onPress={() => {
            getCourseById(course.id)
              .then(
                fullCourse =>
                  fullCourse && navigate('CourseScreen', { fullCourse })
              )
              .catch(console.log);
          }}
        />
      ))}

      <Button title="Log out" onPress={logout} />
    </View>
  );
};
