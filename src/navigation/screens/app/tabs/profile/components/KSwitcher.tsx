import { sizes } from '@constants';
import { Text, View } from '@defaults';
import { useRoot } from '@hooks';
import { ImpactFeedbackStyle } from 'expo-haptics';
import { Switch, useWindowDimensions } from 'react-native';

type KSwitcherType = {
  title: string;
  description: string;
  active: boolean;
  onSwitch: () => void;
};

export const KSwitcher = ({ ...props }: KSwitcherType) => {
  const { width } = useWindowDimensions();
  const { impactAsync } = useRoot();

  const componentWidth = width - sizes.s20;

  return (
    <View
      row
      width={componentWidth}
      spread
      centerH
      style={{ alignSelf: 'center' }}>
      <View width={componentWidth * 0.8}>
        <Text bodyXL bold tulipTree>
          {props.title}
        </Text>
        <Text bodyXS regular white50>
          {props.description}
        </Text>
      </View>
      <Switch
        value={props.active}
        onValueChange={() =>
          impactAsync(ImpactFeedbackStyle.Soft).then(props.onSwitch)
        }
      />
    </View>
  );
};
