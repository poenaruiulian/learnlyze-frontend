import { View } from '@defaults';
import { RouteProp, useRoute } from '@react-navigation/native';
import { KContainer, KSpacer } from '@components';
import { useEffect, useState } from 'react';
import { colors, sizes, StepModel } from '@constants';
import { useWindowDimensions } from 'react-native';
import { useCourse } from '@hooks';
import { AppStackParamList } from '../../../type';
import { KHeader, KResource, KStep, KStepDescription } from './components';

export const CourseScreen = () => {
  const { params } = useRoute<RouteProp<AppStackParamList, 'CourseScreen'>>();

  const { changeStepState, getCourseById, accessCourse } = useCourse();

  const { width } = useWindowDimensions();

  const [webViewHeights, setWebViewHeights] = useState<{
    [key: string]: number;
  }>({});
  const [extendedStep, setExtendedStep] = useState<StepModel['id'][]>([]);
  const [fullCourse, setFullCourse] = useState(params.fullCourse);

  const handleMessage = (event: any, stepId: string) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.height) {
      setWebViewHeights(prev => ({
        ...prev,
        [stepId]: data.height + 100,
      }));
    }
  };

  // TODO This function will handle the showing more steps when that case occurs
  const handleStepOnPress = (stepId: number) =>
    extendedStep.includes(stepId)
      ? setExtendedStep(prevState => prevState?.filter(el => el !== stepId))
      : setExtendedStep(prevState => [...prevState, stepId]);

  useEffect(() => {
    accessCourse({ courseId: fullCourse.details.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCourseById(fullCourse.details.id).then(response => {
      setFullCourse(response);
    });
    // eslint-disable-next-line
  }, [changeStepState]);

  return (
    <KContainer
      backgroundColor={colors.tundora}
      isScrollable
      hasTopInsets={false}>
      <KHeader
        title={fullCourse.details.title}
        date={fullCourse.details.startedAt}
      />
      <KSpacer h={sizes.s30} />
      <View flex center>
        {fullCourse.steps.map(step => (
          <View
            key={step.details.id}
            centerV
            width={width - sizes.s32}
            height={
              extendedStep.includes(step.details.id) &&
              webViewHeights[step.details.id] +
                step.resources.length * sizes.s50
            }>
            <KStep
              title={step.details.title}
              resources={step.resources.length}
              onPress={() => handleStepOnPress(step.details.id)}
              isFocused={extendedStep.includes(step.details.id)}
              isCompleted={step.details.completed}
              handleStepState={() =>
                changeStepState({
                  courseId: fullCourse.details.id,
                  stepId: step.details.id,
                })
              }
            />
            {extendedStep.includes(step.details.id) && (
              <>
                <KStepDescription
                  stepId={step.details.id}
                  description={step.details.description}
                  handleMessage={handleMessage}
                />
                <KSpacer />
                <View height={step.resources.length * sizes.s50} rightH topV>
                  {step.resources.map((resource, index) => (
                    <KResource
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      {...resource}
                    />
                  ))}
                </View>
              </>
            )}
            <KSpacer />
          </View>
        ))}
      </View>
      <KSpacer h={sizes.s50} />
    </KContainer>
  );
};
