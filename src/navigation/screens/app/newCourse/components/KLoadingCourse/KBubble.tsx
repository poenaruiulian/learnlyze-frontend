import { colors, sizes } from '@constants';
import { useEffect, useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';
import { ImpactFeedbackStyle } from 'expo-haptics';
import { useRoot } from '@hooks';

type BubbleBoundaryType = {
  topLimit: number;
  bottomLimit: number;
  leftLimit: number;
  rightLimit: number;
};

export const KBubble = ({
  boundary,
  index,
  onPress,
}: {
  boundary: BubbleBoundaryType;
  index: number;
  onPress: () => void;
}) => {
  const { topLimit, bottomLimit, leftLimit, rightLimit } = boundary;
  const { impactAsync } = useRoot();

  const bubbleSize = sizes.s80;

  const [bubblePressed, setIsBubblePressed] = useState(false);
  const verticalModifier = useSharedValue(
    Math.floor(Math.random() * (bottomLimit - topLimit - bubbleSize))
  );
  const horizontalModifier = useSharedValue(
    Math.floor(Math.random() * (rightLimit - leftLimit - bubbleSize))
  );
  const scale = useSharedValue(1);

  useEffect(() => {
    const repositionBubble = () => {
      verticalModifier.value = withSpring(
        Math.floor(Math.random() * (bottomLimit - topLimit - bubbleSize))
      );
      horizontalModifier.value = withSpring(
        Math.floor(Math.random() * (rightLimit - leftLimit - bubbleSize))
      );
      scale.value = withTiming(1.5, { duration: 200 }, () => {
        scale.value = withTiming(1, { duration: 200 });
      });
    };

    if (bubblePressed) {
      repositionBubble();
      setTimeout(() => setIsBubblePressed(false), 100);
    }

    const interval = setInterval(
      () => {
        if (!bubblePressed) {
          repositionBubble();
        }
      },
      3000 + index * 2000
    );

    return () => clearInterval(interval); // Cleanup on unmount
  }, [
    bubblePressed,
    topLimit,
    bottomLimit,
    leftLimit,
    rightLimit,
    bubbleSize,
    index,
    scale,
    verticalModifier,
    horizontalModifier,
  ]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: horizontalModifier.value + leftLimit },
      { translateY: verticalModifier.value + topLimit },
      { scale: scale.value },
    ],
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          backgroundColor: colors.white80,
          borderRadius: bubbleSize / 2,
          height: bubbleSize,
          width: bubbleSize,
        },
        animatedStyle,
      ]}>
      <TouchableOpacity
        onPress={() =>
          impactAsync(ImpactFeedbackStyle.Medium).then(() => {
            setIsBubblePressed(true);
            onPress();
          })
        }
        style={{ flex: 1 }}
      />
    </Animated.View>
  );
};
