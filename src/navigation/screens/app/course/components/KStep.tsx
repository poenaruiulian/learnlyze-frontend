import React, { useReducer } from 'react';
import { Button, Text, View } from '@defaults';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { colors, fonts, sizes, strings } from '@constants';
import { LinearGradient } from 'expo-linear-gradient';
import { KModal } from '@components';
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';

type KStepType = {
  title: string;
  resources: number;
  onPress: () => void;
  isFocused?: boolean;
};

export const KStep = ({ ...props }: KStepType) => {
  const { width } = useWindowDimensions();

  const [isModalVisible, toggleIsModalVisible] = useReducer(s => !s, false);

  const onLongPress = () => {
    impactAsync(ImpactFeedbackStyle.Heavy).then(toggleIsModalVisible);
  };

  const onPress = () =>
    impactAsync(ImpactFeedbackStyle.Light).then(() => {
      props.onPress();
    });

  const modalFunctions = {
    closeModal: () => {
      toggleIsModalVisible();
    },
    handleStepCompletion: () => {
      console.log("You've completed the step");
      impactAsync(ImpactFeedbackStyle.Soft);
    },
    handleFeedbackGiving: () => {
      console.log('You should give feedback');
      impactAsync(ImpactFeedbackStyle.Soft);
    },
  };

  const transform = {
    transform: [
      {
        translateX: -sizes.s50,
      },
    ],
  };

  return (
    <>
      <LinearGradient
        style={{
          width: width - sizes.s32,
          minHeight: sizes.s70,
          borderRadius: sizes.s10,
        }}
        colors={[colors.biscay80, colors.biscay]}>
        <TouchableOpacity
          style={{
            flexGrow: 1,
            alignItems: 'center',
            flexDirection: 'row',
            gap: sizes.s20,
          }}
          onLongPress={onLongPress}
          onPress={onPress}>
          <View
            width={sizes.s80}
            borderRadius={sizes.s90}
            style={{
              height: '100%',
              backgroundColor: colors.alto50,
              ...transform,
            }}
          />
          <View style={[transform]} paddingV={sizes.s10} flex>
            <Text
              bodyL
              semiBold
              white80={!(props.isFocused ?? false)}
              tulipTree={props.isFocused ?? false}>
              {props.title}
            </Text>
            <Text body semiBold white50>
              {`${props.resources} ${strings.course.step.resources}`}
            </Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
      <KModal
        closeModal={modalFunctions.closeModal}
        isModalVisible={isModalVisible}>
        <View gap={sizes.s10}>
          {[strings.course.step.complete, strings.course.step.feedback].map(
            (title, index) => (
              <Button
                key={title}
                title={title}
                onPress={() => {
                  if (index === 0) {
                    modalFunctions.handleStepCompletion();
                  } else {
                    modalFunctions.handleFeedbackGiving();
                  }
                  modalFunctions.closeModal();
                }}
                borderRadius={sizes.s20}
                width={width - sizes.s64}
                background={index === 0 ? colors.fruitSalad : null}
                titleStyle={{
                  ...fonts.bodyM,
                }}
              />
            )
          )}
        </View>
      </KModal>
    </>
  );
};
