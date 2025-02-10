import { Text } from '@defaults';
import { KContainer } from '@components';
import { images } from '@images';
import { useDiscoverCourses, useRoot } from '@hooks';
import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { ErrorCodes } from '@constants';
import { useFocusEffect } from '@react-navigation/native';
import { SearchBar } from './components';

export const DiscoverScreen = () => {
  const [tags] = useState<string[] | null>(null);
  const [search, setSearch] = useState<string | null>(null);

  const { courses, refetchDiscoverCourses, areDiscoverCoursesLoading, error } =
    useDiscoverCourses({ tags, search });
  const { setIsLoading, setError, setHasError } = useRoot();

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

  return (
    <KContainer backgroundImage={images.mainBackground}>
      <SearchBar currentValue={search} changeCurrentValue={setSearch} />
      <FlatList
        data={courses}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </KContainer>
  );
};
