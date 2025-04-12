import { KSpacer } from '@components';
import { colors, FullStep, sizes } from '@constants';
import { Text, View } from '@defaults';
import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

export const KStepDetails = ({ step }: { step: FullStep }) => {
  const [substepsVisible, setSubstepsVisible] = useState(false);

  return (
    <TouchableOpacity
      onPress={() =>
        setSubstepsVisible(!substepsVisible && step.subSteps.length !== 0)
      }
      style={{
        paddingHorizontal: sizes.s16,
      }}>
      <View
        borderRadius={sizes.s10}
        padding={sizes.s10}
        style={{
          backgroundColor:
            step.subSteps && step.subSteps.length !== 0
              ? colors.eastBay
              : colors.biscay80,
        }}>
        <Text bodyM medium white80 center>
          {step.details.title}
        </Text>
      </View>
      {substepsVisible && (
        <>
          <KSpacer />
          <FlatList
            scrollEnabled={false}
            data={step.subSteps}
            keyExtractor={item => item.details.id.toString()}
            renderItem={({ item }) => <KStepDetails step={item} />}
            // eslint-disable-next-line react/no-unstable-nested-components
            ItemSeparatorComponent={() => <KSpacer h={5} />}
          />
          <KSpacer />
        </>
      )}
    </TouchableOpacity>
  );
};
