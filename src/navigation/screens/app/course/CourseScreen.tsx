import { View } from '@defaults';
import { RouteProp, useRoute } from '@react-navigation/native';
import { KContainer, KSpacer } from '@components';
import { useState } from 'react';
import { sizes, StepModel } from '@constants';
import { AppStackParamList } from '../../../type';
import { KStep, KStepDescription } from './components';

export const CourseScreen = () => {
  const {
    params: { fullCourse },
  } = useRoute<RouteProp<AppStackParamList, 'CourseScreen'>>();

  const [webViewHeights, setWebViewHeights] = useState<{
    [key: string]: number;
  }>({});
  const [extendedStep, setExtendedStep] = useState<StepModel['id'][]>([]);

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

  return (
    <KContainer noBackground isScrollable>
      <View flex center>
        {fullCourse.steps.map(step => (
          <View
            key={step.details.id}
            height={
              extendedStep.includes(step.details.id) &&
              webViewHeights[step.details.id]
            }>
            <KStep
              title={step.details.title}
              resources={step.resources.length}
              onPress={() => handleStepOnPress(step.details.id)}
              isFocused={extendedStep.includes(step.details.id)}
            />
            {extendedStep.includes(step.details.id) && (
              <KStepDescription
                stepId={step.details.id}
                description={step.details.description}
                handleMessage={handleMessage}
              />
            )}
            <KSpacer />
          </View>
        ))}
      </View>
      <KSpacer h={sizes.s50} />
    </KContainer>
  );
};
