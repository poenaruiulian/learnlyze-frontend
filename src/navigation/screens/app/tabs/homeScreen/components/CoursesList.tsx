import { CourseModel, sizes } from '@constants';
import { FlatList, useWindowDimensions } from 'react-native';
import { useCourse } from '@hooks';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from '@defaults';
import { KSpacer } from '@components';
import { Fragment, useRef, useState } from 'react';
import { CourseCard } from './CourseCard';
import { AppNavigationType, TabNavigationType } from '../../../../../type';

type CoursesListProps = {
  label: string;
  courses: CourseModel[];
};
export const CoursesList = ({ ...props }: CoursesListProps) => {
  const { getCourseById } = useCourse();
  const { navigate: appNavigate } = useNavigation<AppNavigationType>();
  const { navigate: tabNavigate } = useNavigation<TabNavigationType>();
  const { width } = useWindowDimensions();

  const [scrollEnabled, setScrollEnabled] = useState(true);
  const flatListRef = useRef(null);

  const handleCourseNavigation = (id: number) => {
    getCourseById(id).then(
      fullCourse => fullCourse && appNavigate('CourseScreen', { fullCourse })
    );
  };

  const handleDiscoverNavigation = () => tabNavigate('DiscoverScreen');

  const onContentSizeChange = (contentWidth: number) => {
    setScrollEnabled(contentWidth > width);
  };

  return (
    <View>
      <Text white80 bodyXL bold style={{ marginHorizontal: sizes.s10 }}>
        {props.label}
      </Text>
      <KSpacer />
      <FlatList
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={props.courses}
        snapToInterval={255}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={onContentSizeChange}
        renderItem={({ item, index }) => (
          <Fragment key={index}>
            {index === 0 && <KSpacer />}
            <CourseCard
              name={item.title}
              steps={item.steps.length}
              completed={item.completedSteps}
              onPress={() => handleCourseNavigation(item.id)}
            />
            <KSpacer />
          </Fragment>
        )}
        ListEmptyComponent={
          <>
            <KSpacer />
            <CourseCard noCourse onPress={handleDiscoverNavigation} />
          </>
        }
      />
    </View>
  );
};
