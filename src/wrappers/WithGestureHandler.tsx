import { FC, ReactNode } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const WithGestureHandler: FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    {children}
  </GestureHandlerRootView>
);
