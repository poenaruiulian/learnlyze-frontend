import { colors, icons, sizes, strings } from '@constants';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { Icon, Text, View } from '@defaults';
import { KSpacer } from '@components';
import moment from 'moment/moment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

type KHeaderProps = { title: string; date: string };

export const KHeader = ({ ...props }: KHeaderProps) => {
  const { width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  const { goBack, canGoBack } = useNavigation();

  const iconSize = sizes.s32;
  const borderRadiusRound = sizes.s90;

  return (
    <View
      paddingT={top}
      paddingB={sizes.s20}
      width={width + sizes.s40}
      center
      row
      flex
      style={{
        backgroundColor: colors.biscay30,
        alignSelf: 'center',
        borderBottomLeftRadius: borderRadiusRound,
        borderBottomRightRadius: borderRadiusRound,
      }}>
      {canGoBack() && (
        <TouchableOpacity
          style={{
            height: iconSize,
            width: iconSize,
            borderRadius: borderRadiusRound,
            backgroundColor: colors.nevada,
            borderColor: colors.tundora60,
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: sizes.s36,
            top,
          }}
          onPress={goBack}>
          <Icon icon={icons.arrowLeft} color={colors.tundora80} />
        </TouchableOpacity>
      )}
      <View center paddingH={sizes.s70}>
        <Text bodyXL semiBold white center>
          {props.title}
        </Text>
        <KSpacer h={5} />
        <Text bodyXS semiBold white50>
          {strings.course.header.date}
          {moment(props.date).format('DD MMM YYYY')}
        </Text>
      </View>
    </View>
  );
};
