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

export type AuthNavigationType = NativeStackNavigationProp<AuthStackParamList>;

export type ConfirmMailScreenRouteType = RouteProp<
  AuthStackParamList,
  'ConfirmMailScreen'
>;
