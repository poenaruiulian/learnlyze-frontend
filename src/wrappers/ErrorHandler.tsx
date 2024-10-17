import React, { useEffect, useReducer } from 'react';
import { useRoot } from '@hooks';
import Modal from 'react-native-modal';
import { Button, Text, View } from '@defaults';
import { colors, ErrorCodes, fonts, sizes, strings } from '@constants';
import { KSpacer } from '@components';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationType } from '../navigation/type';

export const ErrorHandler = ({ children }: { children: React.ReactNode }) => {
  const { hasError, setHasError, error, setError } = useRoot();
  const { goBack } = useNavigation<AuthNavigationType>();

  const [isModalVisible, toggleModalVisible] = useReducer(s => !s, false);

  useEffect(() => {
    if (hasError) {
      setHasError(false);
      setError(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => error && toggleModalVisible(), 500);

    return () => clearTimeout(timer);
  }, [error]);

  const closeModal = () => {
    toggleModalVisible();

    switch (error?.code) {
      case ErrorCodes.emailAlreadyInUse:
        goBack();
        break;
      default:
        break;
    }

    setHasError(false);
    setError(null);
  };

  return (
    <>
      {children}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        style={{ justifyContent: 'flex-end', bottom: sizes.s20 }}>
        <View
          style={{
            backgroundColor: colors.eastBay,
          }}
          bottomV
          centerH
          padding={sizes.s20}
          borderRadius={sizes.s10}>
          <KSpacer />
          <Text
            heading
            center
            semiBold
            white
            style={{ paddingHorizontal: sizes.s10 }}>
            {error?.message}
          </Text>
          <KSpacer />
          <Text bodyM center white80 style={{ paddingHorizontal: sizes.s20 }}>
            {error?.description}
          </Text>
          <KSpacer h={sizes.s30} />
          <Button
            title={strings.errorModal.closeButton}
            onPress={closeModal}
            titleStyle={{
              ...fonts.semiBold,
              ...fonts.bodyL,
              color: colors.eastBay,
            }}
          />
        </View>
      </Modal>
    </>
  );
};
