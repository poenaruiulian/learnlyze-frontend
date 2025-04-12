import { KSpacer } from '@components';
import { colors, sizes, strings } from '@constants';
import { Text, View } from '@defaults';
import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { KBubble } from './KBubble';

export const KLoadingCourse = () => {
  const { width, height } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();

  const [score, setScore] = useState(0);

  const boundary = {
    topLimit: top + sizes.s16,
    bottomLimit: height - bottom - sizes.s16,
    leftLimit: sizes.s16,
    rightLimit: width - sizes.s16,
  };

  const bubbles = Array.from({ length: 10 }, (_, index) => (
    <KBubble
      key={index}
      boundary={boundary}
      index={index}
      onPress={() => setScore(prevState => prevState + 1)}
    />
  ));

  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: colors.biscay,
      }}
      paddingT={top}
      width={width}
      height={height}>
      {bubbles}
      <Text
        center
        semiBold
        bodyL
        eastBay
        style={{ paddingHorizontal: sizes.s20 }}>
        {strings.loading.message}
      </Text>
      <KSpacer />
      <Text center semiBold bodyXL alto>
        {score.toString()}
      </Text>
    </View>
  );
};
