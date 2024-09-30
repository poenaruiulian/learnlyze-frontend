import { View } from 'react-native';
import React from 'react';
import { handleViewStyle, ViewStyleInterface } from '@constants';

export interface KViewProps extends ViewStyleInterface {
  children: React.ReactNode;
}
export const KView = ({ ...props }: KViewProps) => (
  <View style={[...handleViewStyle(props)]}>{props.children}</View>
);
