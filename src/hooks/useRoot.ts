import { useShallow } from 'zustand/react/shallow';
import {
  headers,
  LoginDtoType,
  methods,
  RegisterDtoType,
  RootInfo,
  routes,
} from '@constants';
import { useStore } from '@store';
import { CryptoDigestAlgorithm, digestStringAsync } from 'expo-crypto';

export const useRoot = () => {
  const { toggleIsLogged, setToken, token, isLogged } = useStore(
    useShallow((rootInfo: RootInfo) => rootInfo)
  );

  const login = async (loginDto: LoginDtoType): Promise<string | null> => {
    loginDto.password = await digestStringAsync(
      CryptoDigestAlgorithm.SHA256,
      loginDto.password
    );

    const response = await fetch(routes.auth.login, {
      method: methods.POST,
      headers: headers.default,
      body: JSON.stringify(loginDto),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
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
    registerDto.password = await digestStringAsync(
      CryptoDigestAlgorithm.SHA256,
      registerDto.password
    );

    const response = await fetch(routes.auth.register, {
      method: methods.POST,
      headers: headers.default,
      body: JSON.stringify(registerDto),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
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
  };

  return {
    isLogged,
    token,
    login,
    register,
    logout,
  };
};
