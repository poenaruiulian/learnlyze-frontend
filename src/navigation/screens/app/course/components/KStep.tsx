import React, { useReducer, useState } from 'react';
import { Button, Text, View } from '@defaults';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { colors, fonts, sizes, strings } from '@constants';
import { LinearGradient } from 'expo-linear-gradient';
import { KModal, KSpacer, KTextInput } from '@components';
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';
import { useRoot, useStep } from '@hooks';

type KStepType = {
  stepId: number;
  title: string;
  resources: number;
  subSteps?: number;
  onPress: () => void;
  isFocused?: boolean;
  isCompleted: boolean;
  handleStepState: () => void;
};

export const KStep = ({ ...props }: KStepType) => {
  const [isModalVisible, toggleIsModalVisible] = useReducer(s => !s, false);
  const [givingFeedback, setGivingFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');

  const { breakStep } = useStep();
  const { setIsLoading } = useRoot();

  const { width } = useWindowDimensions();

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
    handleStepState: () => {
      props.handleStepState();
      impactAsync(ImpactFeedbackStyle.Soft).then(modalFunctions.closeModal);
    },
    handleFeedbackGiving: () =>
      impactAsync(ImpactFeedbackStyle.Soft).then(() => setGivingFeedback(true)),
  };

  const handleSubSteps = async () => {
    setIsLoading(true);
    toggleIsModalVisible();
    setGivingFeedback(false);
    await breakStep({ stepId: props.stepId, feedback })
      .then(() => {
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
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
              backgroundColor: props.isCompleted
                ? colors.tulipTree60
                : colors.alto50,
              ...transform,
            }}
          />
          <View style={[transform]} paddingV={sizes.s10} flex>
            <Text
              bodyL
              semiBold
              white80={!props.isCompleted && !(props.isFocused ?? false)}
              tulipTree={!props.isCompleted && (props.isFocused ?? false)}
              tulipTree60={props.isCompleted}
              style={
                props.isCompleted && {
                  textDecorationLine: 'line-through',
                  textDecorationColor: colors.tulipTree60,
                }
              }>
              {props.title}
            </Text>
            {!props.subSteps ? (
              <Text body semiBold white50>
                {`${props.resources} ${strings.course.step.resources}`}
              </Text>
            ) : (
              <Text body semiBold white50>
                {`${props.subSteps} ${strings.course.step.subSteps}`}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </LinearGradient>
      <KModal
        closeModal={modalFunctions.closeModal}
        isModalVisible={isModalVisible}>
        <View gap={sizes.s10} width={width - sizes.s64}>
          {givingFeedback ? (
            <View centerH>
              <KTextInput
                placeholder="Give your feedback towards this step"
                value={feedback}
                onSetValue={setFeedback}
                multiline
                style={{
                  height: sizes.s90 * 2,
                  width: '100%',
                }}
              />
              <KSpacer />
              <Button
                title="Create sub-steps"
                onPress={handleSubSteps}
                borderRadius={sizes.s10}
                titleStyle={{ ...fonts.bodyM }}
              />
            </View>
          ) : (
            [
              props.isCompleted
                ? strings.course.step.uncomplete
                : strings.course.step.complete,
              strings.course.step.feedback,
            ].map((title, index) => (
              <Button
                key={title}
                title={title}
                onPress={() => {
                  if (index === 0) {
                    modalFunctions.handleStepState();
                  } else {
                    modalFunctions.handleFeedbackGiving();
                  }
                }}
                borderRadius={sizes.s20}
                background={
                  index === 0
                    ? props.isCompleted
                      ? colors.nevada
                      : colors.fruitSalad
                    : null
                }
                titleStyle={{
                  ...fonts.bodyM,
                }}
              />
            ))
          )}
        </View>
      </KModal>
    </>
  );
};
