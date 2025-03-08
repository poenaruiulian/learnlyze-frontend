import { KModal, KSpacer } from '@components';
import { Button, View, Text } from '@defaults';
import { colors, fonts, sizes, strings } from '@constants';
import React from 'react';
import { useWindowDimensions } from 'react-native';

type KPublishCourseModalProps = {
  courseId: number;
  isVisible: boolean;
  onClose: () => void;
  onComplete?: () => void;
  onPublish?: () => void;
};

export const KPublishCourseModal = ({ ...props }: KPublishCourseModalProps) => {
  const { width } = useWindowDimensions();

  return (
    <KModal closeModal={props.onClose} isModalVisible={props.isVisible}>
      <View gap={sizes.s10} width={width - sizes.s64}>
        <Text bodyL white center semiBold>
          {strings.course.modal.description}
        </Text>
        <KSpacer />
        {props.onComplete && (
          <>
            <Button
              title={strings.course.modal.complete}
              onPress={props.onComplete}
              borderRadius={sizes.s20}
              titleStyle={{
                ...fonts.bodyM,
              }}
            />
            <Text bodyXS white50 center light>
              {strings.course.modal.completeDescription}
            </Text>
          </>
        )}
        {props.onPublish && (
          <>
            <Button
              title={strings.course.modal.publish}
              onPress={props.onPublish}
              borderRadius={sizes.s20}
              background={colors.fruitSalad}
              titleStyle={{
                ...fonts.bodyM,
              }}
            />
            <Text bodyXS white50 center light>
              {strings.course.modal.publishDescription}
            </Text>
          </>
        )}
      </View>
    </KModal>
  );
};
