import { FullCourseModel, RegisterDtoType } from '@constants';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ConfirmMailScreen: {
    registerDto: RegisterDtoType;
    code: string;
  };
  OnboardingScreen: undefined;
};

export type TabParamList = {
  HomeScreen: undefined;
  DiscoverScreen: undefined;
  ProfileScreen: undefined;
};

export type AppStackParamList = {
  Tab: TabParamList;
  CourseDetailsScreen: {
    fullCourse: FullCourseModel;
  };
  CourseScreen: {
    fullCourse: FullCourseModel;
  };
  NewCourseScreen: undefined;
  PublishCourse: {
    fullCourse: FullCourseModel;
  };
};

export type AuthNavigationType = NativeStackNavigationProp<AuthStackParamList>;

export type AppNavigationType = NativeStackNavigationProp<AppStackParamList>;

export type TabNavigationType = NavigationProp<TabParamList>;

export type ConfirmMailScreenRouteType = RouteProp<
  AuthStackParamList,
  'ConfirmMailScreen'
>;
