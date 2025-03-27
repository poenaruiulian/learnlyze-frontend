import { Text, View } from '@defaults';
import { KContainer, KSpacer } from '@components';
import { images } from '@images';
import { useCourse, useDiscoverCourses, useError, useRoot } from '@hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, useWindowDimensions } from 'react-native';
import { ErrorCodes, sizes, SortEnum, Tags } from '@constants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  KDiscoverCourseCard,
  NoCoursesFound,
  KSearchBar,
  KTagsList,
} from './components';
import { AppNavigationType } from '../../../../type';

export const Discover = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedSorting, setSelectedSorting] = useState<string | null>(null);
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

  const onSortPress = useCallback((value: string) => {
    setSelectedSorting(value);
  }, []);

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
      <Text bodyS bold white80 style={{ paddingHorizontal: sizes.s20 }}>
        Filter courses based on tag:
      </Text>
      <KSpacer />
      <KTagsList onTagPress={onTagPress} tags={Object.values(Tags)} />
      <KSpacer />
      <Text bodyS bold white80 style={{ paddingHorizontal: sizes.s20 }}>
        Sort courses:
      </Text>
      <KSpacer />
      <KTagsList onTagPress={onSortPress} tags={Object.values(SortEnum)} />
      <KSpacer />
      <KSpacer h={sizes.s30} />
      {courses?.length !== 0 ? (
        <View style={{ flexShrink: 1, width }}>
          <FlatList
            scrollEnabled={false}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            data={courses?.slice().sort((c1, c2) => {
              switch (selectedSorting) {
                case SortEnum.enrollments:
                  return (
                    (c2.numberOfEnrollments ?? 0) -
                    (c1.numberOfEnrollments ?? 0)
                  );
                case SortEnum.alphabetically:
                  return (c1.title ?? '').localeCompare(c2.title ?? '');
                default:
                  return -1;
              }
            })}
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
