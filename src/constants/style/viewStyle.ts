import { ViewStyle } from 'react-native';

export interface ViewStyleInterface {
  flex?: boolean;
  center?: boolean;
  centerH?: boolean;
  centerV?: boolean;
}

export const handleViewStyle = (props: ViewStyleInterface): ViewStyle[] => [
  props.flex && { flex: 1 },
  props.center && { justifyContent: 'center', alignItems: 'center' },
  props.centerH && { alignItems: 'center' },
  props.centerV && { justifyContent: 'center' },
];
