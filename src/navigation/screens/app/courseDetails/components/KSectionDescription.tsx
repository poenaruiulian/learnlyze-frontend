import { Icon, Text, View } from '@defaults';
import { colors, icons, sizes } from '@constants';
import { KSpacer } from '@components';
import { useWindowDimensions } from 'react-native';

type KSectionDescriptionProps = {
  title?: string;
  description?: string;
  isEditable?: boolean;
};

export const KSectionDescription = ({
  title,
  description,
  isEditable = true,
}: KSectionDescriptionProps) => {
  const { width } = useWindowDimensions();
  return (
    <View width={width - sizes.s32} paddingH={sizes.s16}>
      {title && (
        <Text bodyL medium white50>
          {title}
        </Text>
      )}
      <KSpacer h={2} />
      {description && (
        <View row gap={sizes.s10} centerH>
          {isEditable && <Icon icon={icons.edit} color={colors.white50} />}
          <Text bodyXS light white50>
            {description}
          </Text>
        </View>
      )}
      <KSpacer />
    </View>
  );
};
