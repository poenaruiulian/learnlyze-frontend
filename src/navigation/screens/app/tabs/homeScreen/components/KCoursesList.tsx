import { CourseModel, CoursesListsEnum, sizes } from '@constants';
import { FlatList, useWindowDimensions } from 'react-native';
import { useCourse } from '@hooks';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from '@defaults';
import { KSpacer } from '@components';
import { Fragment, useRef, useState } from 'react';
import { KCourseCard } from './KCourseCard';
import { AppNavigationType } from '../../../../../type';
import { KNoCourseCard } from './KNoCourseCard';

type CoursesListProps = {
  label: string;
  courses: CourseModel[];
  type?: CoursesListsEnum;
};
export const KCoursesList = ({ ...props }: CoursesListProps) => {
  const { getCourseById } = useCourse();
  const { navigate } = useNavigation<AppNavigationType>();
  const { width } = useWindowDimensions();

  const [scrollEnabled, setScrollEnabled] = useState(true);
  const flatListRef = useRef(null);

  const handleCourseNavigation = (id: number) => {
    getCourseById(id).then(
      fullCourse => fullCourse && navigate('CourseScreen', { fullCourse })
    );
  };

  const onContentSizeChange = (contentWidth: number) => {
    setScrollEnabled(contentWidth > width);
  };

  return (
    <View>
      <Text white80 bodyXL bold style={{ marginHorizontal: sizes.s16 }}>
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
            {index === 0 && <KSpacer w={sizes.s16} />}
            <KCourseCard
              name={item.title}
              steps={item.steps.length}
              completed={item.completedSteps}
              onPress={() => handleCourseNavigation(item.id)}
            />
            <KSpacer
              w={index === props.courses.length - 1 ? sizes.s16 : sizes.s10}
            />
          </Fragment>
        )}
        ListEmptyComponent={
          <>
            <KSpacer w={sizes.s16} />
            <KNoCourseCard type={props.type ?? CoursesListsEnum.courses} />
          </>
        }
      />
    </View>
  );
};
