import { Pressable, useWindowDimensions } from 'react-native';
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

  return (
    <View width={width} center>
      <View
        row
        gap={sizes.s20}
        borderRadius={sizes.s90}
        padding={3}
        style={{
          position: 'absolute',
          bottom: Math.max(bottom + sizes.s20, sizes.s20),
          backgroundColor: colors.tundora,
        }}>
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
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              onPress={onPress}
              style={{
                backgroundColor: isFocused ? colors.nevada : colors.transparent,
                borderRadius: sizes.s90,
                height: sizes.s60,
                width: sizes.s60,
              }}>
              <View flex center padding={sizes.s15}>
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
