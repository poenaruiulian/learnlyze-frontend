import React from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { sizes } from '@constants';
import { ImageSource } from 'react-native-vector-icons/Icon';
import { images } from '@images';
import { View } from '@defaults';

type KContainerProps = {
  children: React.ReactNode;
  backgroundImage?: ImageSource;
  isScrollable?: boolean;
};

export const KContainer = ({
  children,
  isScrollable = true,
  backgroundImage = images.generalBackground,
}: KContainerProps) => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <ImageBackground
      source={backgroundImage}
      style={{
        flex: 1,
      }}
      resizeMode="cover">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {isScrollable && (
          <ScrollView
            style={{
              flexGrow: 1,
              paddingTop: Math.max(top + sizes.s20, sizes.s20),
            }}>
            {children}
          </ScrollView>
        )}
        {!isScrollable && (
          <View
            flex
            top={Math.max(top + sizes.s20, sizes.s20)}
            bottom={Math.max(bottom + sizes.s20, sizes.s20)}>
            {children}
          </View>
        )}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
