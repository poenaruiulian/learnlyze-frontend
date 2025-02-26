import { Button, Text, View } from '@defaults';
import React, { useCallback, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { useRoot } from '@hooks';
import { KContainer, KSpacer } from '@components';
import { colors, sizes, strings } from '@constants';
import { OtpInput } from 'react-native-otp-entry';
import {
  impactAsync,
  ImpactFeedbackStyle,
  notificationAsync,
  NotificationFeedbackType,
} from 'expo-haptics';
import { ConfirmMailScreenRouteType } from '../../type';

export const ConfirmMailScreen = () => {
  const { register, setIsNewUser } = useRoot();
  const { width } = useWindowDimensions();
  const { params } = useRoute<ConfirmMailScreenRouteType>();

  const [inputCode, setInputCode] = useState('');
  const [shouldShowError, setShouldShowError] = useState(false);

  const handleRegister = useCallback(() => {
    if (inputCode === params.code) {
      impactAsync(ImpactFeedbackStyle.Medium).then(() =>
        register(params.registerDto).then(() => setIsNewUser(true))
      );
    } else {
      notificationAsync(NotificationFeedbackType.Error).then(() =>
        setShouldShowError(true)
      );
    }
  }, [inputCode, params.code, params.registerDto, register, setIsNewUser]);

  return (
    <KContainer isScrollable={false}>
      <View flex bottomV paddingH={sizes.s60} height={width * 0.5}>
        <KSpacer h={30} />
        <Text
          headingXL
          center
          semiBold
          white80
          style={{ lineHeight: sizes.s48 }}>
          {strings.auth.confirmMail.title}
        </Text>
        <KSpacer />
        <Text bodyM center semiBold white50>
          {strings.auth.confirmMail.description}
        </Text>
      </View>
      <View flex height={width * 0.5}>
        <KSpacer h={sizes.s60} />
        <View paddingH={sizes.s40}>
          <OtpInput
            onTextChange={text => {
              setInputCode(text);
              setShouldShowError(false);
            }}
            numberOfDigits={6}
            focusColor={colors.white80}
            type="numeric"
            theme={{
              pinCodeContainerStyle: {
                backgroundColor: colors.biscay60,
                borderColor: colors.biscay60,
                width: sizes.s50,
                height: sizes.s50,
              },
              pinCodeTextStyle: {
                color: colors.white80,
              },
              focusStickStyle: {},
              focusedPinCodeContainerStyle: {},
            }}
          />
          {shouldShowError && (
            <>
              <KSpacer />
              <Text
                body
                tulipTree
                center
                style={{ paddingHorizontal: sizes.s10 }}>
                {strings.auth.confirmMail.error}
              </Text>
            </>
          )}
        </View>
        <KSpacer h={sizes.s40} />
        <View paddingH={width / 4.5}>
          <Button
            title={strings.auth.register.title}
            onPress={handleRegister}
            titleStyle={{ color: colors.white80 }}
            disabled={inputCode.length !== 6}
          />
        </View>
      </View>
    </KContainer>
  );
};
