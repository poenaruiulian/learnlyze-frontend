import { Text, View } from '@defaults';
import { RouteProp, useRoute } from '@react-navigation/native';
import { KContainer, KSpacer } from '@components';
import { Fragment } from 'react';
import { AppStackParamList } from '../../../type';
import { KStep } from './components';

export const CourseScreen = () => {
  const {
    params: { fullCourse },
  } = useRoute<RouteProp<AppStackParamList, 'CourseScreen'>>();

  return (
    <KContainer noBackground>
      <View flex center>
        <Text bodyL semiBold white>
          {fullCourse.details?.title}
        </Text>
        {fullCourse.steps.map(step => (
          <Fragment key={step.details.id}>
            <KStep
              title={step.details.title}
              resources={step.resources.length}
            />
            <KSpacer />
          </Fragment>
        ))}
      </View>
    </KContainer>
  );
};
