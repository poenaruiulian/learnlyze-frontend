import { KModal, KSpacer } from '@components';
import { Button, View, Text } from '@defaults';
import { colors, fonts, sizes } from '@constants';
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
          🥳 Congrats on finishing the course! Next steps:
        </Text>
        <KSpacer />
        {props.onComplete && (
          <>
            <Text bodyXS white50 center light>
              By completing the course you will still have access to the
              information, but the course will be un-changeable.
            </Text>
            <Button
              title="Complete course"
              onPress={props.onComplete}
              borderRadius={sizes.s20}
              titleStyle={{
                ...fonts.bodyM,
              }}
            />
          </>
        )}
        {props.onPublish && (
          <>
            <Text bodyXS white50 center light>
              By publishing the course you will share this knowledge to the
              community. The course will be automatically completed and
              un-changeable.
            </Text>
            <Button
              title="Publish course"
              onPress={props.onPublish}
              borderRadius={sizes.s20}
              background={colors.fruitSalad}
              titleStyle={{
                ...fonts.bodyM,
              }}
            />
          </>
        )}
      </View>
    </KModal>
  );
};
