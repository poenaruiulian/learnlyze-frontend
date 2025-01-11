import { CourseModel, sizes } from '@constants';
import { FlatList } from 'react-native';
import { useCourse } from '@hooks';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from '@defaults';
import { KSpacer } from '@components';
import { Fragment } from 'react';
import { CourseCard } from './CourseCard';
import { AppNavigationType } from '../../../../../type';

type CoursesListProps = {
  label: string;
  courses: CourseModel[];
};
export const CoursesList = ({ ...props }: CoursesListProps) => {
  const { getCourseById } = useCourse();
  const { navigate } = useNavigation<AppNavigationType>();

  const handleNavigation = (id: number) => {
    getCourseById(id).then(
      fullCourse => fullCourse && navigate('CourseScreen', { fullCourse })
    );
  };

  return (
    <View>
      <Text white80 bodyXL bold style={{ marginHorizontal: sizes.s10 }}>
        {props.label}
      </Text>
      <KSpacer />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={props.courses}
        snapToInterval={255}
        renderItem={({ item, index }) => (
          <Fragment key={index}>
            {index === 0 && <KSpacer />}
            <CourseCard
              name={item.title}
              steps={item.steps.length}
              completed={item.completedSteps}
              onPress={() => handleNavigation(item.id)}
            />
            <KSpacer />
          </Fragment>
        )}
        ListEmptyComponent={
          <>
            <KSpacer />
            <CourseCard noCourse onPress={() => {}} />
          </>
        }
      />
    </View>
  );
};
