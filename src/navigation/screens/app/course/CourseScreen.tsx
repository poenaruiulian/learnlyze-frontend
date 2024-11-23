import { Text, View } from '@defaults';
import { RouteProp, useRoute } from '@react-navigation/native';
import { KContainer, KSpacer } from '@components';
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
        <KSpacer />
        <KStep title="Variables and their type" />
        <KSpacer />
        <KStep title="Basic operations and how to use them" />
        <KSpacer />
        <KStep title="Loops and how to not use them" />
      </View>
    </KContainer>
  );
};
