import React, { useEffect } from 'react';
import { Pressable, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, sizes } from '@constants';
import { View } from '@defaults';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { TabBarIcon } from './TabBarIcon';

export const TabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const tabWidth = sizes.s60 + sizes.s20;
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(state.index * tabWidth, {
      duration: 300,
    });
  }, [state.index, tabWidth, translateX]);

  return (
    <View width={width} center>
      <View
        row
        gap={sizes.s20}
        borderRadius={sizes.s90}
        style={{
          position: 'absolute',
          bottom: Math.max(bottom + sizes.s10, sizes.s10),
          backgroundColor: colors.tundora,
        }}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              height: sizes.s60,
              width: sizes.s60,
              backgroundColor: colors.nevada,
              borderRadius: sizes.s90,
              borderColor: colors.tundora,
              borderWidth: 3,
            },
            useAnimatedStyle(() => ({
              transform: [{ translateX: translateX.value }],
            })),
          ]}
        />
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={{
                borderRadius: sizes.s90,
                height: sizes.s60,
                width: sizes.s60,
              }}>
              <View
                flex
                center
                style={{
                  height: sizes.s60,
                  width: sizes.s60,
                  borderRadius: sizes.s90,
                  backgroundColor: colors.transparent,
                }}>
                <TabBarIcon
                  label={options.tabBarLabel ?? options.title ?? route.name}
                />
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
