import { View, ViewStyle } from 'react-native';

export const KSpacer = ({
  h: height = 10,
  w: width = 10,
  style,
}: {
  h?: number;
  w?: number;
  style?: ViewStyle;
}) => <View style={[{ height, width }, style]} />;
