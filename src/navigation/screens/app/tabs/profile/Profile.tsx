import { Text } from '@defaults';
import { KContainer, KSpacer } from '@components';
import { images } from '@images';
import { Button } from 'react-native';
import { useRoot, useUser } from '@hooks';
import { sizes, strings } from '@constants';
import { KSwitcher } from './components';

export const Profile = () => {
  const {
    logout,
    completedSection,
    toggleCompletedSection,
    haptics,
    toggleHaptics,
  } = useRoot();
  const { user } = useUser();

  return (
    <KContainer backgroundImage={images.mainBackground}>
      <Text>Profile</Text>
      <Text>{user?.email}</Text>
      <KSpacer h={sizes.s50} />
      <KSwitcher
        title={strings.profile.haptics.title}
        description={strings.profile.haptics.description}
        active={haptics}
        onSwitch={toggleHaptics}
      />
      <KSpacer h={20} />
      <KSwitcher
        title={strings.profile.finishedCourse.title}
        description={strings.profile.finishedCourse.description}
        active={completedSection}
        onSwitch={toggleCompletedSection}
      />
      <KSpacer h={sizes.s50} />
      <Button title="Log out" onPress={logout} />
    </KContainer>
  );
};
