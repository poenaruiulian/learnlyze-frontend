import { Icon, View } from '@defaults';
import { TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { colors, fonts, icons, sizes } from '@constants';

type KTextInput = {
  onGenerateCourse: (value: string) => void;
};
export const KTextInput = ({ ...props }: KTextInput) => {
  const [newCourseDescription, setNewCourseDescription] = useState<string>('');
  const [textInputHeight, setTextInputHeight] = useState<number>(sizes.s32);

  return (
    <View row gap={sizes.s10} bottomV centerH marginH={sizes.s16}>
      <TextInput
        value={newCourseDescription}
        onChangeText={setNewCourseDescription}
        placeholderTextColor={colors.nevada}
        numberOfLines={0}
        multiline
        onContentSizeChange={e =>
          setTextInputHeight(e.nativeEvent.contentSize.height)
        }
        style={{
          backgroundColor: colors.tundora80,
          borderRadius: textInputHeight > sizes.s36 ? sizes.s20 : sizes.s80,
          flex: 1,
          padding: sizes.s16,
          minHeight: sizes.s48,
          flexWrap: 'wrap',
          color: colors.white,
          ...fonts.semiBold,
          ...fonts.body,
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor:
            newCourseDescription.length === 0
              ? colors.nevada
              : colors.persianGreen80,
          height: sizes.s48,
          width: sizes.s48,
          borderRadius: sizes.s90,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => props.onGenerateCourse(newCourseDescription)}>
        <Icon
          icon={icons.arrowUp}
          size={sizes.s30}
          color={
            newCourseDescription.length === 0
              ? colors.tundora80
              : colors.white50
          }
        />
      </TouchableOpacity>
    </View>
  );
};
