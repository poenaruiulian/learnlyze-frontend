import { View, Text } from '@defaults';
import { TextInput, useWindowDimensions } from 'react-native';
import { Ref, useState } from 'react';
import { colors, fonts, sizes } from '@constants';
import { KSpacer } from './KSpacer';

type KTextInputProps = {
  placeholder: string;
  value: string;
  onSetValue: (newValue: string) => void;
  onSubmitEditing?: () => void;
  error?: string;
  isPassword?: boolean;
  autoCapitalize?: boolean;
  innerRef?: Ref<TextInput>;
  returnKey?: 'done' | 'next';
};

export const KTextInput = ({ ...props }: KTextInputProps) => {
  const [shouldShowError, setShouldShowError] = useState(false);
  const { width } = useWindowDimensions();

  return (
    <View width={width * 0.8} borderRadius={sizes.s10}>
      <TextInput
        ref={props.innerRef}
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
        autoCapitalize={props.autoCapitalize ? 'words' : 'none'}
        autoCorrect={false}
        onSubmitEditing={() => {
          setShouldShowError(true);
          props.onSubmitEditing?.();
        }}
        onBlur={() => setShouldShowError(true)}
        secureTextEntry={props.isPassword}
        returnKeyType={props.returnKey}
        returnKeyLabel={props.returnKey}
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
