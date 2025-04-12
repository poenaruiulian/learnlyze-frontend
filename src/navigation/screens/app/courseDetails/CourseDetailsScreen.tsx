import {
  KBackButton,
  KContainer,
  KCourseDetailsCard,
  KSpacer,
  KStepsResourcesDetails,
} from '@components';
import {
  colors,
  computeTotalStepsResources,
  CourseModel,
  fonts,
  FullCourseModel,
  sizes,
  strings,
  Tags,
} from '@constants';
import { Button, Text, View } from '@defaults';
import { useCourse, useUser } from '@hooks';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, TextInput, useWindowDimensions } from 'react-native';

import { AppStackParamList } from '../../../type';
import { KSectionDescription, KStepDetails } from './components';

export const CourseDetailsScreen = () => {
  const { params } = useRoute<RouteProp<AppStackParamList, 'PublishCourse'>>();
  const { goBack } = useNavigation();
  const { width } = useWindowDimensions();
  const { enrollCourse, communityCourses } = useCourse();
  const { user } = useUser();

  const [fullCourse] = useState<FullCourseModel>(params.fullCourse);
  const [totals, setTotals] = useState<{
    steps: number;
    resources: number;
  } | null>(null);

  const tags = useMemo(
    () => Object.values(Tags).filter(t => t !== Tags.all),
    []
  );

  const isAlreadyEnrolled = useMemo(
    () =>
      communityCourses
        ?.map((course: CourseModel) => course.enrolledId)
        .includes(fullCourse.details.id),
    [communityCourses, fullCourse.details.id]
  );

  const enrollButtonDisabled = useMemo(
    () =>
      fullCourse.details.user === user?.id ||
      communityCourses
        ?.map((course: CourseModel) => course.enrolledId)
        .includes(fullCourse.details.id),
    [communityCourses, fullCourse.details.id, fullCourse.details.user, user?.id]
  );

  const handleEnroll = useCallback(() => {
    enrollCourse({ courseId: fullCourse.details.id }).then(goBack);
  }, [enrollCourse, fullCourse.details.id, goBack]);

  useEffect(() => {
    if (
      fullCourse.steps !== undefined &&
      fullCourse.steps.length !== undefined
    ) {
      const response = computeTotalStepsResources(fullCourse.steps);
      setTotals({
        ...response,
        steps: response.steps + fullCourse.steps.length,
      });
    }
  }, [fullCourse.steps]);

  return (
    <KContainer>
      <KBackButton />
      <KSpacer h={sizes.s20} />
      <KSpacer />
      <Text center heading tulipTree style={{ paddingHorizontal: sizes.s16 }}>
        {fullCourse.details.title}
      </Text>
      {fullCourse.details.numberOfEnrollments !== undefined && (
        <>
          <KSpacer h={sizes.s20} />
          <KCourseDetailsCard
            value={fullCourse.details.numberOfEnrollments}
            description="users enrolled to this course"
          />
        </>
      )}
      <KSpacer h={sizes.s20} />
      <KStepsResourcesDetails
        steps={totals?.steps ?? 0}
        resources={totals?.resources ?? 0}
      />
      <KSpacer h={sizes.s20} />
      <KSectionDescription
        title={strings.courseDetails.stepsTitle}
        description={strings.courseDetails.stepsDescription}
        isEditable={false}
      />
      <KSpacer h={5} />
      <View center style={{ flexShrink: 1, width }}>
        <FlatList
          scrollEnabled={false}
          data={fullCourse.steps}
          keyExtractor={item => item.details.id.toString()}
          renderItem={({ item }) => <KStepDetails step={item} />}
          // eslint-disable-next-line react/no-unstable-nested-components
          ItemSeparatorComponent={() => <KSpacer h={5} />}
          contentContainerStyle={{ width }}
        />
      </View>
      <KSpacer h={sizes.s20} />
      <KSectionDescription title={strings.courseDetails.descriptionTitle} />
      <KSpacer h={5} />
      <TextInput
        value={fullCourse.details.description}
        scrollEnabled={false}
        editable={false}
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
      <KSectionDescription title={strings.courseDetails.tagsTitle} />
      <KSpacer h={5} />
      <View
        width={width}
        paddingH={sizes.s16}
        row
        gap={sizes.s10}
        style={{ flexWrap: 'wrap' }}>
        {tags.map(tag => (
          <View
            key={tag}
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
          </View>
        ))}
      </View>
      <KSpacer h={sizes.s30} />
      <View width={width} center>
        <Button
          disabled={enrollButtonDisabled}
          title={strings.courseDetails.enroll}
          onPress={handleEnroll}
          center
        />
      </View>
      <KSpacer />
      {fullCourse.details.user === user?.id && (
        <Text
          bodyXS
          light
          white50
          style={{ paddingHorizontal: sizes.s16 }}
          center>
          {strings.courseDetails.cantEnrollToPublished}
        </Text>
      )}
      {isAlreadyEnrolled && (
        <Text
          bodyXS
          light
          white50
          style={{ paddingHorizontal: sizes.s16 }}
          center>
          {strings.courseDetails.cantEnrollToEnrolled}
        </Text>
      )}
      <KSpacer h={sizes.s60} />
    </KContainer>
  );
};
