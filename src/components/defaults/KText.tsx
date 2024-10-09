import React from 'react';
import { Text, TextStyle } from 'react-native';
import {
  ColorInterface,
  handleColor,
  FontsInterface,
  handleFonts,
  TextStyleInterface,
  handleTextStyle,
} from '@constants';

export interface TextProps
  extends ColorInterface,
    FontsInterface,
    TextStyleInterface {
  children: string | null | undefined;
  style?: TextStyle;
}
export const KText = ({ ...props }: TextProps) => (
  <Text
    style={[
      ...handleColor(props),
      ...handleFonts(props),
      ...handleTextStyle(props),
      props.style,
    ]}>
    {props.children}
  </Text>
);
