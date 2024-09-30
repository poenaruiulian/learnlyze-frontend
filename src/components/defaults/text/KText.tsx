import React from 'react';
import { Text } from 'react-native';
import { ColorInterface, handleColor , FontsInterface, handleFonts } from '@constants';

export interface TextProps extends ColorInterface, FontsInterface {
  children: string;
}
export const KText = ({ ...props }: TextProps) => (
  <Text style={[...handleColor(props), ...handleFonts(props)]}>
    {props.children}
  </Text>
);
