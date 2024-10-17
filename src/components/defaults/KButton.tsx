import { TextStyle, TouchableOpacity } from 'react-native';
import { colors, handleViewStyle, sizes, ViewStyleInterface } from '@constants';
import { KText } from './KText';

interface KButtonProps extends ViewStyleInterface {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  titleStyle?: TextStyle;
}
export const KButton = ({ ...props }: KButtonProps) => (
  <TouchableOpacity
    style={[
      {
        backgroundColor: props.disabled ? colors.nevada : colors.tulipTree,
        paddingHorizontal: sizes.s50,
        paddingVertical: sizes.s15,
        borderRadius: sizes.s90,
        alignItems: 'center',
      },
      ...handleViewStyle(props),
    ]}
    {...props}
    onPress={props.onPress}
    disabled={props.disabled}>
    <KText bold bodyXL biscay style={props.titleStyle}>
      {props.title}
    </KText>
  </TouchableOpacity>
);
