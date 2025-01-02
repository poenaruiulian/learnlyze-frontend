import { View } from '@defaults';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { KContainer, KSpacer } from '@components';
import { useEffect, useState } from 'react';
import {
  colors,
  FullCourseModel,
  FullStep,
  sizes,
  StepModel,
} from '@constants';
import { useWindowDimensions } from 'react-native';
import { useCourse } from '@hooks';
import { AppStackParamList } from '../../../type';
import { KHeader, KResource, KStep, KStepDescription } from './components';

const StepSet = ({
  fullCourse,
  steps,
  width,
}: {
  fullCourse: FullCourseModel;
  steps: FullStep[];
  width: number;
}) => {
  const { changeStepState } = useCourse();

  const [extendedStep, setExtendedStep] = useState<StepModel['id'][]>([]);

  // TODO This function will handle the showing more steps when that case occurs
  const handleStepOnPress = (stepId: number) =>
    extendedStep.includes(stepId)
      ? setExtendedStep(prevState => prevState?.filter(el => el !== stepId))
      : setExtendedStep(prevState => [...prevState, stepId]);

  return steps.map(step => (
    <View flex key={step.details.id} width={width - sizes.s32} centerV>
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
        subSteps={step.subSteps?.length}
      />
      {extendedStep.includes(step.details.id) &&
        (!step.details.hasChild ? (
          <>
            <KStepDescription
              stepId={step.details.id}
              description={step.details.description}
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
        ) : (
          <View rightH>
            <KSpacer />
            <StepSet
              fullCourse={fullCourse}
              steps={step.subSteps}
              width={width - sizes.s32}
            />
          </View>
        ))}

      <KSpacer />
    </View>
  ));
};

export const CourseScreen = () => {
  const { params } = useRoute<RouteProp<AppStackParamList, 'CourseScreen'>>();
  const { goBack } = useNavigation();

  const { width } = useWindowDimensions();

  const { changeStepState, getCourseById, accessCourse } = useCourse();

  const [fullCourse, setFullCourse] = useState(params.fullCourse);

  useEffect(() => {
    accessCourse({ courseId: fullCourse.details.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCourseById(fullCourse.details.id).then(response => {
      if (!response) {
        goBack();
        return;
      }

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
        <StepSet
          fullCourse={fullCourse}
          steps={fullCourse.steps}
          width={width}
        />
      </View>
      <KSpacer h={sizes.s50} />
    </KContainer>
  );
};
