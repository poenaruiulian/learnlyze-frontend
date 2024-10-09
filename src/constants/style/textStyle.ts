import { TextStyle } from 'react-native';

export interface TextStyleInterface {
  center?: boolean;
}

export const handleTextStyle = (
  props: TextStyleInterface
): (false | undefined | TextStyle)[] => [
  props.center && { textAlign: 'center' },
];
