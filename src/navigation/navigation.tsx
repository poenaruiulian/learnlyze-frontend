import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
  CompletedCourseScreen,
  ConfirmMailScreen,
  CourseDetailsScreen,
  CourseScreen,
  DiscoverScreen,
  HomeScreen,
  LoginScreen,
  MoreCommentsScreen,
  NewCourseScreen,
  ProfileScreen,
  RegisterScreen,
  SettingsScreen,
} from './screens';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    <Stack.Screen name="ConfirmMailScreen" component={ConfirmMailScreen} />
  </Stack.Navigator>
);

const BottomTab = () => (
  <Tab.Navigator>
    <Tab.Screen name="HomeScreen" component={HomeScreen} />
    <Tab.Screen name="DiscoverScreen" component={DiscoverScreen} />
    <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
  </Tab.Navigator>
);

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Tab" component={BottomTab} />
    <Stack.Screen
      name="CompletedCourseScreen"
      component={CompletedCourseScreen}
    />
    <Stack.Screen
      name="CourseDetailsScreen"
      component={CourseDetailsScreen}
    />
    <Stack.Screen name="CourseScreen" component={CourseScreen} />
    <Stack.Screen name="MoreCommentsScreen" component={MoreCommentsScreen} />
    <Stack.Screen name="NewCourseScreen" component={NewCourseScreen} />
    <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
  </Stack.Navigator>
);

export const Navigation = () => {
  const isLogged = true;
  return (
    <NavigationContainer>
      {isLogged ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
