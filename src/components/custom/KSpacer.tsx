import { View } from 'react-native';

export const KSpacer = ({
  h: height = 10,
  w: width = 10,
}: {
  h?: number;
  w?: number;
}) => <View style={{ height, width }} />;
