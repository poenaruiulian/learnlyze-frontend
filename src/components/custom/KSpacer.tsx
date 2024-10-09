import { View } from 'react-native';

export const KSpacer = ({ h: height = 10 }: { h?: number }) => (
  <View style={{ height }} />
);
