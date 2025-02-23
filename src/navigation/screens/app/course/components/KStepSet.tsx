import { FullCourseModel, FullStep, sizes, StepModel } from '@constants';
import { useCourse, useStep } from '@hooks';
import { useEffect, useState } from 'react';
import { View } from '@defaults';
import { KSpacer } from '@components';
import { KStep } from './KStep';
import { KStepDescription } from './KStepDescription';
import { KResource } from './KResource';

export const KStepSet = ({
  fullCourse,
  steps,
  width,
}: {
  fullCourse: FullCourseModel;
  steps: FullStep[];
  width: number;
}) => {
  const { accessCourse } = useCourse();
  const { changeStepState } = useStep();

  const [extendedStep, setExtendedStep] = useState<StepModel['id'][]>([]);

  useEffect(() => {
    accessCourse({ courseId: fullCourse.details.id });
  }, [accessCourse, fullCourse.details.id]);

  const handleStepOnPress = (stepId: number) =>
    extendedStep.includes(stepId)
      ? setExtendedStep(prevState => prevState?.filter(el => el !== stepId))
      : setExtendedStep(prevState => [...prevState, stepId]);

  return steps
    .sort((s1, s2) => s1.details.priority - s2.details.priority)
    .map(step => (
      <View flex key={step.details.id} width={width - sizes.s32} centerV>
        <KStep
          stepId={step.details.id}
          title={step.details.title}
          resources={step.resources.length}
          onPress={() => handleStepOnPress(step.details.id)}
          isFocused={extendedStep.includes(step.details.id)}
          isCompleted={step.details.completed && !fullCourse.details.completed}
          handleStepState={() =>
            changeStepState({
              courseId: fullCourse.details.id,
              stepId: step.details.id,
            })
          }
          subSteps={step.subSteps?.length}
          isCourseCompleted={fullCourse.details.completed}
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
                    stepId={step.details.id}
                    {...resource}
                  />
                ))}
              </View>
            </>
          ) : (
            <View rightH>
              <KSpacer />
              <KStepSet
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
