import {
  ColorInterface,
  FontsInterface,
  handleColor,
  handleFonts,
  handleTextStyle,
  TextStyleInterface,
} from '@constants';
import React from 'react';
import { Text, TextStyle } from 'react-native';

export interface TextProps
  extends ColorInterface,
    FontsInterface,
    TextStyleInterface {
  children: string | string[] | null | undefined;
  style?: false | TextStyle;
  numberOfLines?: number;
  ellipsizeMode?: 'middle' | 'head' | 'tail' | 'clip';
}
export const KText = ({ ...props }: TextProps) => (
  <Text
    style={[
      ...handleColor(props),
      ...handleFonts(props),
      ...handleTextStyle(props),
      props.style,
    ]}
    numberOfLines={props.numberOfLines ?? 0}
    ellipsizeMode={props.ellipsizeMode}>
    {props.children}
  </Text>
);
