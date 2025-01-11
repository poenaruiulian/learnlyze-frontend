import { DiscoverIcon, HomeIcon, ProfileIcon } from './tabBarIcons';

export const TabBarIcon = ({ label }: { label: string }) =>
  label === 'HomeScreen' ? (
    <HomeIcon />
  ) : label === 'DiscoverScreen' ? (
    <DiscoverIcon />
  ) : (
    <ProfileIcon />
  );
