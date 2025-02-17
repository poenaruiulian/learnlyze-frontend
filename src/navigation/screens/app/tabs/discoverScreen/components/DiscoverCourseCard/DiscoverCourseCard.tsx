import { View, Text } from '@defaults';
import { useWindowDimensions } from 'react-native';
import { colors, sizes, Tags } from '@constants';
import { DiscoverCourseBackground } from './DiscoverCourseBackground';

export type DiscoverCourseCardType = {
  title: string;
  tags: string[];
};

const getColorBasedOnTag = (tag: string) => {
  switch (tag) {
    case Tags.tech:
      return colors.persianGreen;
    case Tags.design:
      return colors.tulipTree;
    case Tags.business:
      return colors.ironstone;
    case Tags.finance:
      return colors.hummingBird;
    case Tags.health:
      return colors.fruitSalad;
    case Tags.science:
      return colors.cersieRed;
    case Tags.music:
      return colors.chelseaCucumber;
    case Tags.marketing:
      return colors.turbo;
    case Tags.coding:
      return colors.electricViolet;
    case Tags.art:
      return colors.azalea;
    case Tags.writing:
      return colors.cranberry;
    default:
      return colors.persianGreen;
  }
};

export const DiscoverCourseCard = ({ ...props }: DiscoverCourseCardType) => {
  const { width: windowWidth } = useWindowDimensions();

  const width = (windowWidth - sizes.s50) / 2;

  const firstColor = props.tags[0] && getColorBasedOnTag(props.tags[0]);
  const secondColor = props.tags[1]
    ? getColorBasedOnTag(props.tags[1])
    : props.tags[0] && getColorBasedOnTag(props.tags[0]);

  return (
    <View width={width}>
      <DiscoverCourseBackground
        firstColor={firstColor}
        secondColor={secondColor}
        width={width}
      />
      <View
        style={{
          flexWrap: 'wrap',
          position: 'absolute',
          width,
          flex: 1,
        }}>
        <Text
          white
          bodyXS
          semiBold
          style={{
            width,
            padding: sizes.s10,
          }}>
          {props.title}
        </Text>
      </View>
    </View>
  );
};
