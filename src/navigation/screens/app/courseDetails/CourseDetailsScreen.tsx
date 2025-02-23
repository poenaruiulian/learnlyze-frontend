import { KBackButton, KContainer, KSpacer } from '@components';
import { Button, Text, View } from '@defaults';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { colors, fonts, FullCourseModel, sizes, Tags } from '@constants';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { useCourse, useUser } from '@hooks';
import { AppStackParamList } from '../../../type';
import { KSectionDescription } from './components';
import { KStepDetails } from './components/KStepDetails';

export const CourseDetailsScreen = () => {
  const { params } = useRoute<RouteProp<AppStackParamList, 'PublishCourse'>>();
  const { goBack } = useNavigation();
  const { width } = useWindowDimensions();
  const { enrollCourse, communityCourses } = useCourse();
  const { user } = useUser();

  const [fullCourse] = useState<FullCourseModel>(params.fullCourse);

  return (
    <KContainer>
      <KBackButton />
      <KSpacer h={sizes.s20} />
      <KSpacer />
      <Text center heading tulipTree style={{ paddingHorizontal: sizes.s16 }}>
        {fullCourse.details.title}
      </Text>
      <KSpacer h={sizes.s20} />
      <KSectionDescription
        title="Steps:"
        description="These are the main steps of the course, press to reveal the sub-steps of the course"
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
      <KSectionDescription title="Description:" />
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
      <KSectionDescription title="Tags:" />
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
            fullCourse.details.user === user?.id ||
            communityCourses
              ?.map(course => course.enrolledId)
              .includes(fullCourse.details.id)
          }
          title="Enroll"
          onPress={() => {
            enrollCourse({ courseId: fullCourse.details.id }).then(goBack);
          }}
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
          You can&#39;t enroll to a course you&#39;ve published.
        </Text>
      )}
      {communityCourses
        ?.map(course => course.enrolledId)
        .includes(fullCourse.details.id) && (
        <Text
          bodyXS
          light
          white50
          style={{ paddingHorizontal: sizes.s16 }}
          center>
          You can&#39;t enroll to a course you&#39;ve already enrolled.
        </Text>
      )}
      <KSpacer h={sizes.s60} />
    </KContainer>
  );
};
