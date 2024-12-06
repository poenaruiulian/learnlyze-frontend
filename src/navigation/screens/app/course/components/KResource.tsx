import Drawer from 'react-native-ui-lib/drawer';
import {
  colors,
  fonts,
  icons,
  ResourceModel,
  routes,
  sizes,
  strings,
} from '@constants';
import { Icon, Text } from '@defaults';
import { useState } from 'react';
import { Linking, TouchableOpacity } from 'react-native';

export const KResource = ({ ...props }: ResourceModel) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const usefulItem = {
    background: colors.fruitSalad60,
    text: strings.course.resource.useful,
    style: {
      color: colors.white50,
      ...fonts.bodyXS,
      borderBottomRightRadius: sizes.s10,
      borderTopRightRadius: sizes.s10,
    },
    onPress: () => {
      console.log('I find this useful');
    },
  };

  const unusefulItem = {
    background: colors.auChico60,
    text: strings.course.resource.useless,
    style: {
      color: colors.white50,
      ...fonts.bodyXS,
      borderRadius: 0,
    },
    onPress: () => {
      console.log("I don't find this useful");
    },
  };

  const onPressResource = async () =>
    (await Linking.canOpenURL(routes.youtube + props.external)) &&
    Linking.openURL(routes.youtube + props.external);

  return (
    <Drawer
      rightItems={[unusefulItem, usefulItem]}
      fullSwipeRight={false}
      onSwipeableWillOpen={() => setIsFeedbackOpen(true)}
      onSwipeableWillClose={() => setIsFeedbackOpen(false)}
      style={{ borderRadius: sizes.s10, maxWidth: '90%' }}>
      <TouchableOpacity
        style={[
          {
            backgroundColor: colors.tulipTree,
            borderRadius: isFeedbackOpen ? 0 : sizes.s10,
            padding: sizes.s10,
            height: sizes.s40,
            flexDirection: 'row',
            gap: sizes.s10,
          },
          isFeedbackOpen && {
            borderBottomLeftRadius: sizes.s10,
            borderTopLeftRadius: sizes.s10,
          },
        ]}
        onPress={onPressResource}>
        <Icon icon={icons.link} color={colors.tundora60} />
        <Text tundora60 semiBold bodyS ellipsizeMode="tail" numberOfLines={2}>
          {props.title}
        </Text>
      </TouchableOpacity>
    </Drawer>
  );
};
