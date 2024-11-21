import { Text, View } from '@defaults';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AppStackParamList } from '../../type';

export const CourseScreen = () => {
  const { params } = useRoute<RouteProp<AppStackParamList, 'CourseScreen'>>();
  const { course } = params;

  return (
    <View flex center>
      <Text>{course.details.title}</Text>
    </View>
  );
};
