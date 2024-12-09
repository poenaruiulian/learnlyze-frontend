import { ViewStyle } from 'react-native';

export interface ViewStyleInterface {
  flex?: boolean;
  center?: boolean;
  centerH?: boolean;
  centerV?: boolean;
  leftH?: boolean;
  rightH?: boolean;
  topV?: boolean;
  bottomV?: boolean;
  top?: number;
  bottom?: number;
  padding?: number;
  paddingH?: number;
  paddingV?: number;
  paddingT?: number;
  paddingB?: number;
  paddingL?: number;
  paddingR?: number;
  marginH?: number;
  marginV?: number;
  marginT?: number;
  marginB?: number;
  marginL?: number;
  marginR?: number;
  height?: number | false | undefined;
  width?: number | false | undefined;
  row?: boolean;
  gap?: number;
  borderRadius?: number;
}

export const handleViewStyle = (
  props: ViewStyleInterface
): (false | undefined | ViewStyle)[] => [
  props.flex && { flex: 1 },
  props.center && { justifyContent: 'center', alignItems: 'center' },
  props.centerH && { alignItems: 'center' },
  props.centerV && { justifyContent: 'center' },
  props.leftH && { alignItems: 'flex-start' },
  props.rightH && { alignItems: 'flex-end' },
  props.topV && { justifyContent: 'flex-start' },
  props.bottomV && { justifyContent: 'flex-end' },
  props.top ? { paddingTop: props.top } : undefined,
  props.bottom ? { paddingBottom: props.bottom } : undefined,
  props.padding ? { padding: props.padding } : undefined,
  props.paddingH ? { paddingHorizontal: props.paddingH } : undefined,
  props.paddingV ? { paddingVertical: props.paddingV } : undefined,
  props.paddingT ? { paddingTop: props.paddingT } : undefined,
  props.paddingB ? { paddingBottom: props.paddingB } : undefined,
  props.paddingL ? { paddingLeft: props.paddingL } : undefined,
  props.paddingR ? { paddingRight: props.paddingR } : undefined,
  props.marginH ? { marginHorizontal: props.marginH } : undefined,
  props.marginV ? { marginVertical: props.marginV } : undefined,
  props.marginT ? { marginTop: props.marginT } : undefined,
  props.marginB ? { marginBottom: props.marginB } : undefined,
  props.marginL ? { marginLeft: props.marginL } : undefined,
  props.marginR ? { marginRight: props.marginR } : undefined,
  props.width ? { width: props.width } : undefined,
  props.height ? { height: props.height } : undefined,
  props.row && { flexDirection: 'row' },
  props.gap ? { gap: props.gap } : undefined,
  props.borderRadius ? { borderRadius: props.borderRadius } : undefined,
];
