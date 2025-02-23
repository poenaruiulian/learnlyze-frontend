import { View, Text } from '@defaults';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { colors, sizes, Tags } from '@constants';
import { KSpacer } from '@components';
import { KDiscoverCourseBackground } from './KDiscoverCourseBackground';

export type DiscoverCourseCardType = {
  title: string;
  tags: string[];
  numberOfSteps: number;
  description?: string;
  onPress: () => void;
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

export const KDiscoverCourseCard = ({ ...props }: DiscoverCourseCardType) => {
  const { width: windowWidth } = useWindowDimensions();

  const width = (windowWidth - sizes.s50) / 2;

  const firstColor = props.tags[0] && getColorBasedOnTag(props.tags[0]);
  const secondColor = props.tags[1]
    ? getColorBasedOnTag(props.tags[1])
    : props.tags[0] && getColorBasedOnTag(props.tags[0]);

  return (
    <TouchableOpacity onPress={props.onPress} style={{ width }}>
      <KDiscoverCourseBackground
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
          bodyS
          bold
          style={{
            width,
            paddingHorizontal: sizes.s10,
            paddingTop: sizes.s10,
          }}>
          {props.title}
        </Text>
        <KSpacer h={4} />
        <Text
          white80
          bodyXS
          light
          style={{
            width,
            paddingHorizontal: sizes.s10,
          }}>
          {props.description || 'No description provided.'}
        </Text>
        <KSpacer h={10} />
        <View row paddingH={sizes.s10} gap={2} centerH>
          <Text bodyXS persianGreen medium>
            {props.numberOfSteps.toString()}
          </Text>
          <Text bodyXS white80 medium>
            steps
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
