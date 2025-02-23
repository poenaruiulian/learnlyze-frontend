import { DiscoverIcon, HomeIcon, ProfileIcon } from './tabBarIcons';

export const KTabBarIcon = ({ label }: { label: string }) =>
  label === 'HomeScreen' ? (
    <HomeIcon />
  ) : label === 'DiscoverScreen' ? (
    <DiscoverIcon />
  ) : (
    <ProfileIcon />
  );
