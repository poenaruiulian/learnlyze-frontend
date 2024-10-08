import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RegisterDtoType } from '@constants';
import { RouteProp } from '@react-navigation/native';

export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ConfirmMailScreen: {
    registerDto: RegisterDtoType;
    code: string;
  };
};

export type TabParamList = {
  HomeScreen: undefined;
  DiscoverScreen: undefined;
  ProfileScreen: undefined;
};

export type AppStackParamList = {
  Tab: TabParamList;
  CompletedCourseScreen: undefined;
  CourseDetailsScreen: undefined;
  CourseScreen: undefined;
  MoreCommentsScreen: undefined;
  NewCourseScreen: undefined;
  SettingsScreen: undefined;
};

export type AuthNavigationType = NativeStackNavigationProp<AuthStackParamList>;

export type AppNavigationType = NativeStackNavigationProp<AppStackParamList>;

export type ConfirmMailScreenRouteType = RouteProp<
  AuthStackParamList,
  'ConfirmMailScreen'
>;
