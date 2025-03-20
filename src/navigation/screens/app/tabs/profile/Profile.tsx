import { Text, View, Button } from '@defaults';
import { KContainer, KSpacer, KTextInput } from '@components';
import { images } from '@images';
import { useWindowDimensions } from 'react-native';
import { useRoot, useUser } from '@hooks';
import { colors, sizes, strings, UserModel, verifyEmail } from '@constants';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { KSwitcher } from './components';

export const Profile = () => {
  const {
    logout,
    completedSection,
    toggleCompletedSection,
    haptics,
    toggleHaptics,
  } = useRoot();
  const { width } = useWindowDimensions();
  const { user, update, refetch } = useUser();

  const [shallowUser, setShallowUser] = useState<UserModel | null>(null);

  useEffect(() => {
    setShallowUser(user);
  }, [user]);

  const inputWidth = width - sizes.s20;

  const handleOnPress = useCallback(() => {
    const isNewEmailCompleted = shallowUser && shallowUser.email.length !== 0;
    const isEmailValid = isNewEmailCompleted && verifyEmail(shallowUser.email);

    const isFirstNameCompleted =
      shallowUser && shallowUser.firstName.length !== 0;
    const isLastNameCompleted =
      shallowUser && shallowUser.lastName.length !== 0;

    const variables = {
      newEmail: isEmailValid ? shallowUser.email : user?.email,
      firstName: isFirstNameCompleted
        ? shallowUser?.firstName
        : user?.firstName,
      lastName: isLastNameCompleted ? shallowUser?.lastName : user?.lastName,
    };

    if (variables) {
      update(variables).then(() => refetch());
    }
  }, [
    refetch,
    shallowUser,
    update,
    user?.email,
    user?.firstName,
    user?.lastName,
  ]);

  const applyChangesDisabled = useMemo(() => {
    const emailChanged = shallowUser?.email !== user?.email;
    const firstNameChanged = shallowUser?.firstName !== user?.firstName;
    const lastNameChanged = shallowUser?.lastName !== user?.lastName;

    return !(
      shallowUser &&
      user &&
      (emailChanged || firstNameChanged || lastNameChanged)
    );
  }, [shallowUser, user]);

  return (
    <KContainer backgroundImage={images.mainBackground}>
      <KSpacer h={sizes.s30} />
      {shallowUser && (
        <View width={width} paddingH={sizes.s10}>
          <Text body regular tulipTree80>
            {strings.profile.firstName}
          </Text>
          <KTextInput
            value={shallowUser.firstName}
            placeholder=""
            onSetValue={newValue =>
              setShallowUser({ ...shallowUser, firstName: newValue })
            }
            style={{ width: inputWidth }}
          />
          <KSpacer />
          <Text body regular tulipTree80>
            {strings.profile.lastName}
          </Text>
          <KTextInput
            value={shallowUser.lastName}
            placeholder=""
            onSetValue={newValue =>
              setShallowUser({ ...shallowUser, lastName: newValue })
            }
            style={{ width: inputWidth }}
          />
          <KSpacer />
          <Text body regular tulipTree80>
            {strings.profile.email}
          </Text>
          <KTextInput
            value={shallowUser.email}
            placeholder=""
            onSetValue={newValue =>
              setShallowUser({ ...shallowUser, email: newValue })
            }
            style={{ width: inputWidth }}
          />
          <KSpacer h={sizes.s20} />
          <Button
            title={strings.profile.apply}
            titleStyle={{ color: colors.white80 }}
            onPress={handleOnPress}
            disabled={applyChangesDisabled}
          />
        </View>
      )}
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
      <View width={inputWidth} center>
        <Button
          title="Log out"
          onPress={logout}
          background={colors.biscay}
          titleStyle={{ color: colors.white50 }}
        />
      </View>
    </KContainer>
  );
};
