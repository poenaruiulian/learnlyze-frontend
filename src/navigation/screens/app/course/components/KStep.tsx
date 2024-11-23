import React, { useReducer } from 'react';
import { Button, Text, View } from '@defaults';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { colors, fonts, sizes } from '@constants';
import { LinearGradient } from 'expo-linear-gradient';
import { KModal } from '@components';

type KStepType = {
  title: string;
};

export const KStep = ({ ...props }: KStepType) => {
  const { width } = useWindowDimensions();

  const [isModalVisible, toggleIsModalVisible] = useReducer(s => !s, false);

  const onLongPress = () => {
    toggleIsModalVisible();
  };

  const closeModal = () => {
    toggleIsModalVisible();
  };

  const transform = {
    transform: [
      {
        translateX: -sizes.s30,
      },
    ],
  };

  return (
    <>
      <LinearGradient
        style={{
          width: width - 32,
          minHeight: sizes.s70,
          borderRadius: sizes.s10,
        }}
        colors={[colors.biscay80, colors.biscay]}>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            gap: sizes.s10,
          }}
          onLongPress={onLongPress}
          onPress={() => alert('Press')}>
          <View
            width={sizes.s80}
            borderRadius={sizes.s90}
            style={{
              height: '100%',
              backgroundColor: colors.alto50,
              ...transform,
            }}
          />
          <View style={transform} marginV={sizes.s20} flex>
            <Text bodyL semiBold white80>
              {props.title}
            </Text>
            <Text body semiBold white50>
              4 resources
            </Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
      <KModal closeModal={closeModal} isModalVisible={isModalVisible}>
        <View gap={sizes.s10}>
          {['Complete step', 'Give feedback'].map((title, index) => (
            <Button
              key={title}
              title={title}
              onPress={() => {
                if (index) {
                  console.log("You've completed the step");
                } else {
                  console.log('You should give feedback');
                }
                closeModal();
              }}
              borderRadius={sizes.s20}
              width={width - sizes.s64}
              background={index ? colors.fruitSalad : null}
              titleStyle={{
                ...fonts.bodyM,
              }}
            />
          ))}
        </View>
      </KModal>
    </>
  );
};
