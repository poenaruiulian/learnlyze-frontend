import { colors, sizes } from '@constants';
import { Text } from '@defaults';
import { TouchableOpacity } from 'react-native';

type TagProps = {
  name: string;
  onTagPress: (value: string) => void;
  isSelected: boolean;
};

export const KTag = ({ ...props }: TagProps) => (
  <TouchableOpacity
    onPress={() => props.onTagPress(props.name)}
    style={{
      paddingHorizontal: sizes.s10,
      paddingVertical: 5,
      backgroundColor: props.isSelected ? colors.white80 : colors.tundora,
      borderRadius: sizes.s10,
    }}>
    <Text
      white80={!props.isSelected}
      persianGreen={props.isSelected}
      body
      semiBold>
      {props.name[0].toUpperCase() + props.name.slice(1)}
    </Text>
  </TouchableOpacity>
);
