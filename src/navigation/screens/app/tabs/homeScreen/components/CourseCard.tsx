import { ImageBackground, TouchableOpacity } from 'react-native';
import { Text, View } from '@defaults';
import { images } from '@images';
import { colors, sizes, strings } from '@constants';
import { LinearGradient } from 'expo-linear-gradient';
import { KSpacer } from '@components';

type CourseCardProps = {
  name?: string;
  steps?: number;
  completed?: number;
  onPress: () => void;
  noCourse?: boolean;
};

export const CourseCard = ({ ...props }: CourseCardProps) => {
  const completed =
    props.completed && props.steps
      ? Math.floor((props.completed * 100) / props.steps)
      : 0;
  const uncompleted = 100 - completed;

  return (
    <ImageBackground
      source={
        props.noCourse
          ? images.noCoursesCardBackground
          : images.defaultCardBackground
      }
      resizeMode="contain"
      style={{
        width: 255,
        height: 130,
      }}>
      <TouchableOpacity style={{ flex: 1 }} onPress={props.onPress}>
        <View
          flex
          borderRadius={sizes.s10}
          padding={sizes.s10}
          style={{
            backgroundColor: colors.biscay60,
            justifyContent: props.noCourse ? 'center' : 'space-between',
          }}>
          {props.noCourse ? (
            <>
              <Text bodyM semiBold white>
                {strings.home.noCommunityTitle}
              </Text>
              <KSpacer h={5} />
              <Text bodyXS white50 medium>
                {strings.home.noCommunityDescription}
              </Text>
            </>
          ) : (
            <>
              <Text semiBold white body>
                {props.name}
              </Text>
              <View>
                <View row gap={3} centerH>
                  <Text semiBold bodyL persianGreen style={{ lineHeight: 18 }}>
                    {props?.completed?.toString()}
                  </Text>
                  <Text
                    semiBold
                    bodyS
                    white50
                    style={{
                      lineHeight: 18,
                    }}>
                    {strings.home.ofXSteps(props.steps ?? 0)}
                  </Text>
                  <Text semiBold bodyS persianGreen style={{ lineHeight: 18 }}>
                    {strings.home.completed}
                  </Text>
                </View>
                <KSpacer h={5} />
                <View>
                  <Text
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      alignSelf: 'center',
                    }}
                    white50
                    bold
                    bodyS>
                    {`${completed}%`}
                  </Text>
                  <LinearGradient
                    colors={
                      uncompleted === 0
                        ? [colors.persianGreen, colors.persianGreen]
                        : completed === 0
                          ? [colors.tulipTree, colors.tulipTree]
                          : [colors.tulipTree, colors.persianGreen]
                    }
                    style={{
                      width: '100%',
                      height: 20,
                      borderRadius: 6,
                    }}
                    locations={[completed / 100, uncompleted / 100]}
                    start={{ x: 0, y: 0.75 }}
                    end={{ x: 1, y: 0.25 }}
                  />
                </View>
              </View>
            </>
          )}
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
};
