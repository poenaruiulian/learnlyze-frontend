import { handleViewStyle, ViewStyleInterface } from '@constants';
import React from 'react';
import { View, ViewProps } from 'react-native';

export interface KViewProps extends ViewStyleInterface, ViewProps {
  children?: React.ReactNode;
}
export const KView = ({ ...props }: KViewProps) => (
  <View style={[...handleViewStyle(props), props.style]}>{props.children}</View>
);
