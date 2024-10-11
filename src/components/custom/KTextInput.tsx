import { View, Text } from '@defaults';
import { TextInput, useWindowDimensions } from 'react-native';
import { useState } from 'react';
import { colors, fonts, sizes } from '@constants';
import { KSpacer } from './KSpacer';

type KTextInputProps = {
  placeholder: string;
  value: string;
  onSetValue: (newValue: string) => void;
  error?: string;
  isPassword?: boolean;
};

export const KTextInput = ({ ...props }: KTextInputProps) => {
  const [shouldShowError, setShouldShowError] = useState(false);
  const { width } = useWindowDimensions();

  return (
    <View width={width * 0.8}>
      <TextInput
        style={{
          backgroundColor: colors.balticSea75,
          paddingVertical: sizes.s15,
          paddingLeft: sizes.s10,
          borderRadius: sizes.s10,

          ...fonts.bodyM,
          ...fonts.bold,
          color: colors.white80,
        }}
        placeholderTextColor={colors.white50}
        placeholder={props.placeholder}
        value={props.value}
        onFocus={() => setShouldShowError(false)}
        onChangeText={text => {
          props.onSetValue(text);
          setShouldShowError(false);
        }}
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={() => setShouldShowError(true)}
        onBlur={() => setShouldShowError(true)}
        secureTextEntry={props.isPassword}
      />
      {props.error && shouldShowError && props.value.length > 0 && (
        <>
          <KSpacer h={5} />
          <Text body tulipTree style={{ paddingLeft: sizes.s10 }}>
            {props.error}
          </Text>
        </>
      )}
    </View>
  );
};
