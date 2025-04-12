import { useRoot } from '@hooks';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ErrorHandler } from '@wrappers';

import { KTabBar } from './components';
import {
  ConfirmMailScreen,
  CourseDetailsScreen,
  CourseScreen,
  Discover,
  Home,
  LoginScreen,
  NewCourseScreen,
  OnboardingScreen,
  Profile,
  PublishCourseScreen,
  RegisterScreen,
} from './screens';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    <Stack.Screen name="ConfirmMailScreen" component={ConfirmMailScreen} />
  </Stack.Navigator>
);

const BottomTab = () => {
  const getTabBar = (props: BottomTabBarProps) => <KTabBar {...props} />;
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={getTabBar}>
      <Tab.Screen name="HomeScreen" component={Home} />
      <Tab.Screen name="DiscoverScreen" component={Discover} />
      <Tab.Screen name="ProfileScreen" component={Profile} />
    </Tab.Navigator>
  );
};

const AppStack = () => {
  const { isNewUser } = useRoot();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isNewUser && (
        <Stack.Screen name="NewCourseScreen" component={NewCourseScreen} />
      )}
      <Stack.Screen name="Tab" component={BottomTab} />
      <Stack.Screen
        name="CourseDetailsScreen"
        component={CourseDetailsScreen}
      />
      <Stack.Screen name="CourseScreen" component={CourseScreen} />
      {!isNewUser && (
        <Stack.Screen name="NewCourseScreen" component={NewCourseScreen} />
      )}
      <Stack.Screen name="PublishCourse" component={PublishCourseScreen} />
    </Stack.Navigator>
  );
};

export const Navigation = () => {
  const { isLogged } = useRoot();

  return (
    <NavigationContainer>
      <ErrorHandler>{isLogged ? <AppStack /> : <AuthStack />}</ErrorHandler>
    </NavigationContainer>
  );
};
