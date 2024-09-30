export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  red: '#ff0000',
};

export interface ColorInterface {
  white?: boolean;
  black?: boolean;
  red?: boolean;
}

export const handleColor = (props: ColorInterface) => [
  props.white && { color: colors.white },
  props.black && { color: colors.black },
  props.red && { color: colors.red },
];
