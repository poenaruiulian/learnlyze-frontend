import { View } from '@defaults';
import { KContainer, KSpacer } from '@components';
import { images } from '@images';
import { useCourse, useDiscoverCourses, useError, useRoot } from '@hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, useWindowDimensions } from 'react-native';
import { ErrorCodes, sizes, Tags } from '@constants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  KDiscoverCourseCard,
  NoCoursesFound,
  KSearchBar,
  KTagsList,
} from './components';
import { AppNavigationType } from '../../../../type';

export const DiscoverScreen = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [search, setSearch] = useState<string | null>(null);
  const { navigate } = useNavigation<AppNavigationType>();

  const { courses, refetchDiscoverCourses, areDiscoverCoursesLoading, error } =
    useDiscoverCourses({
      tags: selectedTag ? [selectedTag] : null,
      search,
    });
  const { setIsLoading } = useRoot();
  const { setError, setHasError } = useError();
  const { width } = useWindowDimensions();
  const { getCourseById } = useCourse();

  useEffect(() => {
    setIsLoading(areDiscoverCoursesLoading);
  }, [areDiscoverCoursesLoading, setIsLoading]);

  useEffect(() => {
    if (error) {
      setError({
        message: error.name,
        description: error.message,
        code: ErrorCodes.somethingWentWrong,
      });
      setHasError(true);
    }
    setHasError(false);
  }, [error, setError, setHasError]);

  useFocusEffect(
    useCallback(() => {
      refetchDiscoverCourses();
    }, [refetchDiscoverCourses])
  );

  const onTagPress = useCallback(
    (value: string) => setSelectedTag(value === Tags.all ? null : value),
    []
  );

  const handleOnPressCourse = useCallback(
    (id: number) =>
      getCourseById(id).then(
        fullCourse =>
          fullCourse && navigate('CourseDetailsScreen', { fullCourse })
      ),
    [getCourseById, navigate]
  );

  return (
    <KContainer backgroundImage={images.mainBackground}>
      <KSearchBar currentValue={search} changeCurrentValue={setSearch} />
      <KSpacer />
      <KTagsList onTagPress={onTagPress} tags={Object.values(Tags)} />
      <KSpacer h={sizes.s30} />
      {courses?.length !== 0 ? (
        <View style={{ flexShrink: 1, width }}>
          <FlatList
            scrollEnabled={false}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            data={courses}
            renderItem={({ item }) => (
              <KDiscoverCourseCard
                tags={item?.tags || []}
                title={item?.title}
                numberOfSteps={item?.steps.length}
                description={item.description}
                onPress={() => handleOnPressCourse(item.id)}
              />
            )}
            style={{ paddingHorizontal: sizes.s20 }}
            contentContainerStyle={{
              gap: sizes.s10,
            }}
            columnWrapperStyle={{
              gap: sizes.s10,
            }}
          />
        </View>
      ) : (
        <View flex center>
          <NoCoursesFound />
        </View>
      )}
      <KSpacer h={sizes.s60} />
    </KContainer>
  );
};
