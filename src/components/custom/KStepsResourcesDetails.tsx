import { sizes } from '@constants';
import { View } from '@defaults';
import { useWindowDimensions } from 'react-native';

import { KCourseDetailsCard } from './KCourseDetailsCard';

export const KStepsResourcesDetails = ({
  steps,
  resources,
}: {
  steps: number;
  resources: number;
}) => {
  const { width } = useWindowDimensions();
  const detailsWidth = (width - sizes.s20) / 2 - 5;

  return (
    <View row spread paddingH={sizes.s10} style={{ width }}>
      <KCourseDetailsCard
        width={detailsWidth}
        value={steps}
        description="total steps"
      />
      <KCourseDetailsCard
        width={detailsWidth}
        value={resources}
        description="total resources"
      />
    </View>
  );
};
