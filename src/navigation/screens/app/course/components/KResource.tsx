import Drawer from 'react-native-ui-lib/drawer';
import { colors, fonts, ResourceModel } from '@constants';
import { Text, View } from '@defaults';
import { useReducer } from 'react';

export const KResource = ({ ...props }: ResourceModel) => {
  const [isFeedbackOpened, toggleIsFeedbackOpened] = useReducer(s => !s, false);

  const usefulItem = {
    background: colors.fruitSalad60,
    text: 'I find this useful',
    style: {
      color: colors.white50,
      ...fonts.bodyXS,
      borderBottomRightRadius: 10,
      borderTopRightRadius: 10,
    },
  };

  const unusefulItem = {
    background: colors.auChico60,
    text: "I don't find this useful",
    style: {
      color: colors.white50,
      ...fonts.bodyXS,
      borderRadius: 0,
    },
  };

  // TODO:
  // - add icon
  // - redirect to youtube video on press
  // - handle on press feedback
  // - refactor to use sizes and all that stuff
  // - add to strings
  // - add to the custom view and all the new color and background color and all

  return (
    <Drawer
      rightItems={[unusefulItem, usefulItem]}
      fullSwipeRight={false}
      onSwipeableWillOpen={toggleIsFeedbackOpened}
      onSwipeableWillClose={toggleIsFeedbackOpened}
      style={{ borderRadius: 10 }}>
      <View
        padding={10}
        height={40}
        style={[
          {
            backgroundColor: colors.tulipTree,
            borderRadius: isFeedbackOpened ? 0 : 10,
          },
          isFeedbackOpened && {
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
          },
        ]}>
        <Text tundora60 semiBold bodyS>
          {props.title}
        </Text>
      </View>
    </Drawer>
  );
};
