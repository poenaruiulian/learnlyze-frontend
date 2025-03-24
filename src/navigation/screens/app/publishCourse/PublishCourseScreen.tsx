import {
  KBackButton,
  KContainer,
  KSpacer,
  KStepsResourcesDetails,
} from '@components';
import { Button, Text, View } from '@defaults';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {
  colors,
  computeTotalStepsResources,
  fonts,
  FullCourseModel,
  sizes,
  strings,
  Tags,
} from '@constants';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useCourse } from '@hooks';
import { AppStackParamList } from '../../../type';
import { KSectionDescription } from './components';

export const PublishCourseScreen = () => {
  const { params } = useRoute<RouteProp<AppStackParamList, 'PublishCourse'>>();
  const { goBack } = useNavigation();
  const { width } = useWindowDimensions();
  const { publishCourse, changePublishDetails } = useCourse();

  const [fullCourse, setFullCourse] = useState<FullCourseModel>(
    params.fullCourse
  );
  const [totals, setTotals] = useState<{
    steps: number;
    resources: number;
  } | null>(null);

  const tags = useMemo(
    () => Object.values(Tags).filter(t => t !== Tags.all),
    []
  );

  const handleEditTitle = useCallback(
    (text: string) =>
      setFullCourse({
        ...fullCourse,
        details: { ...fullCourse.details, title: text },
      }),
    [fullCourse]
  );

  const handleEditDescription = useCallback(
    (text: string) =>
      setFullCourse({
        ...fullCourse,
        details: { ...fullCourse.details, description: text },
      }),
    [fullCourse]
  );

  const handleEditTags = useCallback(
    (tag: string) => {
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
    },
    [fullCourse.details.tags]
  );

  const handlePublishing = useCallback(() => {
    changePublishDetails({
      courseId: fullCourse.details.id,
      description: fullCourse.details.description,
      title: fullCourse.details.title,
      tags: fullCourse.details.tags,
    }).then(() =>
      publishCourse({ courseId: fullCourse.details.id }).then(goBack)
    );
  }, [
    changePublishDetails,
    fullCourse.details.description,
    fullCourse.details.id,
    fullCourse.details.tags,
    fullCourse.details.title,
    goBack,
    publishCourse,
  ]);

  useEffect(() => {
    const response = computeTotalStepsResources(fullCourse.steps);
    setTotals({ ...response, steps: response.steps + fullCourse.steps.length });
  }, [fullCourse.steps]);

  return (
    <KContainer>
      <KBackButton />
      <KSpacer h={sizes.s20} />
      <Text center bodyL medium white50>
        {strings.publishCourse.title}
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
      <KSectionDescription
        description={strings.publishCourse.titleDescription}
      />
      <KSpacer h={sizes.s20} />
      <KStepsResourcesDetails
        steps={totals?.steps ?? 0}
        resources={totals?.resources ?? 0}
      />
      <KSpacer h={sizes.s20} />
      <KSectionDescription
        title={strings.publishCourse.stepsTitle}
        description={strings.publishCourse.stepsDescription}
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
        title={strings.publishCourse.descriptionTitle}
        description={strings.publishCourse.descriptionDescription}
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
        title={strings.publishCourse.tagsTitle}
        description={strings.publishCourse.tagsDescription}
      />
      <KSpacer h={5} />
      <View
        width={width}
        paddingH={sizes.s16}
        row
        gap={sizes.s10}
        style={{ flexWrap: 'wrap' }}>
        {tags.map(tag => (
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
          title={strings.publishCourse.publish}
          onPress={handlePublishing}
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
          {strings.publishCourse.descriptionNeeded}
        </Text>
      )}
      {(!fullCourse.details.tags || fullCourse.details.tags?.length === 0) && (
        <Text
          bodyXS
          light
          white50
          style={{ paddingHorizontal: sizes.s16 }}
          center>
          {strings.publishCourse.tagsNeeded}
        </Text>
      )}
      {fullCourse.details.title.length === 0 && (
        <Text
          bodyXS
          light
          white50
          style={{ paddingHorizontal: sizes.s16 }}
          center>
          {strings.publishCourse.tagsNeeded}
        </Text>
      )}
      <KSpacer h={sizes.s60} />
    </KContainer>
  );
};
