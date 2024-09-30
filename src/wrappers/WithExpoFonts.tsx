import { FC, ReactNode } from 'react';
import { useFonts } from 'expo-font';

export const WithExpoFonts: FC<{ children: ReactNode }> = ({ children }) => {
  const [doneLoading] = useFonts({
    'Raleway-Black': require('../../assets/fonts/Raleway-Black.ttf'),
    'Raleway-ExtraBold': require('../../assets/fonts/Raleway-ExtraBold.ttf'),
    'Raleway-Bold': require('../../assets/fonts/Raleway-Bold.ttf'),
    'Raleway-SemiBold': require('../../assets/fonts/Raleway-SemiBold.ttf'),
    'Raleway-Regular': require('../../assets/fonts/Raleway-Regular.ttf'),
    'Raleway-Light': require('../../assets/fonts/Raleway-Light.ttf'),
    'Raleway-ExtraLight': require('../../assets/fonts/Raleway-ExtraLight.ttf'),
    'Raleway-Thin': require('../../assets/fonts/Raleway-Thin.ttf'),
  });

  return doneLoading ? children : null;
};
