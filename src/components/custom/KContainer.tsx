import React from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, sizes } from '@constants';
import { ImageSource } from 'react-native-vector-icons/Icon';
import { images } from '@images';
import { View } from '@defaults';

type KContainerProps = {
  children: React.ReactNode;
  backgroundImage?: ImageSource;
  isScrollable?: boolean;
  noBackground?: boolean;
  backgroundColor?: string;
  hasTopInsets?: boolean;
};

export const KContainer = ({
  children,
  isScrollable = true,
  backgroundImage = images.generalBackground,
  noBackground = false,
  backgroundColor = colors.bunker,
  hasTopInsets = true,
}: KContainerProps) => {
  const { top, bottom } = useSafeAreaInsets();

  const paddingTop = hasTopInsets ? Math.max(top + sizes.s20, sizes.s20) : 0;
  const paddingBottom = hasTopInsets
    ? Math.max(bottom + sizes.s20, sizes.s20)
    : 0;

  return (
    <ImageBackground
      source={!noBackground ? backgroundImage : null}
      style={[
        {
          flex: 1,
        },
        noBackground && { backgroundColor },
        backgroundColor && { backgroundColor },
      ]}
      resizeMode="cover">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {isScrollable && (
          <ScrollView
            style={{
              flex: 1,
              paddingTop,
            }}>
            {children}
          </ScrollView>
        )}
        {!isScrollable && (
          <View flex top={paddingTop} bottom={paddingBottom}>
            {children}
          </View>
        )}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
