import React from 'react';
import { Text } from 'react-native';
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
}
export const KText = ({ ...props }: TextProps) => (
  <Text
    style={[
      ...handleColor(props),
      ...handleFonts(props),
      ...handleTextStyle(props),
    ]}>
    {props.children}
  </Text>
);
