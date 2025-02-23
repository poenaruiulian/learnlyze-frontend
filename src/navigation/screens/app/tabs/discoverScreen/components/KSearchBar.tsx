import { Icon, View } from '@defaults';
import { TextInput, useWindowDimensions } from 'react-native';
import { colors, fonts, icons, sizes } from '@constants';
import { useEffect, useState } from 'react';

type SearchBarProps = {
  currentValue: string | null;
  changeCurrentValue: (value: string | null) => void;
};

export const KSearchBar = (props: SearchBarProps) => {
  const { width } = useWindowDimensions();

  const [search, setSearch] = useState(props?.currentValue);

  useEffect(() => {
    setTimeout(() => props?.changeCurrentValue(search), 500);
  }, [props, search]);

  return (
    <View width={width} center>
      <View
        width={width - sizes.s40}
        row
        borderRadius={10}
        style={{
          backgroundColor: colors.tundora,
          justifyContent: 'space-between',
        }}>
        <TextInput
          value={search ?? ''}
          style={{
            width: '80%',
            paddingHorizontal: sizes.s10,
            color: colors.white,
            ...fonts.semiBold,
          }}
          onChange={e => setSearch(e.nativeEvent.text)}
        />
        <View
          borderRadius={sizes.s10}
          padding={sizes.s10}
          style={{
            backgroundColor: colors.persianGreen60,
            borderTopLeftRadius: sizes.s20,
            borderBottomLeftRadius: sizes.s20,
          }}>
          <Icon
            icon={icons.magnifyingGlass}
            size={sizes.s24}
            color={colors.white50}
          />
        </View>
      </View>
    </View>
  );
};
