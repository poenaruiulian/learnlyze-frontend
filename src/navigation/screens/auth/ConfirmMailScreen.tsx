import { View } from '@defaults';
import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Button, TextInput } from 'react-native';
import { useRoot } from '@hooks';
import { ConfirmMailScreenRouteType } from '../../type';

export const ConfirmMailScreen = () => {
  const [inputCode, setInputCode] = useState('');

  const { register } = useRoot();

  const { params } = useRoute<ConfirmMailScreenRouteType>();

  return (
    <View flex center>
      <TextInput onChangeText={setInputCode} placeholder="Code" />
      <Button
        title="Register"
        onPress={() => {
          if (inputCode === params.code) {
            register(params.registerDto);
          }
        }}
      />
    </View>
  );
};
