import Modal from 'react-native-modal';
import { colors, fonts, sizes, strings } from '@constants';
import { Button, Text, View } from '@defaults';
import { KSpacer } from '@components';
import React from 'react';

type KModalProps = {
  message?: string;
  description?: string;
  closeModal: () => void;
  isModalVisible: boolean;
  children?: React.ReactNode;
};

export const KModal = ({ ...props }: KModalProps) => (
  <Modal
    isVisible={props.isModalVisible}
    onBackdropPress={props.closeModal}
    style={{ justifyContent: 'flex-end', bottom: sizes.s20 }}>
    <View
      style={{
        backgroundColor: colors.eastBay,
      }}
      bottomV
      centerH
      padding={sizes.s20}
      borderRadius={sizes.s10}>
      {!(props.children ?? false) && (
        <>
          <KSpacer />
          <Text
            heading
            center
            semiBold
            white
            style={{ paddingHorizontal: sizes.s10 }}>
            {props?.message}
          </Text>
          <KSpacer />
          <Text bodyM center white80 style={{ paddingHorizontal: sizes.s20 }}>
            {props?.description}
          </Text>
          <KSpacer h={sizes.s30} />
          <Button
            title={strings.modal.closeButton}
            onPress={props.closeModal}
            titleStyle={{
              ...fonts.semiBold,
              ...fonts.bodyL,
              color: colors.eastBay,
            }}
          />
        </>
      )}
      {props.children}
    </View>
  </Modal>
);
