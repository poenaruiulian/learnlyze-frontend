import { KContainer, KSpacer } from '@components';
import { Button, Icon, Text, View } from '@defaults';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { colors, fonts, FullCourseModel, icons, sizes, Tags } from '@constants';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { useCourse } from '@hooks';
import { AppStackParamList } from '../../../type';
import { KSectionDescription } from './components';

export const PublishCourseScreen = () => {
  const { params } = useRoute<RouteProp<AppStackParamList, 'PublishCourse'>>();
  const { goBack, canGoBack } = useNavigation();
  const { width } = useWindowDimensions();
  const { publishCourse, changePublishDetails } = useCourse();

  const [fullCourse, setFullCourse] = useState<FullCourseModel>(
    params.fullCourse
  );

  const iconSize = sizes.s32;
  const borderRadiusRound = sizes.s90;

  const handleEditTitle = (text: string) =>
    setFullCourse({
      ...fullCourse,
      details: { ...fullCourse.details, title: text },
    });

  const handleEditDescription = (text: string) =>
    setFullCourse({
      ...fullCourse,
      details: { ...fullCourse.details, description: text },
    });

  const handleEditTags = (tag: string) => {
    let fullCourseTags = fullCourse.details.tags ?? [];

    if (fullCourseTags) {
      if (fullCourseTags.includes(tag)) {
        fullCourseTags = fullCourseTags.filter(t => t !== tag);
      } else {
        fullCourseTags = [...fullCourseTags, tag];
      }
    }

    setFullCourse(prev => ({
      ...prev,
      details: { ...prev.details, tags: fullCourseTags },
    }));
  };

  return (
    <KContainer>
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
            marginLeft: 16,
          }}
          onPress={goBack}>
          <Icon icon={icons.arrowLeft} color={colors.tundora80} />
        </TouchableOpacity>
      )}
      <KSpacer h={sizes.s20} />
      <Text center bodyL medium white50>
        Publishing course
      </Text>
      <KSpacer />
      <TextInput
        value={fullCourse.details.title}
        onChangeText={handleEditTitle}
        style={{
          width: width - sizes.s32,
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: colors.tulipTree,
          ...fonts.heading,
          flexWrap: 'wrap',
          marginHorizontal: sizes.s16,
          backgroundColor: colors.biscay30,
          borderRadius: sizes.s10,
        }}
        numberOfLines={3}
        multiline
      />
      <KSpacer h={5} />
      <KSectionDescription description="Customize the course title using the above input. After publishing you won't be able to change it again." />
      <KSpacer h={sizes.s20} />
      <KSectionDescription
        title="Steps:"
        description="These are the main steps of the course, the sub-steps are not included here"
        isEditable={false}
      />
      <KSpacer h={5} />
      <View center style={{ flexShrink: 1, width }}>
        <FlatList
          scrollEnabled={false}
          data={fullCourse.steps}
          keyExtractor={item => item.details.id.toString()}
          renderItem={({ item }) => (
            <View
              width={width - sizes.s32}
              borderRadius={sizes.s10}
              padding={sizes.s10}
              style={{ backgroundColor: colors.biscay80 }}>
              <Text bodyL medium white80 center>
                {item.details.title}
              </Text>
            </View>
          )}
          // eslint-disable-next-line react/no-unstable-nested-components
          ItemSeparatorComponent={() => <KSpacer h={5} />}
        />
      </View>
      <KSpacer h={sizes.s20} />
      <KSectionDescription
        title="Description:"
        description="Give a short description about the course. After publishing you won't be able to change it again."
      />
      <KSpacer h={5} />
      <TextInput
        value={fullCourse.details.description}
        onChangeText={handleEditDescription}
        scrollEnabled={false}
        style={{
          width: width - sizes.s32,
          marginHorizontal: sizes.s16,
          color: colors.white80,
          ...fonts.bodyS,
          backgroundColor: colors.biscay30,
          borderRadius: sizes.s10,
          minHeight: 200,
          padding: sizes.s10,
        }}
        multiline
      />
      <KSpacer h={sizes.s20} />
      <KSectionDescription
        title="Tags:"
        description="Select at least one tag that suits this course. After publishing you won't be able to change it again."
      />
      <KSpacer h={5} />
      <View
        width={width}
        paddingH={sizes.s16}
        row
        gap={sizes.s10}
        style={{ flexWrap: 'wrap' }}>
        {Object.values(Tags)
          .filter(t => t !== Tags.all)
          .map(tag => (
            <TouchableOpacity
              key={tag}
              onPress={() => handleEditTags(tag)}
              style={{
                paddingHorizontal: sizes.s10,
                paddingVertical: 5,
                backgroundColor: fullCourse.details.tags?.includes(tag)
                  ? colors.white80
                  : colors.tundora,
                borderRadius: sizes.s10,
              }}>
              <Text
                white80={!fullCourse.details.tags?.includes(tag)}
                persianGreen={fullCourse.details.tags?.includes(tag)}
                body
                semiBold>
                {tag[0].toUpperCase() + tag.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
      <KSpacer h={sizes.s30} />
      <View width={width} center>
        <Button
          disabled={
            !fullCourse.details.tags ||
            fullCourse.details.tags?.length === 0 ||
            !fullCourse.details.description ||
            fullCourse.details.description?.length === 0 ||
            fullCourse.details.title?.length === 0
          }
          title="Publish course"
          onPress={() => {
            changePublishDetails({
              courseId: fullCourse.details.id,
              description: fullCourse.details.description,
              title: fullCourse.details.title,
              tags: fullCourse.details.tags,
            }).then(() =>
              publishCourse({ courseId: fullCourse.details.id }).then(goBack)
            );
          }}
          center
        />
      </View>
      <KSpacer />
      {(!fullCourse.details.description ||
        fullCourse.details.description?.length === 0) && (
        <Text
          bodyXS
          light
          white50
          style={{ paddingHorizontal: sizes.s16 }}
          center>
          You need to provide a description for the course
        </Text>
      )}
      {(!fullCourse.details.tags || fullCourse.details.tags?.length === 0) && (
        <Text
          bodyXS
          light
          white50
          style={{ paddingHorizontal: sizes.s16 }}
          center>
          You need to select at least one tag suiting this course
        </Text>
      )}
      {fullCourse.details.title.length === 0 && (
        <Text
          bodyXS
          light
          white50
          style={{ paddingHorizontal: sizes.s16 }}
          center>
          You can&#39;t leave the title empty.
        </Text>
      )}
    </KContainer>
  );
};
