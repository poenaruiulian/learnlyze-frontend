import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ConfirmMailScreen: undefined;
};

export type AuthNavigationType = NativeStackNavigationProp<AuthStackParamList>;
