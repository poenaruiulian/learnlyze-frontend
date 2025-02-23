import { FlatList, useWindowDimensions } from 'react-native';
import { useState } from 'react';
import { View } from '@defaults';
import { KSpacer } from '@components';
import { sizes } from '@constants';
import { KTag } from './KTag';

type TagsListProps = {
  onTagPress: (value: string) => void;
  tags: (string | null)[];
};

export const KTagsList = ({ onTagPress, tags }: TagsListProps) => {
  const { width } = useWindowDimensions();

  const [selectedTag, setSelectedTag] = useState('all');
  const [isScrollable, setIsScrollable] = useState(false);

  const handleTagPress = (value: string) => {
    setSelectedTag(value);
    onTagPress(value);
  };

  return (
    <View width={width} center>
      <View style={{ flexShrink: 1 }} width={width - sizes.s40}>
        <FlatList
          contentContainerStyle={{ paddingRight: sizes.s10 }} // Add slight padding for better spacing
          horizontal
          scrollEnabled={isScrollable}
          onContentSizeChange={w => setIsScrollable(w > width - sizes.s40)}
          showsHorizontalScrollIndicator={false}
          data={tags}
          renderItem={({ item }) =>
            item ? (
              <KTag
                name={item}
                onTagPress={handleTagPress}
                isSelected={selectedTag === item}
              />
            ) : (
              <View />
            )
          }
          /* eslint-disable-next-line react/no-unstable-nested-components */
          ItemSeparatorComponent={() => <KSpacer />}
        />
      </View>
    </View>
  );
};
