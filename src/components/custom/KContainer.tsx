import React from 'react';
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, sizes } from '@constants';
import { ImageSource } from 'react-native-vector-icons/Icon';
import { images } from '@images';

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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            scrollEnabled={isScrollable}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="on-drag"
            contentContainerStyle={{
              flexGrow: 1,
              paddingTop,
              paddingBottom,
            }}>
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};
