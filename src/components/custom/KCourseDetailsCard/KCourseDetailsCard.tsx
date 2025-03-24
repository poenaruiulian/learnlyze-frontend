import { View, Text } from '@defaults';
import { KCourseDetailsCardBackground } from './KCourseDetailsCardBackground';

type KCourseDetailsCardType = {
  value: number;
  description: string;
  width?: number;
};

export const KCourseDetailsCard = ({
  value,
  description,
  width,
}: KCourseDetailsCardType) => (
  <View center>
    <KCourseDetailsCardBackground width={width ?? 194} />
    <View center style={{ position: 'absolute' }} width={width ?? 194}>
      <Text headingL tulipTree semiBold>
        {value.toString()}
      </Text>
      <Text body white80 regular center>
        {description}
      </Text>
    </View>
  </View>
);
