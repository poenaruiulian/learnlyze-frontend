import { useShallow } from 'zustand/react/shallow';
import { LoginDtoType, RootInfo } from '@constants';
import { useStore } from '@store';
import { HTTPRoutes } from '@config';

export const useRoot = () => {
  const login = async ({
    email,
    password,
  }: LoginDtoType): Promise<string | null> => {
    const response = await fetch(HTTPRoutes.auth.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login failed:', errorData);
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    return data.access_token ?? null;
  };

  return {
    login,
    ...useStore(useShallow((rootInfo: RootInfo) => rootInfo)),
  };
};
