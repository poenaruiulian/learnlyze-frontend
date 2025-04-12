import { colors, icons, sizes } from '@constants';
import { Icon } from '@defaults';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { AppNavigationType } from '../../navigation/type';

export const KBackButton = () => {
  const { canGoBack, goBack } = useNavigation<AppNavigationType>();

  return (
    canGoBack() && (
      <TouchableOpacity
        style={{
          height: sizes.s32,
          width: sizes.s32,
          borderRadius: sizes.s90,
          backgroundColor: colors.nevada,
          borderColor: colors.tundora60,
          borderWidth: 2,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 16,
        }}
        onPress={goBack}>
        <Icon icon={icons.arrowLeft} color={colors.tundora80} />
      </TouchableOpacity>
    )
  );
};
