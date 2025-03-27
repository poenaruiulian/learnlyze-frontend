import { colors, FullCourseModel, sizes, strings } from '@constants';
import { View, Text } from '@defaults';
import { KSpacer } from '@components';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { AppNavigationType } from '../../../../../type';

type LastAccessedCourseCardProps = {
  course: FullCourseModel;
};

export const KLastAccessedCourseCard = ({
  course,
}: LastAccessedCourseCardProps) => {
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation<AppNavigationType>();

  const steps = course.steps ? course.steps.length : 1;
  const { completedSteps } = course.details;

  const completed =
    completedSteps && steps ? Math.floor((completedSteps * 100) / steps) : 0;
  const uncompleted = 100 - completed;

  const title = useMemo(
    () => course.steps.find(step => !step.details.completed)?.details.title,
    [course.steps]
  );

  const handleNavigation = () => {
    navigate('CourseScreen', { fullCourse: course });
  };

  return (
    <View width={width} center>
      <Text
        white80
        bodyXL
        bold
        style={{ marginHorizontal: sizes.s16, alignSelf: 'flex-start' }}>
        {strings.home.studying}
      </Text>
      <KSpacer />
      <TouchableOpacity onPress={handleNavigation}>
        <View
          width={width - sizes.s32}
          padding={sizes.s10}
          borderRadius={sizes.s10}
          style={{ backgroundColor: colors.biscay60 }}>
          <View row gap={sizes.s10} centerH width={width - sizes.s32}>
            <Text
              semiBold
              bodyS
              white50
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{ width: (width - sizes.s32) * 0.7 }}>
              {course.details.title}
            </Text>
            <KSpacer
              w={1}
              h={sizes.s14}
              style={{ backgroundColor: colors.white50 }}
            />
            <Text
              semiBold
              bodyS
              persianGreen>{`${course.details.completedSteps} of ${course.steps.length}`}</Text>
          </View>
          <KSpacer />
          <Text bodyXL tulipTree semiBold>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
      <KSpacer />
      <View>
        <Text
          style={{
            position: 'absolute',
            zIndex: 1,
            alignSelf: 'center',
          }}
          white50
          bold
          bodyS>
          {`${completed}%`}
        </Text>
        <LinearGradient
          colors={
            uncompleted === 0
              ? [colors.persianGreen, colors.persianGreen]
              : completed === 0
                ? [colors.biscay, colors.tulipTree]
                : [colors.biscay, colors.persianGreen]
          }
          style={{
            width: width - sizes.s32,
            height: 20,
            borderRadius: 6,
          }}
          locations={[completed / 100, uncompleted / 100]}
          start={{ x: 0, y: 0.75 }}
          end={{ x: 1, y: 0.25 }}
        />
      </View>
    </View>
  );
};
