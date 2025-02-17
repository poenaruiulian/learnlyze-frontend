import { View } from '@defaults';
import { KContainer, KSpacer } from '@components';
import { images } from '@images';
import { useDiscoverCourses, useRoot } from '@hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, useWindowDimensions } from 'react-native';
import { ErrorCodes, sizes, Tags } from '@constants';
import { useFocusEffect } from '@react-navigation/native';
import { DiscoverCourseCard, SearchBar, TagsList } from './components';

export const DiscoverScreen = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [search, setSearch] = useState<string | null>(null);

  const { courses, refetchDiscoverCourses, areDiscoverCoursesLoading, error } =
    useDiscoverCourses({
      tags: selectedTag ? [selectedTag] : null,
      search,
    });
  const { setIsLoading, setError, setHasError } = useRoot();
  const { width } = useWindowDimensions();

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

  const tags = useMemo(() => {
    const filteredTags = Object.values(Tags)
      .map(tag => (tag !== Tags.all && tag !== selectedTag ? tag : null))
      .filter(tag => tag);

    return [Tags.all, selectedTag].concat(filteredTags).filter(tag => tag);
  }, [selectedTag]);

  return (
    <KContainer backgroundImage={images.mainBackground}>
      <SearchBar currentValue={search} changeCurrentValue={setSearch} />
      <KSpacer />
      <TagsList onTagPress={onTagPress} tags={tags} />
      <KSpacer h={sizes.s30} />
      <View style={{ flexShrink: 1, width }}>
        <FlatList
          scrollEnabled={false}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          data={courses}
          renderItem={({ item }) => (
            <DiscoverCourseCard tags={item?.tags || []} title={item?.title} />
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
    </KContainer>
  );
};
