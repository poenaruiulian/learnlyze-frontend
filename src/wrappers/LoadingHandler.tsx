import { ReactNode } from 'react';
import { View } from '@defaults';
import { useRoot } from '@hooks';
import { ActivityIndicator, useWindowDimensions } from 'react-native';
import { colors } from '@constants';

export const LoadingHandler = ({ children }: { children: ReactNode }) => {
  const { isLoading } = useRoot();

  const { height, width } = useWindowDimensions();

  return (
    <View flex>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color={colors.tulipTree}
          style={{
            flex: 1,
            backgroundColor: colors.bunker80,
            position: 'absolute',
            height,
            width,
            zIndex: 1,
          }}
        />
      )}
      {children}
    </View>
  );
};
