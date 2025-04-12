import {
  headers,
  LoginDtoType,
  methods,
  RegisterDtoType,
  RootInfo,
  routes,
} from '@constants';
import { useStore } from '@store';
import {
  impactAsync as impactAsyncExpo,
  ImpactFeedbackStyle,
} from 'expo-haptics';
import { useShallow } from 'zustand/react/shallow';

import { useError } from './useError';

export const useRoot = () => {
  const {
    toggleIsLogged,
    setToken,
    token,
    isLogged,
    setIsNewUser,
    isNewUser,
    isLoading,
    setIsLoading,
    haptics,
    toggleHaptics,
    completedSection,
    toggleCompletedSection,
  } = useStore(useShallow((rootInfo: RootInfo) => rootInfo));
  const { setError, setHasError } = useError();

  const login = async (loginDto: LoginDtoType): Promise<string | null> => {
    const response = await fetch(routes.auth.login, {
      method: methods.POST,
      headers: headers.default,
      body: JSON.stringify(loginDto),
    });

    if (!response.ok) {
      const errorData = await response.json();

      setError(errorData);
      setHasError(true);

      return null;
    }

    const data = await response.json();
    const accessToken = data.access_token ?? null;

    if (accessToken) {
      toggleIsLogged();
      setToken(accessToken);
    }

    return accessToken;
  };

  const register = async (
    registerDto: RegisterDtoType
  ): Promise<string | null> => {
    const response = await fetch(routes.auth.register, {
      method: methods.POST,
      headers: headers.default,
      body: JSON.stringify(registerDto),
    });

    if (!response.ok) {
      const errorData = await response.json();

      setError(errorData);
      setHasError(true);

      return null;
    }

    const data = await response.json();
    const accessToken = data.access_token ?? null;

    if (accessToken) {
      toggleIsLogged();
      setToken(accessToken);
    }

    return accessToken;
  };

  const logout = () => {
    setToken(null);
    toggleIsLogged();
    setIsNewUser(true);
  };

  const impactAsync = async (feedback: ImpactFeedbackStyle) => {
    if (haptics) {
      await impactAsyncExpo(feedback);
    }
  };

  return {
    isLogged,

    token,
    setToken,

    isNewUser,
    setIsNewUser,

    isLoading,
    setIsLoading,

    login,
    register,
    logout,

    completedSection,
    toggleCompletedSection,

    haptics,
    toggleHaptics,
    impactAsync,
  };
};
