import { TextStyle, TouchableOpacity } from 'react-native';
import { colors, handleViewStyle, sizes, ViewStyleInterface } from '@constants';
import { KText } from './KText';

interface KButtonProps extends ViewStyleInterface {
  title: string;
  onPress: () => void;
  titleStyle?: TextStyle;
}
export const KButton = ({ ...props }: KButtonProps) => (
  <TouchableOpacity
    style={[
      {
        backgroundColor: colors.tulipTree,
        paddingHorizontal: sizes.s60,
        paddingVertical: sizes.s15,
        borderRadius: sizes.s90,
      },
      ...handleViewStyle(props),
    ]}
    {...props}
    onPress={props.onPress}>
    <KText bold bodyXL biscay style={props.titleStyle}>
      {props.title}
    </KText>
  </TouchableOpacity>
);
